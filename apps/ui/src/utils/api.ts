// URL base de la API
export const API_BASE_URL = import.meta.env.VITE_RENDER_API_URL || "http://localhost:8000";

// Helper para construir URLs de endpoints
export const API_ENDPOINTS = {
  // Auth
  login: `${API_BASE_URL}/login`,
  register: `${API_BASE_URL}/register`,
  refreshToken: `${API_BASE_URL}/login/refresh-token`,
  
  // Users
  users: `${API_BASE_URL}/users`,
  usersDeleted: `${API_BASE_URL}/users/deleted`,
  userById: (id: number) => `${API_BASE_URL}/users/${id}`,
  userByEmail: (email: string) => `${API_BASE_URL}/users/${email}`,
  userRestore: (id: number) => `${API_BASE_URL}/users/restore/${id}`,
  userSkinType: (id: number) => `${API_BASE_URL}/users/skintype/${id}`,
  
  // Skin Types
  skinTypes: `${API_BASE_URL}/skintype`,
  skinTypeById: (id: number) => `${API_BASE_URL}/skintype/${id}`,
  
  // Products
  products: `${API_BASE_URL}/products`,
  productById: (id: number) => `${API_BASE_URL}/products/${id}`,
  productsByCategory: (category: string) => `${API_BASE_URL}/products/category/${category}`,
  productComments: (id: number) => `${API_BASE_URL}/products/${id}/comments`,
  deleteComment: (commentId: number) => `${API_BASE_URL}/products/comments/${commentId}`,
  productsFilter: `${API_BASE_URL}/products/filter`,
  productsTopRated: `${API_BASE_URL}/products/top-rated`,
  productsRecommendations: `${API_BASE_URL}/products/recommendations`,
  
  // Admin
  adminDashboard: `${API_BASE_URL}/admin/dashboard`,
  adminStats: `${API_BASE_URL}/admin/stats`,
  adminUsersDeleted: `${API_BASE_URL}/admin/users-deleted`,
} as const;
