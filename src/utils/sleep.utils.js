/**
 * Function that will make your program sleep for passed `ms`
 *
 * @param {number} ms
 *
 * @returns {Promise}
 */
export function sleep(ms = 2000) {
  return new Promise((r) => setTimeout(r, ms));
}
