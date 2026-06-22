import axios from 'axios';
import { BOOK_API_BASE_URL, STORAGE_KEYS_BOOK } from '../utils/constants';

const axiosInstance = axios.create({
  baseURL: BOOK_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// Attach token to every request via Authorization header
axiosInstance.interceptors.request.use((config) => {
  // const token = localStorage.getItem(STORAGE_KEYS_BOOK.TOKEN);
  config.headers['X-Auth-Token'] = `12345`;
  // if (token) {
  // }
  return config;
});

// Response interceptor: auto-refresh on 401, graceful 429 handling
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;
    const originalRequest = error.config;

    // Auto-refresh access token on 401 (except the refresh endpoint itself)
    if (
      status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem(STORAGE_KEYS_BOOK.REFRESH_TOKEN);
        const { data } = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          { refreshToken, expiresInMins: 30 },
          { withCredentials: true }
        );
        const newToken = data.accessToken;
        localStorage.setItem(STORAGE_KEYS_BOOK.TOKEN, newToken);
        axiosInstance.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        localStorage.removeItem(STORAGE_KEYS_BOOK.TOKEN);
        localStorage.removeItem(STORAGE_KEYS_BOOK.REFRESH_TOKEN);
        window.location.href = '/login';
        return Promise.reject(new Error('Session expired. Please log in again.'));
      } finally {
        isRefreshing = false;
      }
    }

    if (status === 429) {
      const err = new Error('Too many requests — using offline fallback.');
      err.isRateLimit = true;
      return Promise.reject(err);
    }

    const message =
      error.response?.data?.message || error.message || 'An error occurred';
    return Promise.reject(new Error(message));
  }
);

export default axiosInstance;
