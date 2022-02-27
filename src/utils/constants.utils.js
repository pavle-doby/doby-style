import path from "path";
import { fileURLToPath } from "url";
import { formatPath } from "./formatPath.utils.js";

/**
 * Type of nodes in TreeCli `data` object
 *
 * @see {@link https://github.com/MrRaindrop/tree-cli/blob/master/tree.js#L79}
 */
export const TREE_TYPE = {
  DIRECTORY: "directory",
  FILE: "file",
};

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const root = __dirname.split("\\").slice(0, -2).join("\\");
const rootCWD = process.cwd(); // root for Current Working Directory

export const PATH = {
  ROOT: formatPath(root),
  STYLE: formatPath(path.join(root, "/src/style")), //`${root}\\src\\style`,
  DEST: formatPath(rootCWD),
  DEST_STYLE: `${formatPath(rootCWD)}/style`,
};

function getRoot() {
  return process.cwd();
}

console.log({ __filename, __dirname, PATH, wdRoot: getRoot() });

export const GLOBALS_CONTENT = ["tokens", "functions", "tools"];

export const QUESTION = {
  WIZARD_ALL: "Wizard - All",
  WIZARD_PARTIALLY: "Wizard - Partial Structure",
  YES: "Yes",
  NO: "No",
  ALL: "All",
};
