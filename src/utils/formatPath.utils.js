const slashGroup = /(\\)+|(\/)+/g;

/**
 * This fn will replace duplicated `/` or "\" with single '/'.
 * @param {string} path
 *
 * @returns {string}
 */
export function formatPath(path) {
  return path.replaceAll(slashGroup, "/");
}
