import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { path: '/', label: 'Dashboard', icon: '📊' },
  { path: '/products', label: 'Produkty', icon: '📦' },
  { path: '/inventory', label: 'Magazyn', icon: '📍' },
  { path: '/orders', label: 'Zamówienia', icon: '🛒' },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 bg-secondary border-r border-secondary/50 min-h-[calc(100vh-4rem)]">
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-background font-semibold'
                  : 'text-foreground hover:bg-secondary/50'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
