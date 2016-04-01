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
    if (isTime(token) || isTimingFunction(token)) {
      acc[1].unshift(token);
    } else {
      acc[0].unshift(token);
    }
    return acc;
  }

  return tokens.reduceRight(split, [[],[]]);
}

export function convertToMilliseconds(duration) {
  const re = /m/;
  if (!re.test(duration)) {
    return `${parseInt(duration) * 1000}ms`
  }
  return duration;
}
