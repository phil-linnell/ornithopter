import { toMilliseconds, keyframePercentage } from 'utils/time';
import Color, {isColor, rangeLength} from 'utils/color';
import { Number, toNumber } from 'utils/number';

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

// Returns a value between 0 and 1 based on the given timing function.
export function changePoint(position, previousValue, accuracy, timingFunction) {
  if (position === 0) { return 0 };
  if (position === accuracy) { return 1 };

  return timingFunction(accuracy, previousValue, 1);
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

export function interpolateValue(position, previousValue, originalValues, accuracy, timingFunction) {
  if (position === 0) {
    return originalValues[0];
  }

  const lastValue = originalValues[originalValues.length - 1];

  if (position === accuracy) {
    return lastValue;
  }

  return timingFunction(accuracy, previousValue, lastValue);
}


// TODO: It returns the next unbalanced aliquot.
// So, for (2, 0, 1) it returns 0.33 instead of 0.5
export function valueByLinear(accuracy, previousValue, lastValue) {
  return (lastValue / (accuracy + 1)) + previousValue;
}

export function valueByLinearNumber(accuracy, previousValue, lastValue) {
  return Number(valueByLinear(accuracy, previousValue.value, lastValue.value), lastValue.unit);
}

// TODO: rename
export function valueByLinearColor(accuracy, previousValue, lastValue) {
  const red = channelValue(accuracy, previousValue.red(), lastValue.red());
  const green = channelValue(accuracy, previousValue.green(), lastValue.green());
  const blue = channelValue(accuracy, previousValue.blue(), lastValue.blue());

  return Color().rgb(red, green, blue);
}

export function channelValue(accuracy, previousValue, lastValue) {
  const totalLength = rangeLength(previousValue, lastValue);

  return Math.abs(Math.round((totalLength / (accuracy + 1)) - previousValue));
}
