import { toMilliseconds, keyframePercentage } from 'utils/time';
import Color, { isColor, rangeLength } from 'utils/color';
import { Number, toNumber } from 'utils/number';


// Returns a value between 0 and 1 based on the given timing function.
export function changePoint(position, previousValue, smoothness, timingFunction) {
  if (position === 0) { return 0 };
  if (position === smoothness) { return 1 };

  return timingFunction(position, smoothness, previousValue, 1);
}

// TODO: not used arguments are a reminder that we need to consier complex
// situations.
export function stepByLinear(position, smoothness, previousValue, lastValue) {
  return position / smoothness;
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

export function interpolateValue(position, previousValue, originalValues, smoothness, timingFunction) {
  if (position === 0) {
    return originalValues[0];
  }

  const lastValue = originalValues[originalValues.length - 1];

  if (position === smoothness) {
    return lastValue;
  }

  return timingFunction(smoothness, previousValue, lastValue);
}


export function valueByLinear(smoothness, previousValue, lastValue) {
  return (lastValue / (smoothness + 1)) + previousValue;
}

export function valueByLinearNumber(smoothness, previousValue, lastValue) {
  return Number(valueByLinear(smoothness, previousValue.value, lastValue.value), lastValue.unit);
}

// TODO: rename
export function valueByLinearColor(smoothness, previousValue, lastValue) {
  const red = channelValue(smoothness, previousValue.red(), lastValue.red());
  const green = channelValue(smoothness, previousValue.green(), lastValue.green());
  const blue = channelValue(smoothness, previousValue.blue(), lastValue.blue());

  return Color().rgb(red, green, blue);
}

export function channelValue(smoothness, previousValue, lastValue) {
  const totalLength = rangeLength(previousValue, lastValue);

  return Math.abs(Math.round((totalLength / (smoothness + 1)) - previousValue));
}
