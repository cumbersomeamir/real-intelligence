/**
 * @file Generic utility functions.
 */

/**
 * Creates conditional class names.
 * @param {...(string|false|null|undefined)} classes - Class values.
 * @returns {string} Joined classes.
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}

/**
 * Simulates network latency in demos.
 * @param {number} ms - Milliseconds.
 * @returns {Promise<void>} Sleep promise.
 */
export function sleep(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Converts text into a URL-friendly slug.
 * @param {string} value - Input value.
 * @returns {string} Slug output.
 */
export function toSlug(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
