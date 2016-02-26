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
export function process(property, tokens, fn) {
  if (!isString(property)) {
    throw new Error("No property");
  }
  if (tokens.length < 2) {
    throw new Error("Error");
  }
  return steps(property, tokens, fn);
}

/**
 * Receives an array [a] and a function fn. Returns the resulting array [b] of
 * mapping fn over [a] collecting its results as a flatten array.
 *
 *    flatMap([1,2,3], x => [x, x * x])  => [1, 1, 2, 4, 3, 9]
 */
function flatMap(array, fn) {
  return array.reduce((xs, x) => xs.concat(fn(x)), []);
};

function isUndefined(x) {
  return typeof x === "undefined";
};

function mergeKeyframes(xs, x) {
  const cachedKeyframe = xs.find(kf => kf.step == x.step);

  if (isUndefined(cachedKeyframe)) {
    xs.push(x);
  } else {
    cachedKeyframe.properties = cachedKeyframe.properties.concat(x.properties);
  }

  return xs;
};

export function processMultiple(input) {
  return flatMap(input, x => process(...x))
           .reduce(mergeKeyframes, []);
}

function isString(value) {
  return typeof value === "string";
}

function keyframe(step, property, value) {
  return {step: step, properties: [{property: property, value: value}]};
}

function keyframeTransform(step, property, value, fn) {
  return {step: step, properties: [{property: property, value: fn + "(" + value + ")"}]};
}

function steps(property, tokens, fn) {
  const size = tokens.length - 1;
  const stepSize = (1 / size) * 100;
  const steps = [];
  let n = 0;
  const keyframeFn = isString(fn) ? keyframeTransform : keyframe;

  for (let i = 0; i <= size; i++) {
    const step = Math.round(n * 100) / 100;
    const value = tokens[i];
    steps.push(keyframeFn(step, property, value, fn));
    n = n + stepSize;
  }

  return steps;
}

function tokeniser(string) {
  return string.split(" ");
}
