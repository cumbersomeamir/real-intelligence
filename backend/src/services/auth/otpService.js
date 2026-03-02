/**
 * @file OTP service.
 */

const otpStore = new Map();

/**
 * Generates and stores an OTP code.
 * @param {string} key - User identifier.
 * @returns {{otp:string,expiresAt:number}} OTP payload.
 */
export function issueOtp(key) {
  const otp = String(Math.floor(100000 + Math.random() * 900000));
  const expiresAt = Date.now() + 5 * 60 * 1000;
  otpStore.set(key, { otp, expiresAt });
  return { otp, expiresAt };
}

/**
 * Verifies OTP for identifier.
 * @param {string} key - User identifier.
 * @param {string} otp - OTP value.
 * @returns {boolean} Verification result.
 */
export function verifyOtp(key, otp) {
  const record = otpStore.get(key);
  if (!record) return false;
  if (record.expiresAt < Date.now()) return false;
  return record.otp === otp;
}
