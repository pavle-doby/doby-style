import fs from "fs";
import chalk from "chalk";
import inquirer from "inquirer";
import { QUESTION, PATH } from "./constants.utils.js";
import { getTreeReport } from "./treeReport.utils.js";
import { formatPath } from "./formatPath.utils.js";
import { importsFileForFolder } from "./import.utils.js";
import { showHeadline, showMetaInfo } from "./messages.utils.js";

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
  const isStyleFolder = src === PATH.STYLE;

  const stats = fs.statSync(src);
  const isDirectory = stats.isDirectory();
  const isFile = stats.isFile();

  const dataName = src.split("/").pop();
  const dataContent = isDirectory
    ? fs.readdirSync(src)
    : fs.readFileSync(src, "utf8");
  const dataPath = formatPath(`${dest}/${dataName}`);

  let answer = QUESTION.YES;

  if (cbQuestion && cbQuestion instanceof Function && !isStyleFolder) {
    if (isDirectory) {
      const reportMsg = await getTreeReport({ base: src, rootName: dataName });
      console.log(chalk.inverse(`\n${reportMsg}\n`));
    }

    const message = `${isDirectory ? "/" : ""}${dataName}?`;

    const choicesDirectory = [
      QUESTION.WIZARD_ALL,
      QUESTION.WIZARD_NONE,
      QUESTION.WIZARD_PARTIALLY,
    ];
    const choicesFile = [
      QUESTION.YES,
      QUESTION.NO,
      QUESTION.VIEW_INFO,
      QUESTION.VIEW_CONTENT,
      QUESTION.VIEW_METADATA,
    ];
    const choices = isDirectory ? choicesDirectory : choicesFile;

    answer = await cbQuestion({ message, choices });
  }

  const toCopyAll = answer === QUESTION.WIZARD_ALL;
  const notToCopy = [QUESTION.NO, QUESTION.WIZARD_NONE].includes(answer);
  const toViewContent = answer === QUESTION.VIEW_CONTENT;
  const toViewMetadata = answer === QUESTION.VIEW_METADATA;
  const toViewInfo = answer === QUESTION.VIEW_INFO;

  if (notToCopy) {
    return;
  }

  if (isDirectory) {
    if (!fs.existsSync(dataPath)) {
      fs.mkdirSync(dataPath);
    }

    for (let name of dataContent) {
      await styleWizard({
        src: formatPath(`${src}/${name}`),
        dest: formatPath(`${dataPath}`),
        cbQuestion: toCopyAll ? null : cbQuestion,
      });
    }

    if (isStyleFolder) {
      //Imports for style folder are added when styleWizard is done
      return;
    }

    importsFileForFolder({ src: dataPath });
  }

  if (toViewContent) {
    showContent({ content: dataContent });
  }

  if (toViewMetadata) {
    showMetadata({ name: dataName, size: stats.size, path: src });
  }

  if (toViewInfo) {
    showContent({ content: dataContent });
    showMetadata({ name: dataName, size: stats.size, path: src });
  }

  if (toViewContent || toViewMetadata || toViewInfo) {
    // Show the same question after all info
    await styleWizard({
      src,
      dest,
      cbQuestion,
    });

    return;
  }

  if (isFile) {
    // Add file to a project
    fs.writeFileSync(dataPath, dataContent);
  }
}

function showContent({ content }) {
  showHeadline({ text: "Content" });

  console.log(content);
}

function showMetadata({ name, size, path }) {
  showHeadline({ text: "Metadata" });

  showMetaInfo({ prefix: "name:", info: name });
  showMetaInfo({ prefix: "size:", info: `${size} bytes` });
  showMetaInfo({ prefix: "path:", info: path });
  console.log();
}
