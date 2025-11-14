import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/authStore';

export function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-secondary border-b border-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">
              Warehouse System
            </h1>
          </div>

          {/* User Info + Logout */}
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-foreground">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-xs text-foreground/60">{user.role}</p>
            </div>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-accent text-background font-medium rounded-lg
                         hover:bg-accent/90 transition-colors"
            >
              Wyloguj
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
