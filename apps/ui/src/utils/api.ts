// no c si lo voy a usar
const API_BASE_URL = "http://localhost:8000";

interface ApiResponse<T> {
  ok: boolean;
  data?: T;
  error?: string;
  mensaje?: string;
}

// Token management
export const getAccessToken = (): string | null => {
  return localStorage.getItem("accessToken");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const setTokens = (accessToken: string, refreshToken: string): void => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

export const clearTokens = (): void => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAccessToken();
};

// Validate token by checking expiration
export const isTokenValid = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    return false;
  }
};

// Refresh access token
export const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/login/refresh-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await response.json();

    if (response.ok && data.ok) {
      localStorage.setItem("accessToken", data.data.accessToken);
      return data.data.accessToken;
    } else {
      clearTokens();
      return null;
    }
  } catch (error) {
    console.error("Token refresh error:", error);
    clearTokens();
    return null;
  }
};

// Generic API request function with auth
export const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  let accessToken = getAccessToken();

  const makeRequest = async (token: string | null) => {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...options.headers as Record<string, string>,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    return response;
  };

  let response = await makeRequest(accessToken);

  // If unauthorized, try to refresh token
  if (response.status === 401 && accessToken) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      response = await makeRequest(newToken);
    } else {
      // Redirect to login if refresh fails
      window.location.href = "/register";
      throw new Error("Authentication failed");
    }
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || data.mensaje || "Request failed");
  }

  return data;
};

// Authentication API calls
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.mensaje || "Login failed");
    }

    return data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || "Registration failed");
    }

    return data;
  },

  logout: () => {
    clearTokens();
    window.location.href = "/register";
  },
};

// User API calls
export const userApi = {
  assignSkinType: async (userId: number, skinTypeId: number) => {
    return apiRequest(`/users/skintype/${userId}`, {
      method: "POST",
      body: JSON.stringify({ skinTypeId }),
    });
  },

  getUserSkinTypes: async (userId: number) => {
    return apiRequest(`/users/skintype/${userId}`);
  },
};

// Skin type API calls
export const skinTypeApi = {
  getAllSkinTypes: async () => {
    return apiRequest("/skintype");
  },
};

// Product API calls
export const productApi = {
  getAllProducts: async () => {
    return apiRequest("/products");
  },

  getProductById: async (id: number) => {
    return apiRequest(`/products/${id}`);
  },

  getRecommendations: async () => {
    return apiRequest("/products/recommendations");
  },
};