import { createBrowserRouter } from 'react-router-dom';
import { ROUTES } from '@/shared/lib/constants/routes';
import HomePage from '@/pages/HomePage';

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
]);
