export function getRoundedMax(value) {
  const digits = value.toString().length;
  const roundTo = Math.pow(10, digits - 1);
  return Math.ceil(value / roundTo) * roundTo;
}
