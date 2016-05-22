import { isString, isUndefined } from 'utils/guard';
import { flatMap } from "utils/list";
import { toNumber, fromNumber } from 'utils/number';
import { fromValue } from 'utils/value';
import Color, { isColor, fromColor } from 'utils/color';
import { splitByTime, toMilliseconds, keyframePercentage, splitByAccuracy } from 'utils/time';
import * as S from 'steps';

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
    throw new Error('No property');
  }

  if (!isString(totalDuration)) {
    throw new Error('The total duration is missing, fix your animation declaration.');
  }

  if (value.length < 2) {
    throw new Error('Error');
  }

  return steps(property, value, fn, totalDuration);
}


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
  return {
    step,
    properties: [{
      property,
      value: fromValue(value, fn)
    }]};
}

function steps(property, value, fn, totalDuration) {
  const [tokens, timeComponentWithAccuracy] = splitByTime(value);
  const [timeComponent, accuracy] = splitByAccuracy(timeComponentWithAccuracy, tokens.length - 1);
  totalDuration = toMilliseconds(totalDuration);
  const duration = (isUndefined(timeComponent[0])) ? totalDuration : toMilliseconds(timeComponent[0]);
  const delay = (isUndefined(timeComponent[1])) ? 0 : toMilliseconds(timeComponent[1]);

  const placeholder = Array.apply(null, Array(accuracy + 1)).map(() => 0);

  if (isColor(tokens[0])) {
    return placeholder.reduce(interpolate(tokens.map(Color), accuracy, S.valueByLinear, S.valueByLinearColor), [])
                      .map(toKeyframe(property, fn, duration, delay, totalDuration, fromColor));
  }

  return placeholder.reduce(interpolate(tokens.map(toNumber), accuracy, S.stepByLinear, S.valueByLinearNumber), [])
                    .map(toKeyframe(property, fn, duration, delay, totalDuration, fromNumber));
}

function interpolate(tokens, accuracy, timingFunctionStep, timingFunctionValue) {
  return (accumulator, placeholder, position) => {
    const point = S.changePoint(position,
                                previousStep(position, accumulator),
                                accuracy,
                                timingFunctionStep);
    const value = S.interpolateValue(position,
                                     previousValue(position, accumulator),
                                     tokens,
                                     accuracy,
                                     timingFunctionValue);

    return accumulator.concat([[point, value]]);
  }
}

function toKeyframe(property, fn, duration, delay, totalDuration, stringify) {
  return ([point, value]) => {
    const step = S.percentage(point, duration, delay, totalDuration);

    return keyframe(step, property, stringify(value), fn);
  }
}

function previousValue(position, collection) {
  if (position === 0) {
    return null;
  }

  return collection[position - 1][1];
}

function previousStep(position, collection) {
  if (position === 0) {
    return null;
  }

  return collection[position - 1][0];
}
