// src/util/auth.js

// 🔐 Check if user is logged in
export const isLoggedIn = () => {
  return !!sessionStorage.getItem('token');
};

// 👤 Get user role
export const getUserRole = () => {
  return sessionStorage.getItem('role');
};

// 🔓 Logout function
export const logout = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('role');
  sessionStorage.clear(); // Optionally clear everything
};

// 🧠 Get token (if needed elsewhere for API headers)
export const getToken = () => {
  return sessionStorage.getItem('token');
};
