import {toMilliseconds, keyframePercentage} from "utils/time";

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
