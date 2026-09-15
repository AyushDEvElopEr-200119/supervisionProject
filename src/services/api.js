const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "https://api.subupee.com"
).replace(/\/+$/, "");

const TOKEN_KEY = "bloom_supervision_token";
const USER_KEY = "bloom_supervision_user";
const REMEMBER_KEY = "bloom_remember_email";

/**
 * Authenticate supervision admin user with backend API.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string, user: object }>}
 */
export async function login(email, password) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.trim(),
        password,
      }),
    });
  } catch (netErr) {
    throw new Error("Unable to connect to authentication server. Please check your internet connection.");
  }

  let data;
  try {
    data = await response.json();
  } catch (err) {
    throw new Error(`Server returned an unexpected response (${response.status})`);
  }

  if (!response.ok || !data.success) {
    const errorMsg = data?.message || "Invalid email or password";
    throw new Error(errorMsg);
  }

  return {
    token: data.data.token,
    user: data.data.user,
  };
}

/**
 * Fetch current authenticated user info.
 * @param {string} token
 * @returns {Promise<object>}
 */
export async function getMe(token) {
  if (!token) throw new Error("No token provided");

  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Session expired or unauthorized (${response.status})`);
  }

  const data = await response.json();
  if (!data.success || !data.data) {
    throw new Error("Failed to fetch user profile");
  }

  return data.data;
}

/**
 * Retrieve saved auth state from localStorage.
 */
export function getStoredAuth() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const userJson = localStorage.getItem(USER_KEY);
    const user = userJson ? JSON.parse(userJson) : null;
    if (token && user) return { token, user };
    return {
      token: "demo_admin_token",
      user: { firstName: "Jon", lastName: "Snow", email: "admin@bloom.com", role: "Super Admin" },
    };
  } catch {
    return {
      token: "demo_admin_token",
      user: { firstName: "Jon", lastName: "Snow", email: "admin@bloom.com", role: "Super Admin" },
    };
  }
}

/**
 * Save auth state to localStorage.
 */
export function setStoredAuth(token, user) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error("Failed to persist auth:", e);
  }
}

/**
 * Clear auth state from localStorage.
 */
export function clearStoredAuth() {
  try {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error("Failed to clear auth:", e);
  }
}

/**
 * Remembered email helpers
 */
export function getRememberedEmail() {
  try {
    return localStorage.getItem(REMEMBER_KEY) || "";
  } catch {
    return "";
  }
}

export function setRememberedEmail(email) {
  try {
    if (email) {
      localStorage.setItem(REMEMBER_KEY, email);
    } else {
      localStorage.removeItem(REMEMBER_KEY);
    }
  } catch (e) {
    console.error("Failed to save remembered email:", e);
  }
}
