#!/usr/bin/env node

import { createSpinner } from "nanospinner";
import { sleep } from "./utils/sleep.utils.js";
import {
  initQuestion,
  stepByStepQuestion,
  styleWizard,
} from "./utils/wizard.utils.js";
import { getTreeReport, getTreeStats } from "./utils/treeReport.utils.js";
import { PATH_DEST, PATH_STYLE, QUESTION } from "./utils/constants.utils.js";
import { byDoby, welcome } from "./utils/messages.utils.js";
import { importsFileForStyle } from "./utils/import.utils.js";

await welcome();
const answer = await initQuestion();

const spinner = createSpinner("In Progress...\n").start();

const src = PATH_STYLE;
const dest = PATH_DEST;

await sleep(300);
spinner.stop();

if (answer === QUESTION.WIZARD_ALL) {
  await styleWizard({ src, dest });
} else {
  await styleWizard({ src, dest, cbQuestion: stepByStepQuestion });
}

spinner.start();

importsFileForStyle({ src: "./style" });

const report = await getTreeReport({ base: "./style" });
const { dirCount, fileCount } = await getTreeStats({ base: "./style" });

await sleep(500);

console.log(`\n${report}\n`);
console.log(`directories: ${dirCount}, files: ${fileCount}\n\n`);
spinner.success({ text: "Style structure setup is done!\n\n" });

byDoby();
