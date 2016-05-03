import Color from 'color';

export function isColor(token) {
  try {
    return !!Color(token);
  } catch(e) {
    return false;
  }
}

export default Color;


export function rangeLength(intitalValue, endValue) {
  return Math.abs(intitalValue - endValue);
}
