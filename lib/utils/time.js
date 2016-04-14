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

export function splitByTime(tokens) {
  function split(acc, token) {
    if (noTokens(acc[0]) && kindOfTime(token)) {
      acc[1].unshift(token);
    } else {
      acc[0].unshift(token);
    }
    return acc;
  }

  return tokens.reduceRight(split, [[],[]]);
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

export function takeAccuracy(timeComponent, fallback) {
  if (timeComponent.length === 0) {
    return fallback;
  }
  const token = timeComponent.pop();
  if (isUnitless(token)) {
    return parseInt(token, 10);
  } else {
    return fallback;
  }
}

export function isUnitless(value) {
  const re = /\d$/;
  return re.test(value);
}
