import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    // Check if token is expired
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Date.now() / 1000;
    return payload.exp > currentTime;
  } catch (error) {
    // If token is malformed, consider it invalid
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return false;
  }
};

export const RequireAuth = ({ children }: { children: ReactNode }) => {
  const authenticated = isAuthenticated();
  
  if (!authenticated) {
    return <Navigate to="/register" replace />;
  }

  return <>{children}</>;
};

export const IsAdminUser = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("accessToken");
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.isAdmin === true) {
      return <>{children}</>;
    }
    else {
      return <Navigate to="/home" replace />;
    }
  } catch (error) {
    return <>{children}</>;
  }
};

export const RequireGuest = ({ children }: { children: ReactNode }) => {
  const authenticated = isAuthenticated();
  
  if (authenticated) {
    return <Navigate to="/recommendations" replace />;
  }

  return <>{children}</>;
};