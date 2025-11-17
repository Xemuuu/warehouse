import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/constants/routes';
import DashboardPage from '@/pages/DashboardPage';
import ProductsPage from '@/pages/ProductsPage';
import InventoryPage from '@/pages/InventoryPage';
import PurchaseOrdersPage from '@/pages/PurchaseOrdersPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import { ProtectedRoute } from '@/shared/components/ProtectedRoute';
import { Layout } from '@/shared/components/layout/Layout';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedRoute>
        <Layout>
          <DashboardPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/products',
    element: (
      <ProtectedRoute>
        <Layout>
          <ProductsPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/inventory',
    element: (
      <ProtectedRoute>
        <Layout>
          <InventoryPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/purchase-orders',
    element: (
      <ProtectedRoute>
        <Layout>
          <PurchaseOrdersPage />
        </Layout>
      </ProtectedRoute>
    ),
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
]);
