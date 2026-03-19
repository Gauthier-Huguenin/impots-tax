const NBSP = "\u00A0"; // non-breaking space (thousand separator)

function formatIntegerPart(intStr: string): string {
  return intStr.replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
}

export function formatNumber(value: number, decimals = 0): string {
  const abs = Math.abs(value);
  const fixed = abs.toFixed(decimals);
  const [intPart, decPart] = fixed.split(".");
  const sign = value < 0 ? "−" : "";
  const formatted = formatIntegerPart(intPart);
  return decPart ? `${sign}${formatted},${decPart}` : `${sign}${formatted}`;
}

export function formatEuro(value: number, decimals = 0): string {
  return `${formatNumber(value, decimals)}${NBSP}€`;
}

export function formatPercent(value: number): string {
  const str = Number.isInteger(value)
    ? value.toString()
    : value.toString().replace(".", ",");
  return `${str}${NBSP}%`;
}
