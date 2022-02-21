import fs from "fs";
import chalk from "chalk";
import inquirer from "inquirer";
import { QUESTION, PATH_STYLE } from "./constants.utils.js";
import { getTreeReport } from "./treeReport.utils.js";
import { safePath } from "./safePath.utils.js";


export async function initQuestion() {
  const answer = await inquirer.prompt({
    name: "initQuestion",
    type: "list",
    message: "Doby Style",
    choices: [QUESTION.WIZARD_ALL, QUESTION.WIZARD_PARTIALLY],
  });

  return answer.initQuestion;
}

export async function stepByStepQuestion({ message, choices }) {
  const answer = await inquirer.prompt({
    name: "stepByStep",
    type: "list",
    message,
    choices,
  });

  return answer.stepByStep;
}

/**
 *
 * Copies `data`(file or folder) based on `answers` to `cbQuestion`. 
 * If `cbQuestion` is not passed it will copy `data` from `src` to `dest`.
 *
 * @param {string} src - source of folder being copied
 * @param {string} dest - destination where folder is copied
 * @param {({message, choices?}) => string} cbQuestion - question that is asked for ever folder/file
 *
 */
export async function styleWizard({ src, dest, cbQuestion }) {
  const stats = fs.statSync(src);
  const isDirectory = stats.isDirectory();
  const isFile = stats.isFile();

  const dataName = src.split("/").pop();
  const dataContent = isDirectory ? fs.readdirSync(src) : fs.readFileSync(src);
  const dataPath = safePath(`${dest}/${dataName}`);

  let answer = QUESTION.YES;

  if (cbQuestion && cbQuestion instanceof Function && src !== PATH_STYLE) {
    if (isDirectory) {
      const reportMsg = await getTreeReport({ base: src, rootName: dataName });
      console.log(chalk.inverse(`\n${reportMsg}\n`));
    }

    const message = `${isDirectory ? "/" : ""}${dataName}?`;
    const choices = [
      isDirectory && QUESTION.WIZARD_ALL,
      isDirectory && QUESTION.WIZARD_PARTIALLY,
      isFile && QUESTION.YES,
      QUESTION.NO,
    ].filter(Boolean);

    answer = await cbQuestion({ message, choices });
  }

  const toCopyAll = answer === QUESTION.WIZARD_ALL;
  const notToCopy = answer === QUESTION.NO;

  if (notToCopy) {
    return;
  }

  if (isDirectory) {
    if (!fs.existsSync(dataPath)) {
      fs.mkdirSync(dataPath);
    }

    for (let name of dataContent) {
      await styleWizard({
        src: safePath(`${src}/${name}`),
        dest: safePath(`${dataPath}`),
        cbQuestion: toCopyAll ? null : cbQuestion,
      });
    }
  }

  if (isFile) {
    fs.writeFileSync(dataPath, dataContent);
  }
}
