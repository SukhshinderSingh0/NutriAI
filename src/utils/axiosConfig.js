import axios from 'axios';

const rawApiUrl = import.meta.env.VITE_API_URL;
// Strip trailing slashes to prevent malformed URLs like https://host//api/...
const resolvedBaseURL = rawApiUrl ? rawApiUrl.replace(/\/+$/, '') : 'http://localhost:5001';

const api = axios.create({
  baseURL: resolvedBaseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to automatically attach the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle 401s (token expired/invalid)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token and force logout if unauthorized
      localStorage.removeItem('token');
      window.dispatchEvent(new Event('auth-error'));
    }
    return Promise.reject(error);
  }
);

export default api;
