export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ROUTES = {
  LOGIN: '/login',
  HOME: '/',
};

export const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  REFRESH_TOKEN: 'auth_refresh_token',
  USER: 'auth_user',
};

export const PRODUCT_LIMITS = {
  PAGE_SIZE: 10,
};
