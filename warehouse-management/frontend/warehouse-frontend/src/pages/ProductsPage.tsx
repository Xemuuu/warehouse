import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { productsApi } from '@/features/products/api/productsApi';
import type { Product, PagedResult } from '@/features/products/types/product.types';

export default function ProductsPage() {
  const [products, setProducts] = useState<PagedResult<Product> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filtry
  const [color, setColor] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [locationId, setLocationId] = useState('');  // ✅ DODANE
  
  const pageSize = 20;

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const data = await productsApi.getProducts({
        search: search || undefined,
        color: color || undefined,
        minPrice: minPrice ? parseFloat(minPrice) : undefined,
        maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,
        locationId: locationId ? parseInt(locationId) : undefined,
        page,
        pageSize,
        orderBy,
      });
      console.log('API Response:', data);  // ✅ DEBUG
      console.log('First product:', data.items[0]);  // ✅ DEBUG
      setProducts(data);
    } catch (error) {
      toast.error('Błąd pobierania produktów');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, search, color, minPrice, maxPrice, locationId, orderBy]);  // ✅ ZMIANA - auto-fetch przy zmianie filtrów

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const handleApplyFilters = () => {
    setPage(1);
    fetchProducts();
  };

  const handleClearFilters = () => {
    setColor('');
    setMinPrice('');
    setMaxPrice('');
    setOrderBy('name');
    setLocationId('');  // ✅ DODANE
    setPage(1);
    setTimeout(() => fetchProducts(), 0);
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-2">Produkty 📦</h1>
        <p className="text-foreground/70">Lista wszystkich produktów w magazynie</p>
      </div>

      {/* Search + Filter Toggle */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Szukaj produktu..."
            className="flex-1 px-4 py-3 bg-background border border-secondary rounded-lg 
                       text-foreground placeholder-foreground/50
                       focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-background font-semibold rounded-lg
                       hover:bg-primary/90 transition-colors"
          >
            🔍 Szukaj
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className="px-6 py-3 bg-secondary text-foreground font-semibold rounded-lg
                       hover:bg-secondary/80 transition-colors flex items-center gap-2"
          >
            🎛️ Filtry {showFilters ? '▲' : '▼'}
          </button>
        </div>
      </form>

      {/* Advanced Filters (Collapsible) */}
      {showFilters && (
        <div className="mb-6 p-6 bg-secondary rounded-lg border border-secondary/50">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Color Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                🎨 Kolor
              </label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-secondary rounded-lg
                           text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Wszystkie</option>
                <option value="Black">Black</option>
                <option value="Silver">Silver</option>
                <option value="Red">Red</option>
                <option value="Blue">Blue</option>
                <option value="Yellow">Yellow</option>
                <option value="White">White</option>
              </select>
            </div>

            {/* Min Price */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                💰 Cena od ($)
              </label>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-3 bg-background border border-secondary rounded-lg
                           text-foreground placeholder-foreground/50
                           focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Max Price */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                💰 Cena do ($)
              </label>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="10000"
                className="w-full px-4 py-3 bg-background border border-secondary rounded-lg
                           text-foreground placeholder-foreground/50
                           focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* ✅ NOWE: Location Filter */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                📍 Lokalizacja
              </label>
              <select
                value={locationId}
                onChange={(e) => setLocationId(e.target.value)}
                className="w-full px-4 py-3 bg-background border border-secondary rounded-lg
                           text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Wszystkie</option>
                <option value="1">Tool Crib</option>
                <option value="2">Sheet Metal Racks</option>
                <option value="3">Paint Shop</option>
                <option value="4">Paint Storage</option>
                <option value="5">Metal Storage</option>
                <option value="6">Miscellaneous Storage</option>
                <option value="7">Finished Goods Storage</option>
                <option value="10">Frame Forming</option>
                <option value="20">Frame Welding</option>
                <option value="30">Debur and Polish</option>
                <option value="40">Paint</option>
                <option value="45">Specialized Paint</option>
                <option value="50">Subassembly</option>
                <option value="60">Final Assembly</option>
              </select>
            </div>
          </div>

          {/* Sort By */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              📊 Sortuj po
            </label>
            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
              className="w-full md:w-1/3 px-4 py-3 bg-background border border-secondary rounded-lg
                         text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="name">Nazwa (A-Z)</option>
              <option value="price_asc">Cena rosnąco</option>
              <option value="price_desc">Cena malejąco</option>
              <option value="stock">Stan magazynowy</option>
            </select>
          </div>

          {/* Filter Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleApplyFilters}
              className="px-6 py-3 bg-primary text-background font-semibold rounded-lg
                         hover:bg-primary/90 transition-colors"
            >
              ✅ Zastosuj filtry
            </button>
            <button
              onClick={handleClearFilters}
              className="px-6 py-3 bg-accent text-background font-semibold rounded-lg
                         hover:bg-accent/90 transition-colors"
            >
              🗑️ Wyczyść
            </button>
          </div>
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Table */}
      {!isLoading && products && (
        <>
          <div className="bg-secondary rounded-lg overflow-hidden border border-secondary/50">
            <table className="w-full">
              <thead className="bg-background">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Nazwa</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Numer</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Kolor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Cena</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Stan</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Kategoria</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Lokalizacja</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary/50">
                {products.items.map((product) => (
                  <tr key={product.productId} className="hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-foreground">{product.productId}</td>
                    <td className="px-6 py-4 text-sm text-foreground font-medium">{product.productName}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{product.productNumber}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{product.color || '-'}</td>
                    <td className="px-6 py-4 text-sm text-primary font-semibold">${product.listPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{product.totalStock}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{product.categoryName || '-'}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">
                      {(product as any).locationnames || (product as any).locationNames || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-foreground/70">
              Pokazano {products.items.length} z {products.totalCount} produktów
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage(page - 1)}
                disabled={!products.hasPreviousPage}
                className="px-4 py-2 bg-secondary text-foreground rounded-lg
                           hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors"
              >
                ← Poprzednia
              </button>

              <span className="px-4 py-2 text-foreground">
                Strona {products.page} / {products.totalPages}
              </span>

              <button
                onClick={() => setPage(page + 1)}
                disabled={!products.hasNextPage}
                className="px-4 py-2 bg-secondary text-foreground rounded-lg
                           hover:bg-secondary/80 disabled:opacity-50 disabled:cursor-not-allowed
                           transition-colors"
              >
                Następna →
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ✅ Helper function - mapowanie ID na nazwę lokalizacji
function getLocationName(id: number): string {
  const locations: Record<number, string> = {
    1: 'Tool Crib',
    2: 'Sheet Metal Racks',
    3: 'Paint Shop',
    4: 'Paint Storage',
    5: 'Metal Storage',
    6: 'Miscellaneous Storage',
    7: 'Finished Goods Storage',
    10: 'Frame Forming',
    20: 'Frame Welding',
    30: 'Debur and Polish',
    40: 'Paint',
    45: 'Specialized Paint',
    50: 'Subassembly',
    60: 'Final Assembly',
  };
  return locations[id] || 'Nieznana';
}
