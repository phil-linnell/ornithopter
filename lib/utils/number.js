/**
 * A number object represents a number with optionally a unit.  In CSS it is
 * represented as `10px` or `10` or `50%`.
 */
export function Number(value, unit) {
  return {value, unit};
}

export function toNumber(value) {
  const re = /^((?:\d*\.)?\d+)(.*)$/
  const captures = value.match(re);

  if (captures === null) {
    throw new Error(`Unexpected Number value: ${value}`);
  }

  const digit = parseFloat(captures[1], 10);
  const unit = captures[2];

  return Number(digit, unit)
}

/**
 * Converts a Number `{value, unit}` into a string.
 *
 *    fromNumber({value: 10, unit: '%'}) //=> '10%'
 */
export function fromNumber({value, unit}) {
  return `${value}${unit}`;
}
