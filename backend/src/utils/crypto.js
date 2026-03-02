/**
 * @file Crypto helpers for hashing and verification.
 */

import bcrypt from 'bcrypt';

/**
 * Hashes plain text.
 * @param {string} value - Plain string.
 * @returns {Promise<string>} Hashed output.
 */
export async function hashValue(value) {
  return bcrypt.hash(value, 10);
}

/**
 * Compares plain text with hash.
 * @param {string} value - Plain text.
 * @param {string} hash - Hash string.
 * @returns {Promise<boolean>} Match result.
 */
export async function compareValue(value, hash) {
  return bcrypt.compare(value, hash);
}
