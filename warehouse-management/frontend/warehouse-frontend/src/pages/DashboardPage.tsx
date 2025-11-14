import { useAuthStore } from '@/features/auth/store/authStore';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-secondary rounded-lg p-6 border border-secondary/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">📦</span>
            <span className="text-foreground/60 text-sm">Produkty</span>
          </div>
          <div className="text-3xl font-bold text-primary">1,234</div>
          <p className="text-foreground/60 text-sm mt-2">Wszystkie produkty</p>
        </div>

        {/* Card 2 */}
        <div className="bg-secondary rounded-lg p-6 border border-secondary/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">📍</span>
            <span className="text-foreground/60 text-sm">Lokalizacje</span>
          </div>
          <div className="text-3xl font-bold text-primary">14</div>
          <p className="text-foreground/60 text-sm mt-2">Strefy magazynowe</p>
        </div>

        {/* Card 3 */}
        <div className="bg-secondary rounded-lg p-6 border border-secondary/50">
          <div className="flex items-center justify-between mb-4">
            <span className="text-4xl">💰</span>
            <span className="text-foreground/60 text-sm">Wartość</span>
          </div>
          <div className="text-3xl font-bold text-primary">$45.2k</div>
          <p className="text-foreground/60 text-sm mt-2">Całkowita wartość</p>
        </div>
      </div>

      {/* Alerty */}
      <div className="bg-secondary rounded-lg p-6 border border-accent/30">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">⚠️</span>
          <h2 className="text-xl font-semibold text-accent">
            Produkty poniżej minimum
          </h2>
        </div>
        <ul className="space-y-3">
          <li className="flex items-center justify-between text-foreground">
            <span>Mountain Bike - Tool Crib</span>
            <span className="text-accent font-semibold">5 / 25 szt</span>
          </li>
          <li className="flex items-center justify-between text-foreground">
            <span>Road Helmet - Paint Shop</span>
            <span className="text-accent font-semibold">12 / 50 szt</span>
          </li>
          <li className="flex items-center justify-between text-foreground">
            <span>Bike Frame - Frame Forming</span>
            <span className="text-accent font-semibold">8 / 30 szt</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
