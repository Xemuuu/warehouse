import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { LoginRequest } from '../types/auth.types';
import { useState } from 'react';
import { toast } from 'react-toastify';

const loginSchema = z.object({
  email: z.string().email('Niepoprawny format email'),
  password: z.string().min(1, 'Hasło jest wymagane'),
});

interface LoginFormProps {
  onSubmit: (data: LoginRequest) => Promise<void>;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
  });

  const handleFormSubmit = async (data: LoginRequest) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } catch (err) {
      toast.error('Niepoprawny email lub hasło');
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
            placeholder="••••••••"
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
        {isLoading ? 'Logowanie...' : 'Zaloguj się'}
      </button>
    </form>
  );
}
