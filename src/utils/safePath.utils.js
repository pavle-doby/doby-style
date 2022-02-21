/**
 * This fn will replace `//` in path with `/`.
 *
 * @param {string} path
 *
 * @returns {string}
 */
 export function safePath(path) {
    return path.replace("//", "/");
  }