import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useSession } from './SessionContext';

interface RequireRoleProps {
  rol: 'OPERADOR' | 'SUPERVISOR';
  children: ReactNode;
}

export function RequireRole({ rol, children }: RequireRoleProps): ReactNode {
  const { sesion } = useSession();
  return sesion?.rol === rol ? children : <Navigate to="/" replace />;
}
