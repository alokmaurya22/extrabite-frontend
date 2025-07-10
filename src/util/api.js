import axios from 'axios';

// Environment Variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_API_KEY;

// Axios Instance with Defaults
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'EXTRABITE-API-KEY': API_KEY,
  },
});

// Attach Authorization Token (If Logged In), but skip for stats endpoints
api.interceptors.request.use((config) => {
  // List of stats endpoints that should NOT have Authorization header
  const statsEndpoints = [
    '/analytics/statistics/yearly',
    '/analytics/statistics/growth-rate',
    '/analytics/statistics/daily-comparison',
    '/analytics/statistics/food-waste-sources',
    '/analytics/statistics/summary',
    '/analytics/statistics/hunger-vs-foodwaste-bar',
  ];
  const isStatsEndpoint = statsEndpoints.some((endpoint) => config.url && config.url.includes(endpoint));
  if (!isStatsEndpoint) {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } else {
    // Remove Authorization header if present
    if (config.headers && config.headers.Authorization) {
      delete config.headers.Authorization;
    }
  }
  return config;
});

// Wake up backend on platforms like Render
export const wakeBackend = async () => {
  try {
    await axios.get(BASE_URL.replace('/api', '') + '/welcome', {
      headers: { 'EXTRABITE-API-KEY': API_KEY },
    });
    console.log('✅ Backend is awake');
  } catch (err) {
    console.warn('⚠️ Wake-up failed:', err.message);
  }
};

/* AUTHENTICATION */
export const registerUser = async (formData) => {
  const res = await api.post('/auth/register', formData);
  return res.data;
};

export const loginUser = async (credentials) => {
  const res = await api.post('/auth/login', credentials);
  return res.data;
};

export const resetPassword = async ({ email, contactNumber, newPassword }) => {
  const res = await api.post('/auth/reset-password', {
    email,
    contactNumber,
    newPassword,
  });
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};

/* USER PROFILE */
export const getUserProfile = async () => {
  const res = await api.get('/user/profile');
  return res.data;
};

export const updateUserProfile = async (updateData) => {
  const res = await api.put('/user/update-profile', updateData);
  return res.data;
};

/* DIRECTORY */
export const searchUsers = async (params = {}) => {
  const res = await api.get('/directory/users/search', { params });
  return res.data;
};

/* USER ANALYTICS */
export const getUserAnalyticsSummary = async () => {
  const res = await api.get('/analytics/user/summary');
  return res.data;
};

export const getUserDonationsAnalytics = async () => {
  const res = await api.get('/analytics/user/donations');
  return res.data;
};

export const getUserRatingsAnalytics = async () => {
  const res = await api.get('/analytics/user/ratings');
  return res.data;
};

export const getUserFoodRequestsAnalytics = async () => {
  const res = await api.get('/analytics/user/food-requests');
  return res.data;
};

/* USER DONATIONS & REQUESTS */
export const getMyDonations = async () => {
  const res = await api.get('/donations/my-donations');
  return res.data;
};

export const getMyReceivedRequests = async () => {
  const res = await api.get('/requests/my-received-requests');
  return res.data;
};

// USER REQUESTS
export const getMySentRequests = async () => {
  const res = await api.get('/requests/my-sent-requests');
  return res.data;
};

export const cancelRequest = async (requestId) => {
  const res = await api.post(`/requests/${requestId}/cancel`);
  return res.data;
};

export const acceptRequest = async (requestId) => {
  const res = await api.post(`/requests/${requestId}/accept`);
  return res.data;
};

export const rejectRequest = async (requestId) => {
  const res = await api.post(`/requests/${requestId}/reject`);
  return res.data;
};

export const confirmPickup = async (requestId, pickupCode) => {
  const res = await api.post(`/requests/${requestId}/confirm-pickup`, { pickupCode });
  return res.data;
};

export const getPickupCode = async (requestId) => {
  const res = await api.get(`/requests/${requestId}/pickup-code`);
  return res.data;
};

// RATINGS
export const submitRating = async (donationRequestId, rating, comment) => {
  const res = await api.post('/ratings/submit', { donationRequestId, rating, comment });
  return res.data;
};

/* ADMIN ANALYTICS */
export const getAdminPlatformSummary = async () => {
  const res = await api.get('/analytics/admin/summary');
  return res.data;
};

export const getAdminDonationsReport = async () => {
  const res = await api.get('/analytics/admin/donations');
  return res.data;
};

export const getAdminUsersReport = async () => {
  const res = await api.get('/analytics/admin/users');
  return res.data;
};

export const getAdminRequestedDonations = async () => {
  const res = await api.get('/analytics/admin/requested-donations');
  return res.data;
};

/* PUBLIC ENDPOINTS */

// Get Top Donors (with optional filters)
export const getTopDonors = async ({ location = '', available = null } = {}) => {
  const params = {};
  if (location) params.location = location;
  if (available !== null) params.available = available;

  const res = await api.get('/analytics/public/top-donors', { params });
  return res.data;
};

// Statistics API Endpoints
export const getYearlyStatistics = async (params = {}) => {
  const res = await api.get('/analytics/statistics/yearly', { params });
  return res.data;
};

export const getGrowthRateStatistics = async (params = {}) => {
  const res = await api.get('/analytics/statistics/growth-rate', { params });
  return res.data;
};

export const getDailyComparisonStatistics = async (params = {}) => {
  const res = await api.get('/analytics/statistics/daily-comparison', { params });
  return res.data;
};

export const getFoodWasteSourcesStatistics = async (params = {}) => {
  const res = await api.get('/analytics/statistics/food-waste-sources', { params });
  return res.data;
};

export const getStatisticsSummary = async (params = {}) => {
  const res = await api.get('/analytics/statistics/summary', { params });
  return res.data;
};

export const getHungerVsFoodWasteBar = async (params = {}) => {
  const res = await api.get('/analytics/statistics/hunger-vs-foodwaste-bar', { params });
  return res.data;
};

// Get all available donations (public endpoint)
export const getAvailableDonations = async () => {
  const res = await api.get('/browse/donations');
  return res.data;
};

// ADMIN/SUPERADMIN ENDPOINTS
export const getAllDonations = async () => {
  const res = await api.get('/donations/all');
  return res.data;
};

export const blockUser = async (userId) => {
  const res = await api.post(`/superadmin/block-user/${userId}`);
  return res.data;
};

export const unblockUser = async (userId) => {
  const res = await api.post(`/superadmin/unblock-user/${userId}`);
  return res.data;
};

export const getUserById = async (userId) => {
  const res = await api.get(`/superadmin/user/${userId}`);
  return res.data;
};

export const registerAdmin = async (adminData) => {
  const res = await api.post('/superadmin/register-admin', adminData);
  return res.data;
};

export const createAdmin = async (adminData) => {
  const res = await api.post('/admin/create-admin', adminData);
  return res.data;
};