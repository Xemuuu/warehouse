import { useState, useEffect } from 'react';
import { useAuthStore } from '@/features/auth/store/authStore';
import { dashboardApi } from '@/features/dashboard/api/dashboardApi';
import type { DashboardStats } from '@/features/dashboard/types/dashboard.types';
import { toast } from 'react-toastify';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        console.log('Fetching dashboard stats...'); // ✅ Debug
        const data = await dashboardApi.getStats();
        console.log('Dashboard stats:', data); // ✅ Debug
        setStats(data);
      } catch (error: any) {
        console.error('Dashboard error:', error); // ✅ Debug
        console.error('Error response:', error.response?.data); // ✅ Debug
        toast.error(`Błąd: ${error.response?.data?.detail || error.message || 'Nieznany błąd'}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Powitanie */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">
          Witaj, {user?.firstName} {user?.lastName}! 👋
        </h1>
        <p className="text-foreground/70">Rola: {user?.role}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Card 1 - Produkty */}
        <div className="bg-secondary rounded-lg p-6 border border-secondary/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">📦</span>
            <span className="text-foreground/60 text-sm">Produkty</span>
          </div>
          <div className="text-3xl font-bold text-primary">
            {stats?.totalProducts.toLocaleString()}
          </div>
          <p className="text-foreground/60 text-sm mt-2">Wszystkie produkty</p>
        </div>

        {/* Card 2 - Lokalizacje */}
        <div className="bg-secondary rounded-lg p-6 border border-secondary/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">📍</span>
            <span className="text-foreground/60 text-sm">Lokalizacje</span>
          </div>
          <div className="text-3xl font-bold text-primary">
            {stats?.totalLocations}
          </div>
          <p className="text-foreground/60 text-sm mt-2">Strefy magazynowe</p>
        </div>

        {/* Card 3 - Wartość */}
        <div className="bg-secondary rounded-lg p-6 border border-secondary/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">💰</span>
            <span className="text-foreground/60 text-sm">Wartość</span>
          </div>
          <div className="text-3xl font-bold text-primary">
            ${stats?.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-foreground/60 text-sm mt-2">Całkowita wartość</p>
        </div>

        {/* Card 4 - Alerty */}
        <div className="bg-secondary rounded-lg p-6 border border-accent/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">⚠️</span>
            <span className="text-accent text-sm">Alerty</span>
          </div>
          <div className="text-3xl font-bold text-accent">
            {stats?.lowStockCount}
          </div>
          <p className="text-foreground/60 text-sm mt-2">Poniżej minimum</p>
        </div>
      </div>
    </div>
  );
}
