#!/usr/bin/env node

import { createSpinner } from "nanospinner";
import { sleep } from "./utils/sleep.utils.js";
import {
  initQuestion,
  stepByStepQuestion,
  styleWizard,
} from "./utils/wizard.utils.js";
import { getTreeReport, getTreeStats } from "./utils/treeReport.utils.js";
import { PATH, QUESTION } from "./utils/constants.utils.js";
import { byDoby, welcome } from "./utils/messages.utils.js";
import { importsFileForStyle } from "./utils/import.utils.js";

await welcome();
const answer = await initQuestion();

const spinner = createSpinner("In Progress...\n").start();

const src = PATH.STYLE;
const dest = PATH.DEST;
const destStyle = PATH.DEST_STYLE;

await sleep(300);
spinner.stop();

if (answer === QUESTION.WIZARD_ALL) {
  await styleWizard({ src, dest });
} else {
  await styleWizard({ src, dest, cbQuestion: stepByStepQuestion });
}

spinner.start();

importsFileForStyle({ src: destStyle });

const report = await getTreeReport({ base: destStyle });
const { dirCount, fileCount } = await getTreeStats({ base: destStyle });

await sleep(500);

console.log(`\n${report}\n`);
console.log(`directories: ${dirCount}, files: ${fileCount}\n\n`);
spinner.success({ text: "Style structure setup is done!\n\n" });

byDoby();
