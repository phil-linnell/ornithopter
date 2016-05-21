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
