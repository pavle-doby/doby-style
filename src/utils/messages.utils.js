import chalk from "chalk";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import gradient from "gradient-string";
import { sleep } from "./sleep.utils.js";

export async function welcome() {
  const welcomeAnimation = chalkAnimation.rainbow(
    "Welcome to Doby Style CLI\n"
  );
  await sleep(600);
  welcomeAnimation.stop();
}

export function byDoby() {
  const msg = "By Doby";

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

export function showHeadline({ text }) {
  console.log();
  console.log(`${chalk.bold(text)}`);
  console.log();
}

export function showMetaInfo({ prefix, divider = " ", info }) {
  console.log(`${chalk.inverse(prefix)}${divider}${info}`);
}
