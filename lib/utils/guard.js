/**
 * Checks if x is undefined.
 *
 * @param {*} x The value to check.
 *
 * @return {boolean} True if x is undefined.
 */
export function isUndefined(x) {
  return x === undefined;
}

/**
 * Checks if x is a String.
 *
 * @param {*} x The value to check.
 *
 * @return {boolean} True if x is a String.
 */
export function isString(x) {
  return typeof x === "string";
}
