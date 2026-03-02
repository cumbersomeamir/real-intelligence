/**
 * @file Browser session persistence helpers.
 */

const ACCESS_TOKEN_KEY = 'propintel.accessToken';
const REFRESH_TOKEN_KEY = 'propintel.refreshToken';
const USER_KEY = 'propintel.user';

/**
 * Returns whether the code runs in browser.
 * @returns {boolean}
 */
function isBrowser() {
  return typeof window !== 'undefined';
}

/**
 * Reads a JSON value from localStorage.
 * @param {string} key - Storage key.
 * @param {any} fallback - Fallback value.
 * @returns {any}
 */
function readJson(key, fallback) {
  if (!isBrowser()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

/**
 * Writes a JSON value to localStorage.
 * @param {string} key - Storage key.
 * @param {any} value - Serializable value.
 */
function writeJson(key, value) {
  if (!isBrowser()) return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore quota/serialization failures.
  }
}

/**
 * Removes a localStorage value.
 * @param {string} key - Storage key.
 */
function removeItem(key) {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // Ignore.
  }
}

/**
 * Sets auth cookie consumed by Next middleware.
 * @param {string} token - Access token.
 */
export function setAuthCookie(token) {
  if (!isBrowser()) return;
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `auth_token=${encodeURIComponent(token)}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax${secure}`;
}

/**
 * Removes auth cookie.
 */
export function clearAuthCookie() {
  if (!isBrowser()) return;
  document.cookie = 'auth_token=; Path=/; Max-Age=0; SameSite=Lax';
}

/**
 * Persists auth session values.
 * @param {Object} payload - Auth response payload.
 * @param {string} payload.accessToken - Access token.
 * @param {string} [payload.refreshToken] - Refresh token.
 * @param {Object} payload.user - User object.
 */
export function persistSession({ accessToken, refreshToken, user }) {
  if (!isBrowser()) return;

  if (accessToken) {
    window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    setAuthCookie(accessToken);
  }
  if (refreshToken) {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  }
  if (user) {
    writeJson(USER_KEY, user);
  }
}

/**
 * Clears auth session state.
 */
export function clearSession() {
  removeItem(ACCESS_TOKEN_KEY);
  removeItem(REFRESH_TOKEN_KEY);
  removeItem(USER_KEY);
  clearAuthCookie();
}

/**
 * Returns stored access token.
 * @returns {string}
 */
export function getAccessToken() {
  if (!isBrowser()) return '';
  return window.localStorage.getItem(ACCESS_TOKEN_KEY) || '';
}

/**
 * Returns stored refresh token.
 * @returns {string}
 */
export function getRefreshToken() {
  if (!isBrowser()) return '';
  return window.localStorage.getItem(REFRESH_TOKEN_KEY) || '';
}

/**
 * Returns stored user object.
 * @returns {Object|null}
 */
export function getStoredUser() {
  return readJson(USER_KEY, null);
}

/**
 * Returns a mutable local collection.
 * @param {string} key - Collection key.
 * @param {any[]} fallback - Default items.
 * @returns {any[]}
 */
export function getCollection(key, fallback = []) {
  return readJson(key, fallback);
}

/**
 * Writes a mutable local collection.
 * @param {string} key - Collection key.
 * @param {any[]} value - Collection value.
 */
export function setCollection(key, value) {
  writeJson(key, value);
}

/**
 * Exposes storage keys used across app.
 */
export const SESSION_KEYS = {
  users: 'propintel.users',
  buyers: 'propintel.buyers',
  deals: 'propintel.deals',
  settings: 'propintel.settings',
  apiKeys: 'propintel.apiKeys',
  team: 'propintel.team',
  messages: 'propintel.messages',
  contactLeads: 'propintel.contactLeads'
};
