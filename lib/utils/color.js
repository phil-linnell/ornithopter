import Color from 'color';

export function isColor(token) {
  // Color casts "0" as a valid color so we need to guard against it.
  if (token === "0") {
    return false
  };

  try {
    return !!Color(token);
  } catch(e) {
    return false;
  }
}

export default Color;


export function rangeLength(intitalValue, endValue) {
  return intitalValue - endValue;
}

export function fromColor(color) {
  return color.rgbString();
}
