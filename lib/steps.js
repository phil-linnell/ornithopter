import {toMilliseconds, keyframePercentage} from "utils/time";
import Color, {isColor, rangeLength} from "utils/color";

export function compute(n) {
  if (n === 0) {
    return 0;
  }
  return Math.round(n * 100) / 100;
}

export function first([duration, delay, timingFunction], totalDuration) {
  if (delay === 0) {
    return 0;
  }

  return keyframePercentage(delay, totalDuration);
}

export function next(duration, delay, previousStep, totalDuration, stepSize) {
  return keyframePercentage((duration + delay), totalDuration);
}

// Define proper naming
// i = accuracy item
// n = accuracy
// t = timingFunction
export function changePoint(i, n, t) {
  if (i === 0) { return 0 };
  if (i === n) { return 1 };

  return i / t(n);
}

function roundTwo(value) {
  return Math.round(value * 100) / 100;
}

// TODO: rename to keyframePercentage ?
export function percentage(changePoint, duration, delay, totalDuration) {
  if (delay === 0) {
    return roundTwo(changePoint * 100);
  }

  return roundTwo((((changePoint * duration) + delay) / totalDuration) * 100);
}

export function keyframeValue(position, previousValue, originalValues, accuracy, timingFunction) {
  if (position === 0) {
    return originalValues[0];
  }
  if (position === accuracy) {
    return originalValues[originalValues.length - 1];
  }
  return timingFunction(accuracy, previousValue, originalValues[originalValues.length - 1]);
}

// TODO: rename
export function valueByLinear(accuracy, previousValue, lastValue) {
  return (lastValue / (accuracy + 1)) + previousValue;
}

// TODO: rename
export function valueByLinearColor(accuracy, previousValue, lastValue) {
  const red = channelValue(accuracy, previousValue.red(), lastValue.red());
  const green = channelValue(accuracy, previousValue.green(), lastValue.green());
  const blue = channelValue(accuracy, previousValue.blue(), lastValue.blue());

  return Color().rgb(red, green, blue).rgbString();
}

export function channelValue(accuracy, previousValue, lastValue) {
  const totalLength = rangeLength(previousValue, lastValue);

  return Math.abs(Math.round((totalLength / (accuracy + 1)) - previousValue));
}



export function castValues(tokens) {
  return tokens.map(token => {
    if (isColor(token)) {
      return Color(token);
    }

    return token;
  });
}
