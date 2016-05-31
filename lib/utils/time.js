import {isUndefined} from 'utils/guard';

export function isTime(value) {
  const re = /^(0|(\d*\.)?\d+m?s)$/;
  return re.test(value);
}

const timingFunctions = [
  "linear",
  "ease",
  "ease-in",
  "ease-out",
  "ease-in-out",
  "step-start",
  "step-end",
  "steps",
  "cubic-bezier"
];

export function isTimingFunction(value) {
  return Boolean(timingFunctions.find(item => value.indexOf(item) > -1));
}

export function splitByTime(values) {
  return [values.slice(0, 2), values.slice(2)];
}

function noTokens(xs) {
  return xs.length === 0;
}

function kindOfTime(value) {
  return (isTime(value) || isTimingFunction(value));
}

export function toMilliseconds(duration) {
  if (duration.indexOf('ms') === -1) {
    return Math.round(parseFloat(duration, 10) * 1000)
  }

  return parseInt(duration, 10);
}

export function keyframePercentage(timeValue, totalDuration) {
  return Math.round((timeValue / totalDuration) * 1000) / 10;
}

export function splitBySmoothness(timeComponent, fallback) {
  return timeComponent.reduce((acc, value) => {
    if (isUnitless(value)) {
      if (value !== fallback) {
        acc[1] = parseInt(value, 10);
      }
    } else {
      acc[0] = acc[0].concat(value);
    }

    return acc;
  }, [[], fallback]);
}

export function isUnitless(value) {
  const re = /\d$/;
  return re.test(value);
}
