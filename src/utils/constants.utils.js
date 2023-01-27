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

export const __filename = formatPath(fileURLToPath(import.meta.url));
export const __dirname = formatPath(path.dirname(__filename));

const root = __dirname.split("/").slice(0, -2).join("/"); // root of doby-style-cli
const rootCWD = process.cwd(); // CWD - Current Working Directory

export const PATH = {
  ROOT: formatPath(root),
  STYLE: formatPath(path.join(root, "/src/style")),
  DEST: formatPath(rootCWD),
  DEST_STYLE: `${formatPath(rootCWD)}/style`,
};

export const GLOBALS_CONTENT = ["tokens", "functions", "tools"];

export const QUESTION = {
  WIZARD_ALL: "All",
  WIZARD_NONE: "None",
  WIZARD_PARTIALLY: "Partial Structure",
  YES: "Yes",
  NO: "No",
  ALL: "All",
};
