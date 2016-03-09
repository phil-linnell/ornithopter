/**
 * foobar
 */
export function parseTransformValue(value) {
  const re = /([a-z][\w\d]+)\(\s*([^,\s]+)\s*,\s*([^,\s]+)\s*\)/;
  const captures = value.match(re);
  if (captures === null) {
    throw new Error(`Unexpected transform value: ${value}`);
  }
  return [captures[1],captures[2],captures[3]];
}
