import { isString } from 'utils/guard';

/**
 * Extract values from CSS functions.
 *
 *    parseTransformValue('translateX(1px,2px)') //=> ['translateX','1px','2px']
 */
export function parseTransformValue(value) {
  const re = /([a-z][\w\d]+)\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/;
  const captures = value.match(re);

  if (captures === null) {
    throw new Error(`Unexpected transform value: ${value}`);
  }

  return [captures[1], captures[2], captures[3]];
}

/**
 * Formats a value as a function if the function exists.
 *
 * @param {string} value The value to format.
 * @param {string | undefined} fn The function to use.
 *
 * @example
 *    formatValue("10px") //=> "10px"
 *    formatValue("10px", "translateX") //=> "translateX(10px)"
 *
 * @return {string} The formatted value.
 */
export function fromValue(value, fn) {
  return isString(fn) ? `${fn}(${value})`: value;
}
