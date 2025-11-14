import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { RegisterRequest } from '../types/auth.types';
import { useState } from 'react';

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
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterRequest>({
    resolver: zodResolver(registerSchema),
  });

  const handleFormSubmit = async (data: RegisterRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit(data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Rejestracja nie powiodła się';
      setError(errorMessage);
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
        <input
          {...register('password')}
          type="password"
          id="password"
          className="w-full px-4 py-3 bg-background border border-secondary rounded-lg 
                     text-foreground placeholder-foreground/50
                     focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                     transition-all"
          placeholder="Min. 8 znaków, wielka litera, cyfra"
        />
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

      {/* Error Message */}
      {error && (
        <div className="p-3 bg-accent/10 border border-accent rounded-lg">
          <p className="text-sm text-accent">{error}</p>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-4 bg-primary text-background font-semibold rounded-lg
                   hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background
                   disabled:opacity-50 disabled:cursor-not-allowed
                   transition-all"
      >
        {isLoading ? 'Rejestracja...' : 'Zarejestruj się'}
      </button>
    </form>
  );
}
