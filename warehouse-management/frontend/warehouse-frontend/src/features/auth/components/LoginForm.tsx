import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { LoginRequest } from '../types/auth.types';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().email('Niepoprawny format email'),
  password: z.string().min(1, 'Hasło jest wymagane'),
});

interface LoginFormProps {
  onSubmit: (data: LoginRequest) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = async (data: LoginRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      await onSubmit(data);
    } catch (err) {
      setError('Niepoprawny email lub hasło');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
          Email
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
          placeholder="••••••••"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-accent">{errors.password.message}</p>
        )}
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
        {isLoading ? 'Logowanie...' : 'Zaloguj się'}
      </button>
    </form>
  );
}
