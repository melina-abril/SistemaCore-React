import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { Sesion } from '../../features/auth/models/auth.models';
import { clearSession, getSession, isSessionExpired, setSession, subscribe } from './sessionStore';

interface SessionValue {
  sesion: Sesion | null;
  isSupervisor: boolean;
  iniciar: (sesion: Sesion) => void;
  cerrar: () => void;
  avisoSesionVencida: boolean;
}

interface SessionProviderProps {
  children: ReactNode;
}

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: SessionProviderProps): ReactNode {
  const [sesion, setSesion] = useState<Sesion | null>(getSession);
  const [avisoSesionVencida, setAvisoSesionVencida] = useState<boolean>(isSessionExpired);

  useEffect(() => subscribe(() => {
    setSesion(getSession());
    setAvisoSesionVencida(isSessionExpired());
  }), []);

  const value: SessionValue = {
    sesion,
    isSupervisor: sesion?.rol === 'SUPERVISOR',
    iniciar: (nextSession: Sesion): void => setSession(nextSession),
    cerrar: (): void => clearSession(),
    avisoSesionVencida,
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const context = useContext(SessionContext);
  if (context === null) throw new Error('useSession requiere SessionProvider.');
  return context;
}
