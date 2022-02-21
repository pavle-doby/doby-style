/**
 * This fn will replace `//` in path with `/`.
 * 
 * @param {string} path
 *  
 * @returns {string}
 */
export function safePath(path) {
  return path.replace("//", '/');
}

/**
 *
 * Copies folder with all files form src to dest.
 * 
 * @param {fs} fs
 * @param {string} src - source of folder being copied
 * @param {string} dest - destination where folder is copied
 * 
 */
export function copyFolder({ fs, src, dest }) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    const dirName = src.split("/").pop();
    const dirContent = fs.readdirSync(src);
    const dirPath = safePath(`${dest}/${dirName}`);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    dirContent.forEach((name) => {
      copyFolder({
        fs,
        src: safePath(`${src}/${name}`),
        dest: safePath(`${dirPath}`),
      });
    });
  }

  if (stats.isFile()) {
    const fileName = src.split("/").pop();
    const fileContent = fs.readFileSync(src);
    const filePath = safePath(`${dest}/${fileName}`);

    fs.writeFileSync(filePath, fileContent);
  }
}
