import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/authStore';
import { authApi } from '@/features/auth/api/authApi';
import { RegisterForm } from '@/features/auth/components/RegisterForm';
import type { RegisterRequest } from '@/features/auth/types/auth.types';
import { useEffect } from 'react';
import { toast } from 'react-toastify';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { setAuth, isAuthenticated } = useAuthStore();

  // Jeśli już zalogowany - redirect do home
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (data: RegisterRequest) => {
    try {
      const response = await authApi.register(data);
      
      // Zapisz do store
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

      toast.success(`Konto utworzone! Witaj, ${response.firstName}! 🎉`);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
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
            Zarejestruj się do systemu
          </p>

          <RegisterForm onSubmit={handleRegister} />

          {/* Link do logowania */}
          <div className="mt-6 text-center">
            <p className="text-sm text-foreground/60">
              Masz już konto?{' '}
              <button
                onClick={() => navigate('/login')}
                className="text-primary hover:text-primary/80 font-medium"
              >
                Zaloguj się
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
