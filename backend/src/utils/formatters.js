/**
 * @file Formatter utilities.
 */

/**
 * Formats INR currency amount.
 * @param {number} value - Input value.
 * @returns {string} Formatted INR string.
 */
export function formatINR(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}
