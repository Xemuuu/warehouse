import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { RegisterRequest } from '../types/auth.types';
import { useState } from 'react';
import { toast } from 'react-toastify';

const registerSchema = z.object({
  email: z.string().email('Niepoprawny format email'),
  password: z
    .string()
    .min(8, 'Hasło musi mieć minimum 8 znaków')
    .regex(/[A-Z]/, 'Hasło musi zawierać wielką literę')
    .regex(/[a-z]/, 'Hasło musi zawierać małą literę')
    .regex(/[0-9]/, 'Hasło musi zawierać cyfrę'),
});

interface RegisterFormProps {
  onSubmit: (data: RegisterRequest) => Promise<void>;
}

export function RegisterForm({ onSubmit }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
  });

  const handleFormSubmit = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } catch (err: any) {
      if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        const firstError = Object.values(errors)[0] as string[];
        toast.error(firstError[0]);
      } else if (err.response?.data?.detail) {
        toast.error(err.response.data.detail);
      } else {
        toast.error('Rejestracja nie powiodła się');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email firmowy
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-3 bg-background border border-secondary rounded-lg 
                     text-foreground placeholder-foreground/50
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     transition-all"
          placeholder="twoj.email@adventure-works.com"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-accent">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
          Hasło
        </label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            id="password"
            className="w-full px-4 py-3 pr-12 bg-background border border-secondary rounded-lg 
                       text-foreground placeholder-foreground/50
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                       transition-all"
            placeholder="Min. 8 znaków, wielka litera, cyfra"
            disabled={isLoading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60 hover:text-foreground transition-colors"
            disabled={isLoading}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-accent">{errors.password.message}</p>
        )}
      </div>

      {/* Info */}
      <div className="p-3 bg-primary/10 border border-primary/30 rounded-lg">
        <p className="text-sm text-primary">
          ℹ️ Tylko pracownicy z bazy AdventureWorks mogą się zarejestrować
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-primary text-background font-semibold rounded-lg
                   hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all flex items-center justify-center gap-2"
      >
        {isLoading && (
          <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin"></div>
        )}
        {isLoading ? 'Rejestracja...' : 'Zarejestruj się'}
      </button>
    </form>
  );
}
