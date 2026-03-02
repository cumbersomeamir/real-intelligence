/**
 * @file Axios API client and endpoint wrappers.
 */

import axios from 'axios';
import { BACKEND_URL } from '@/lib/constants';
import { getAccessToken } from '@/lib/session';

/** Shared axios instance for backend communication. */
export const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 15000,
  withCredentials: true
});

apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers = config.headers || {};
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Unexpected API error';
    const normalized = new Error(message);
    normalized.status = error.response?.status;
    normalized.data = error.response?.data;
    return Promise.reject(normalized);
  }
);

/**
 * Performs GET request.
 * @param {string} path - API path.
 * @param {Object} [config] - Axios config.
 * @returns {Promise<any>} Response body.
 */
export async function apiGet(path, config = {}) {
  const { data } = await apiClient.get(path, config);
  return data;
}

/**
 * Performs POST request.
 * @param {string} path - API path.
 * @param {Object} body - Request payload.
 * @param {Object} [config] - Axios config.
 * @returns {Promise<any>} Response body.
 */
export async function apiPost(path, body = {}, config = {}) {
  const { data } = await apiClient.post(path, body, config);
  return data;
}

/**
 * Performs PATCH request.
 * @param {string} path - API path.
 * @param {Object} body - Request payload.
 * @param {Object} [config] - Axios config.
 * @returns {Promise<any>} Response body.
 */
export async function apiPatch(path, body = {}, config = {}) {
  const { data } = await apiClient.patch(path, body, config);
  return data;
}

/**
 * Performs auth login.
 * @param {Object} payload - Login payload.
 * @returns {Promise<any>} Auth payload.
 */
export function apiLogin(payload) {
  return apiPost('/auth/login', payload);
}

/**
 * Performs auth registration.
 * @param {Object} payload - Register payload.
 * @returns {Promise<any>} Auth payload.
 */
export function apiRegister(payload) {
  return apiPost('/auth/register', payload);
}

/**
 * Fetches current authenticated profile.
 * @returns {Promise<any>} User payload.
 */
export function apiCurrentUser() {
  return apiGet('/auth/me');
}
