/**
 * @file Axios API client and thin frontend endpoint wrappers.
 */

import axios from 'axios';
import { BACKEND_URL } from '@/lib/constants';

/** Shared axios instance for backend communication. */
export const apiClient = axios.create({
  baseURL: `${BACKEND_URL}/api`,
  timeout: 15000,
  withCredentials: true
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || error.message || 'Unexpected API error';
    return Promise.reject(new Error(message));
  }
);

/**
 * Fetches dashboard overview payload.
 * @returns {Promise<any>} API response body.
 */
export async function getDashboardOverview() {
  const { data } = await apiClient.get('/analytics/market');
  return data;
}

/**
 * Fetches deals list.
 * @param {Object} params - Query params.
 * @returns {Promise<any>} API response.
 */
export async function getDeals(params = {}) {
  const { data } = await apiClient.get('/deals', { params });
  return data;
}

/**
 * Fetches micro-location list.
 * @returns {Promise<any>} API response.
 */
export async function getMicroLocations() {
  const { data } = await apiClient.get('/micro-locations');
  return data;
}
