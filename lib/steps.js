import { toMilliseconds, keyframePercentage } from 'utils/time';
import Color, { isColor, rangeLength } from 'utils/color';
import { Number, toNumber } from 'utils/number';


// Returns a value between 0 and 1 based on the given timing function.
export function changePoint(position, amountOfPoints) {
  if (position === 0) { return 0 };
  if (position === amountOfPoints - 1) { return 1 };

  return position / (amountOfPoints - 1);
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

export function interpolateValue(position, previousValue, originalValues, amountOfPoints, timingFunction) {
  if (position === 0) {
    return originalValues[0];
  }

  const lastValue = originalValues[originalValues.length - 1];

  if (position === amountOfPoints - 1) {
    return lastValue;
  }

  return timingFunction(amountOfPoints, previousValue, lastValue);
}


function valueByLinear(amountOfPoints, previousValue, lastValue) {
  return (lastValue / (amountOfPoints - 1)) + previousValue;
}

export function valueByLinearNumber(amountOfPoints, previousValue, lastValue) {
  return Number(valueByLinear(amountOfPoints, previousValue.value, lastValue.value), lastValue.unit);
}

// TODO: rename
export function valueByLinearColor(amountOfPoints, previousValue, lastValue) {
  const red = channelValue(amountOfPoints, previousValue.red(), lastValue.red());
  const green = channelValue(amountOfPoints, previousValue.green(), lastValue.green());
  const blue = channelValue(amountOfPoints, previousValue.blue(), lastValue.blue());

  return Color().rgb(red, green, blue);
}

export function channelValue(amountOfPoints, previousValue, lastValue) {
  const totalLength = rangeLength(previousValue, lastValue);

  return Math.abs(Math.round((totalLength / (amountOfPoints - 1)) - previousValue));
}
