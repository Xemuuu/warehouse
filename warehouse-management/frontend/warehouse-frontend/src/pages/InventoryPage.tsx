import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { locationsApi } from '@/features/inventory/api/locationsApi';
import type { LocationStats } from '@/features/inventory/types/location.types';

export default function InventoryPage() {
  const [locations, setLocations] = useState<LocationStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const data = await locationsApi.getLocationsStats();
        setLocations(data);
        const totalProds = data.reduce((sum, loc) => sum + loc.productCount, 0);
        const totalVal = data.reduce((sum, loc) => sum + loc.totalValue, 0);
        setTotalProducts(totalProds);
        setTotalValue(totalVal);
      } catch (error: any) {
        console.error('Locations error:', error);
        console.error('Error response:', error.response?.data);
        toast.error(`Błąd pobierania lokalizacji: ${error.response?.data?.detail || error.message}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
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
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Magazyn 📍</h1>
        <p className="text-foreground/70">Lokalizacje magazynowe i statystyki</p>
      </div>

      {/* Lista lokalizacji */}
      <div className="space-y-4">
        {locations.map((location) => {
          const productPercentage = totalProducts > 0 ? (location.productCount / totalProducts * 100) : 0;
          const valuePercentage = totalValue > 0 ? (location.totalValue / totalValue * 100) : 0;
          
          return (
            <div
              key={location.locationId}
              className="bg-secondary rounded-lg p-6 border border-secondary/50 hover:border-primary transition-colors"
            >
              <div className="flex items-center gap-12">
                {/* 1. Ikona */}
                <span className="text-4xl">📦</span>

                {/* 2. Nazwa lokalizacji */}
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary">
                    {location.locationName}
                  </h3>
                </div>

                {/* 3. Produkty (liczba) */}
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{location.productCount}</div>
                  <div className="text-xs text-foreground/70">📦 Produkty</div>
                </div>

                {/* 4. Diagram produktów */}
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="8" fill="none" className="text-background" />
                    <circle
                      cx="40" cy="40" r="32"
                      stroke="currentColor" strokeWidth="8" fill="none"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      strokeDashoffset={`${2 * Math.PI * 32 * (1 - productPercentage / 100)}`}
                      className="text-blue-500 transition-all duration-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-blue-500">{productPercentage.toFixed(0)}%</span>
                  </div>
                </div>

                {/* 5. Alerty */}
                <div className="text-center ml-8">
                  <div className={`text-2xl font-bold ${location.lowStockCount > 0 ? 'text-accent' : 'text-foreground'}`}>
                    {location.lowStockCount}
                  </div>
                  <div className="text-xs text-foreground/70">⚠️ Alerty</div>
                </div>

                {/* 6. Wartość (kwota) */}
                <div className="text-center min-w-[120px] ml-8">
                  <div className="text-xl font-bold text-primary">
                    ${location.totalValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </div>
                  <div className="text-xs text-foreground/70">💰 Wartość</div>
                </div>

                {/* 7. Diagram wartości */}
                <div className="relative w-20 h-20">
                  <svg className="w-20 h-20 transform -rotate-90">
                    <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="8" fill="none" className="text-background" />
                    <circle
                      cx="40" cy="40" r="32"
                      stroke="currentColor" strokeWidth="8" fill="none"
                      strokeDasharray={`${2 * Math.PI * 32}`}
                      strokeDashoffset={`${2 * Math.PI * 32 * (1 - valuePercentage / 100)}`}
                      className="text-primary transition-all duration-500"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{valuePercentage.toFixed(0)}%</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
