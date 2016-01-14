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
  if (tokens.length < 2) {
    throw new Error("Error");
  }

  return steps(tokens);
};

export function keyframe(step, value) {
  return {step: step, properties: [{name: 'color', value: value}]};
}

export function steps(tokens) {
  const size = tokens.length - 1;
  const stepSize = (1 / size) * 100;
  const steps = [];
  let n = 0;

  for (let i = 0; i <= size; i++) {
    const step = Math.round(n * 100) / 100;
    const value = tokens[i];
    steps.push(keyframe(step, value));
    n = n + stepSize;
  }

  return steps;
}

export function tokeniser(string) {
  return string.split(" ");
}
