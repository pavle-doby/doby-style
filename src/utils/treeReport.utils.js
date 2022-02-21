import treeCLI from "tree-cli";
import { TREE_TYPE } from "./constants.utils.js";

/**
 * Counts nodes with specific `type` in `tree`
 *
 * @param {Object} tree
 * @param {string} type
 *
 * @returns {number}
 */
export function countChildren({ tree, type }) {
  const { children } = tree;

  const isProperType = tree.type === type;
  const addition = isProperType ? 1 : 0;

  return (
    addition +
    (children || [])
      .map((child) => countChildren({ tree: child, type }))
      .reduce((pVal, cVal) => pVal + cVal, 0)
  );
}

/**
 * Returns directory & file count for specific directory
 *
 * @param {string} base - base path to directory
 * @param {number} l - level how deep goes scanner in tree for report
 * @param {any} options - rest of options for treeCLI
 *
 * @returns {({dirCount, fileCount})} Directory & File count
 */
export async function getTreeStats({ base, l = 2, ...options }) {
  const { data } = await treeCLI({ ...options, base, l });

  const tree = data.root;
  const dirCount = countChildren({ tree, type: TREE_TYPE.DIRECTORY });
  const fileCount = countChildren({ tree, type: TREE_TYPE.FILE });

  return { dirCount, fileCount };
}

/**
 * Returns visual representation of directory as tree structure.
 *
 * (eg.)
 * elements
 * ├── _button.elements.scss
 * ├── _checkbox.elements.scss
 * ├── _core.elements.scss
 * ├── _elements.scss
 * └── _radio.elements.scss
 *
 * @param {string} base - base path to directory
 * @param {number} l - level how deep goes scanner in tree for report
 * @param {number} rootName - name of root directory that will replace root path
 * @param {any} options - rest of options for treeCLI
 *
 * @returns {string} Visual directory tree structure
 */
export async function getTreeReport({
  base,
  l = 2,
  rootName = "",
  ...options
}) {
  const { report } = await treeCLI({ ...options, base, l });

  const sliceStart = rootName ? 1 : 0;
  const sliceEnd = -4; // to remove stats because they are not correct
  const reportArr = report.split("\n").slice(sliceStart, sliceEnd);

  if (rootName) {
    reportArr.unshift(rootName);
  }

  return `${reportArr.join("\n")}`;
}
