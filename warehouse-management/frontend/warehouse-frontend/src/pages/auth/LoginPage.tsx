import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/authStore';
import { authApi } from '@/features/auth/api/authApi';
import { LoginForm } from '@/features/auth/components/LoginForm';
import type { LoginRequest } from '@/features/auth/types/auth.types';
import { useEffect } from 'react';

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Jeśli już zalogowany - redirect do home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (data: LoginRequest) => {
    try {
      const response = await authApi.login(data);
      
      // Zapisz do store (automatycznie do localStorage przez persist)
      setAuth(
        {
          userId: response.userId,
          email: response.email,
          role: response.role,
          firstName: response.firstName,
          lastName: response.lastName,
        },
        response.token
      );

      // Redirect do dashboard
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="w-full max-w-md px-4">
        <div className="bg-secondary rounded-lg shadow-xl p-8">
          <h1 className="text-3xl font-bold text-center text-primary mb-2">
            Warehouse System
          </h1>
          <p className="text-center text-foreground/70 mb-8">
            Zaloguj się do systemu
          </p>

          <LoginForm onSubmit={handleLogin} />

          {/* Link do rejestracji */}
          <div className="mt-6 text-center">
            <p className="text-sm text-foreground/60">
              Nie masz konta?{' '}
              <button
                onClick={() => navigate('/register')}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Zarejestruj się
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
