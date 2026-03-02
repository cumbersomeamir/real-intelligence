/**
 * @file Formatting helpers for currency, date, and compact numbers.
 */

import { format } from 'date-fns';

/**
 * Formats number as INR currency.
 * @param {number} value - Numeric amount.
 * @returns {string} Formatted price.
 */
export function formatINR(value) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}

/**
 * Formats date string to human-readable date.
 * @param {string|Date} date - Date input.
 * @returns {string} Formatted date.
 */
export function formatDate(date) {
  return format(new Date(date), 'dd MMM yyyy');
}

/**
 * Formats a number with compact notation.
 * @param {number} value - Numeric value.
 * @returns {string} Compact number.
 */
export function compactNumber(value) {
  return new Intl.NumberFormat('en-IN', {
    notation: 'compact',
    maximumFractionDigits: 1
  }).format(Number(value || 0));
}
