/**
 * Processes a compact color property and returns the expanded keyframes.
 *
 * @param {string[]} tokens The values from a compact color property.
 *
 * @example
 *    processColor(['red', 'green'])   //=>
 *
 *    [{step: 0, properties: [{name: 'color', value: 'red'}],
 *     {step: 100, properties: [{name: 'color', value: 'green'}]]
 *
 * @return {Object[]} Array of keyframe objects.
 */
export function processColor(tokens) {
  return tokens;
};
