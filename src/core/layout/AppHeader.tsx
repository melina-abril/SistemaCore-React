import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../features/auth/api/authApi';
import { useSession } from '../session/SessionContext';
import './layout.css';

export function AppHeader() {
  const { sesion, cerrar } = useSession();
  const navigate = useNavigate();
  const [cerrando, setCerrando] = useState<boolean>(false);

  async function cerrarSesion(): Promise<void> {
    if (cerrando) return;
    setCerrando(true);
    try {
      await logout();
    } catch {
      // Se cierra la sesión local aunque el servidor no responda.
    } finally {
      cerrar();
      navigate('/login', { replace: true });
      setCerrando(false);
    }
  }

  return (
    <header className="app-header">
      <a className="app-header__brand" href="/" aria-label="Sistema Core, ir al inicio">Sistema Core</a>
      <div className="app-header__account">
        <span className="app-header__identity">{sesion?.nombre} <span className="app-header__role">{sesion?.rol === 'SUPERVISOR' ? 'Supervisor' : 'Operador'}</span></span>
        <button type="button" className="button button--secondary" onClick={() => void cerrarSesion()} disabled={cerrando}>
          {cerrando ? 'Cerrando sesión…' : 'Cerrar sesión'}
        </button>
      </div>
    </header>
  );
}
