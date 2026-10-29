import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import { useSession } from '../../core/session/SessionContext';
import { LoginPage } from './pages/LoginPage';

function LoginRoute() {
  const { sesion } = useSession();
  return sesion ? <Navigate to="/" replace /> : <LoginPage />;
}

export const AUTH_ROUTES: RouteObject[] = [
  { path: '/login', element: <LoginRoute /> },
];
