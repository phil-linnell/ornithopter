function Number(value, unit) {
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
