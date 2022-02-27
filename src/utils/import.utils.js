import fs from "fs";
import { GLOBALS_CONTENT } from "./constants.utils.js";
import { formatPath } from "./formatPath.utils.js";

/**
 * Formats import line for scss.
 *
 * @param {string} file - file name
 */
export function formatImport(file) {
  return `@import '${file}';\n`;
}

// TODO: Think about adding general function for adding all imports in folder.
/**
 * Adds file with imports for all files in that folder.
 *
 * @param {string} src - path to folder
 */
export function importsFileForFolder({ src }) {
  const srcName = formatPath(src).split("/").pop();
  const files = fs.readdirSync(src);

  let filesContent = "";
  let isPrivate = false;

  files.forEach((file) => {
    isPrivate = file[0] === "_";
    file = file.slice(isPrivate ? 1 : 0, -5);
    filesContent += formatImport(file);
  });

  fs.writeFileSync(`${src}/_${srcName}.scss`, filesContent);
}

/**
 * Adds index.scss & _global.scss with imports for all folders in that `style` folder.
 *
 * @param {string} src - source path to `style` folder
 */
export function importsFileForStyle({ src }) {
  const stats = fs.statSync(src);
  const isDirectory = stats.isDirectory();

  if (!isDirectory) {
    throw Error("Param `src` for style root is not directory");
  }

  const dirContent = fs.readdirSync(src);

  let globalsContent = "";
  let indexContent = "";

  indexContent += formatImport(`global`);
  indexContent += "\n";

  for (let name of dirContent) {
    if (GLOBALS_CONTENT.includes(name)) {
      globalsContent += formatImport(`${name}/${name}`);
    } else {
      indexContent += formatImport(`${name}/${name}`);
    }
  }

  fs.writeFileSync(`${src}/_global.scss`, globalsContent);
  fs.writeFileSync(`${src}/index.scss`, indexContent);
}
