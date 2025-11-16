import { useEffect, useState } from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import { authApi } from '@/features/auth/api/authApi';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isValidating, setIsValidating] = useState(true);
  const { isAuthenticated, setAuth, logout } = useAuthStore();

  useEffect(() => {
    const validateToken = async () => {
      // Jeśli nie ma tokenu - skip
      if (!isAuthenticated) {
        setIsValidating(false);
        return;
      }

      try {
        // Sprawdź token przez API
        const user = await authApi.getMe();
        
        // Token OK - zaktualizuj store
        setAuth(
          {
            userId: user.userId,
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
          },
          useAuthStore.getState().token! // Zachowaj istniejący token
        );
      } catch (error) {
        // Token niepoprawny/wygasły - wyloguj
        console.error('Token validation failed:', error);
        logout();
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, []);

  // Loading screen podczas walidacji
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground">Ładowanie...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
