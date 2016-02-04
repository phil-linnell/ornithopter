/**
 * Processes a compact property (not transform) and returns the expanded keyframes.
 *
 * @param {string[]} tokens The values from a compact property.
 *
 * @example
 *    process('color', ['red', 'green'])   //=>
 *
 *    [{step: 0, properties: [{name: 'color', value: 'red'}],
 *     {step: 100, properties: [{name: 'color', value: 'green'}]]
 *
 * @return {Object[]} Array of keyframe objects.
 */
export function process(property, tokens) {
  if (!isString) {
    throw new Error("No property");
  }
  if (tokens.length < 2) {
    throw new Error("Error");
  }

  return steps(property, tokens);
};

function isString(value) {
  return typeof value === "string";
}

function keyframe(step, property, value) {
  return {step: step, properties: [{property: property, value: value}]};
}

function steps(property, tokens) {
  const size = tokens.length - 1;
  const stepSize = (1 / size) * 100;
  const steps = [];
  let n = 0;

  for (let i = 0; i <= size; i++) {
    const step = Math.round(n * 100) / 100;
    const value = tokens[i];
    steps.push(keyframe(step, property, value));
    n = n + stepSize;
  }

  return steps;
}

function tokeniser(string) {
  return string.split(" ");
}
