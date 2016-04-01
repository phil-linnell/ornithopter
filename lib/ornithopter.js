import {isString, isUndefined} from "utils/guard";
import {flatMap} from "utils/list";
import {splitByTime} from "utils/time";

/**
 * Processes a composed property and returns the expanded keyframes.
 *
 * @param {string} property The property name.
 * @param {string[]} tokens The values from a composed property.
 * @param {string | undefined} fn The function to format a token with.
 *
 * @example
 *    process('color', ['red', 'green'])   //=>
 *
 *    [{step: 0, properties: [{name: 'color', value: 'red'}],
 *     {step: 100, properties: [{name: 'color', value: 'green'}]]
 *
 * @example
 *    Given a 2s animation:

 *    process('1s', transform', ['0px', '100px', '.5s', '.5s'], 'translateX')   //=>

 *    process('transform', ['0px', '100px', '.5s', '.5s'], 'translateX', '1s')   //=>

 *    process('transform', ['0px', '100px', '.5s', '.5s'], '1s', 'translateX')   //=>

 *    process('transform', ['0px', '100px', '.5s', '.5s'], '1s', {fn: 'translateX', totalDuration: '1s'})   //=>

*    process({property: 'transform', value: ['0px', '100px', '.5s', '.5s'], fn: 'translateX', totalDuration: '1s'})   //=>

 *
 *    [{step: 50, properties: [{name: 'color', value: 'red'}],
 *     {step: 100, properties: [{name: 'color', value: 'green'}]]
 *
 * @return {Object[]} Array of keyframe objects.
 */
export function process({property, value, fn, totalDuration}) {
  if (!isString(property)) {
    throw new Error("No property");
  }

  if (!isString(totalDuration)) {
    throw new Error("The total duration is missing, fix your animation declaration.");
  }

  if (value.length < 2) {
    throw new Error("Error");
  }

  return steps(property, value, fn, totalDuration);
}

// Fix postcss plugin


/**
 * Processes a set of composed properties and returns the expanded keyframes.
 *
 * @param {string[]} input The set of compact properties.
 *
 * @example
 *    processMultiple([['color', ['red', 'green']]])   //=>
 *
 *    [{step: 0, properties: [{name: 'color', value: 'red'}],
 *     {step: 100, properties: [{name: 'color', value: 'green'}]]
 *
 * @return {Object[]} Array of keyframe objects.
 */
export function processMultiple(input, totalDuration) {
  return flatMap(input, x => process(Object.assign(x, {totalDuration})))
           .reduce(mergeKeyframes, []);
}

function mergeKeyframes(xs, x) {
  const cachedKeyframe = xs.find(kf => kf.step == x.step);

  if (isUndefined(cachedKeyframe)) {
    xs.push(x);
  } else {
    cachedKeyframe.properties = cachedKeyframe.properties.concat(x.properties);
  }

  return xs;
};

function keyframe(step, property, value, fn) {
  return {step,
          properties: [{property,
                        value: formatValue(value, fn)}]};
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
function formatValue(value, fn) {
  return isString(fn) ? `${fn}(${value})`: value;
}

function steps(property, tokens, fn, totalDuration) {
  //  return [prop].concat(splitByTime(postcss.list.space(value)));

  const size = tokens.length - 1;
  const stepSize = (1 / size) * 100;
  const steps = [];
  let n = 0;

  for (let i = 0; i <= size; i++) {
    const step = Math.round(n * 100) / 100;
    const value = tokens[i];
    steps.push(keyframe(step, property, value, fn));
    n = n + stepSize;
  }

  return steps;
}
