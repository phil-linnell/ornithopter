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
  if (tokens.length === 2) {
    return [{step: 0, properties: [{name: 'color', value: tokens[0]}]},
            {step: 100, properties: [{name: 'color', value: tokens[1]}]}];
  }
  if (tokens.length === 3) {
    return [{step: 0, properties: [{name: 'color', value: tokens[0]}]},
            {step: 50, properties: [{name: 'color', value: tokens[1]}]},
            {step: 100, properties: [{name: 'color', value: tokens[2]}]}];
  }
  if (tokens.length === 6) {
    return [{step: 0, properties: [{name: 'color', value: tokens[0]}]},
            {step: 20, properties: [{name: 'color', value: tokens[1]}]},
            {step: 40, properties: [{name: 'color', value: tokens[2]}]},
            {step: 60, properties: [{name: 'color', value: tokens[3]}]},
            {step: 80, properties: [{name: 'color', value: tokens[4]}]},
            {step: 100, properties: [{name: 'color', value: tokens[5]}]}];
  }
};

export function getKeyframes(n) {
  const size = n;
  const stepSize = (1/(size - 1)) * 100;
  const steps = [];

  for(let i = 0; i <= 100; i = i + stepSize) {
    const step = Math.round(i * 100) / 100;
    steps.push(step);
  }
  
  return steps;
}

export function tokeniser(string) {
  return string.split(" ");
}
