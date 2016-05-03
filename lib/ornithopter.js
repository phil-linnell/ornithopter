import {isString, isUndefined} from "utils/guard";
import {flatMap} from "utils/list";
import {splitByTime, toMilliseconds, keyframePercentage, splitByAccuracy} from "utils/time";
import * as S from "steps";

/**
 * Processes a composed property and returns the expanded keyframes.
 *
 * @param {string} property The property name.
 * @param {string[]} tokens The values from a composed property.
 * @param {string | undefined} fn The function to format a token with.
 * @param {string} totalDuration The duration from an 'animation' declaration.
 *
 * @example
 *    process('color', ['red', 'green'], 1s)   //=>
 *
 *    [{step: 0, properties: [{name: 'color', value: 'red'}],
 *     {step: 100, properties: [{name: 'color', value: 'green'}]]
 *
 * @example
 *    process({property: 'transform', value: ['0px', '100px', '.5s', '.5s'], fn: 'translateX', totalDuration: '2s'})   //=>
 *
 *    [{step: 25, properties: [{name: 'transform', value: 'translateX(0px)'}],
 *     {step: 50, properties: [{name: 'transform', value: 'translateX(100px)'}]]
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

function steps(property, value, fn, totalDuration) {
  const [tokens, timeComponentWithAccuracy] = splitByTime(value);
  const [timeComponent, accuracy] = splitByAccuracy(timeComponentWithAccuracy, tokens.length - 1);
  totalDuration = toMilliseconds(totalDuration);
  const duration = (isUndefined(timeComponent[0])) ? totalDuration : toMilliseconds(timeComponent[0]);
  const delay = (isUndefined(timeComponent[1])) ? 0 : toMilliseconds(timeComponent[1]);
  const timingFunction = "linear";

  const placeholder = Array.apply(null, Array(accuracy + 1)).map(() => 0);


  const result = placeholder.reduce((acc, emptyValue, position) => {
    console.log(position)

    const prevPosition = position === 0 ? 0 : position - 1;
    const value = S.keyframeValue(position, acc[prevPosition], tokens, accuracy, S.valueByLinear);
    const step = S.percentage(S.changePoint(position, accuracy, x => x), duration, delay, totalDuration);

    console.log(step)
    console.log(value)

    acc.push(keyframe(step, property, value, fn));
    return acc;
  }, []);

  // const result = tokens.map((token, i) => {
  //   const step = S.percentage(S.changePoint(i, accuracy, x => x), duration, delay, totalDuration);
  //   return keyframe(step, property, token, fn);
  // });

  return result;
}
