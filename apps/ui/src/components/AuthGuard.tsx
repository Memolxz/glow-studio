import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, refreshAccessToken, clearTokens } from '../utils/api';

interface AuthGuardProps {
  children: React.ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
        const protectedRoutes = ['/recommendations', '/profile'];
        try {
            const hasTokens = isAuthenticated();
            
            if (hasTokens) {
            // Try to refresh token to verify it's still valid
            const newToken = await refreshAccessToken();
            
            if (newToken) {
                setIsAuth(true);
                
                // Redirect authenticated users away from auth pages
                if (location.pathname === '/register' || location.pathname === '/') {
                navigate('/recommendations', { replace: true });
                return;
                }
            } else {
                // Tokens are invalid, clear them
                clearTokens();
                setIsAuth(false);
            }
            } else {
            setIsAuth(false);
            
            // Redirect unauthenticated users to register page from protected routes
            if (protectedRoutes.includes(location.pathname)) {
                navigate('/register', { replace: true });
                return;
            }
            }
        } catch (error) {
            console.error('Auth check error:', error);
            clearTokens();
            setIsAuth(false);
            
            // Redirect to register on error
            if (protectedRoutes.includes(location.pathname)) {
            navigate('/register', { replace: true });
            }
        } finally {
            setIsLoading(false);
        }
        };

        checkAuth();
    }, [navigate, location.pathname]);

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
        <div className="flex items-center justify-center min-h-screen bg-defaultbg">
            <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-darkblue"></div>
            <p className="mt-4 text-darkblue font-inter">Verificando sesión...</p>
            </div>
        </div>
        );
    }

    return <>{children}</>;
}