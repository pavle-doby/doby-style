#!/usr/bin/env node

import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import inquirer from "inquirer";
import { createSpinner } from "nanospinner";
import treee from "tree-cli";
import fs from "fs";
import { sleep } from "./utils/sleep.utils.js";
import { copyFolder } from "./utils/copy.utils.js";
import figlet from "figlet";

async function welcome() {
  const welcomeAnimation = chalkAnimation.rainbow(
    "Welcome to Doby Style CLI\n"
  );
  await sleep(500);
  welcomeAnimation.stop();
}

const INIT_QUESTIONS = {
  ALL: "Wizard - All",
  PARTIALLY: "Wizard - Partial Structure",
};

async function initQuestion() {
  const answers = await inquirer.prompt({
    name: "initQuestion",
    type: "list",
    message: "Doby Style",
    choices: [INIT_QUESTIONS.ALL, INIT_QUESTIONS.PARTIALLY],
  });

  return handelInitAnswer(answers.initQuestion === INIT_QUESTIONS.ALL);
}

async function handelInitAnswer(toCopyAll) {
  const spinner = createSpinner("In Progress...\n").start();

  const src = "./src/style";
  const dest = "./";

  if (toCopyAll) {
    copyFolder({ fs, src, dest });
  } else {
    // TODO: Handle Step by step wizard
    console.log("Step by step");
    spinner.error({ text: "WIP" });
    process.exit(1);
  }

  const styleStructure = await treee({ base: "./style", l: 2 });
  const { report } = styleStructure;

  await sleep(500);
  console.log(report);
  spinner.success({ text: "Style structure setup is done!\n\n" });
}

function byDoby() {
  const msg = "By Doby";

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await initQuestion();
byDoby();
