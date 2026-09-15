import clsx, { type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

/** Interpolation linéaire, utilisée par les effets de curseur. */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function formatEuro(value: number) {
  return new Intl.NumberFormat('fr-BE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}
