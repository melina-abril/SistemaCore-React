import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from './SessionContext';

interface RequireAuthProps {
  children: ReactNode;
}

export function RequireAuth({ children }: RequireAuthProps): ReactNode {
  const { sesion } = useSession();
  return sesion ? children : <Navigate to="/login" replace />;
}
