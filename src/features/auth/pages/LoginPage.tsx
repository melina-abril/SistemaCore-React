import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSession } from '../../../core/session/SessionContext';
import { useLogin } from '../hooks/useLogin';
import './LoginPage.css';

export function LoginPage() {
  const [usuario, setUsuario] = useState<string>('');
  const [contrasena, setContrasena] = useState<string>('');
  const { state, ingresar } = useLogin();
  const { avisoSesionVencida } = useSession();
  const navigate = useNavigate();
  const location = useLocation();
  const sesionCerrada = typeof location.state === 'object' && location.state !== null
    && 'sesionCerrada' in location.state && location.state.sesionCerrada === true;

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    if (state.status === 'loading') return;
    if (await ingresar({ usuario, contrasena })) navigate('/', { replace: true });
  }

  return (
    <div className="login-page">
      <div className="login-shell">
        <section className="login-intro" aria-label="Sistema Core">
          <div className="login-brand">
            <div className="login-brand__mark" aria-hidden="true">
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <path d="M6 8.5L13 4L20 8.5V17.5L13 22L6 17.5V8.5Z" stroke="currentColor" strokeWidth="1.8" />
                <path d="M6.5 8.7L13 13L19.5 8.7M13 13V21" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              </svg>
            </div>
            <span>Sistema Core</span>
          </div>

          <div className="login-intro__message">
            <div className="login-intro__icon" aria-hidden="true">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="4" y="10" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.8" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h1>Acceso a la operación central</h1>
              <p>Ingresa para trabajar con clientes, cuentas, movimientos y el cierre diario desde un entorno seguro.</p>
            </div>
          </div>

          <div className="login-role-note">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path d="M10 2l7 3v4.7c0 4.1-2.5 6.8-7 8.3-4.5-1.5-7-4.2-7-8.3V5l7-3Z" stroke="currentColor" strokeWidth="1.6" />
              <path d="m7.5 10 1.7 1.7 3.5-3.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <div>
              <strong>Acceso según tu rol</strong>
              <span>Las pantallas y acciones disponibles dependen de si eres operador o supervisor.</span>
            </div>
          </div>
        </section>

        <main className="login-main">
          <div className="login-content">
            <header className="login-heading">
              <span>Acceso al sistema</span>
              <h2>Iniciar sesión</h2>
              <p>Ingresa tus credenciales para continuar.</p>
            </header>

            {avisoSesionVencida && (
              <div className="login-notice" role="status">Tu sesión venció. Ingresa nuevamente</div>
            )}
            {!avisoSesionVencida && sesionCerrada && (
              <div className="login-notice" role="status">Sesión cerrada</div>
            )}
            {state.status === 'error' && (
              <div className="login-error" role="alert">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" />
                  <path d="M10 5.8v4.8M10 13.7v.2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                <div>
                  <strong>{state.title}</strong>
                  {state.detail && <span>{state.detail}</span>}
                </div>
              </div>
            )}

            <form className="login-form" onSubmit={handleSubmit} noValidate>
              <div className="login-field">
                <label htmlFor="core-usuario">Usuario <span aria-hidden="true">*</span></label>
                <input id="core-usuario" name="usuario" type="text" autoComplete="username" required value={usuario} onChange={(event: ChangeEvent<HTMLInputElement>) => setUsuario(event.target.value)} />
              </div>
              <div className="login-field">
                <label htmlFor="core-contrasena">Contraseña <span aria-hidden="true">*</span></label>
                <input id="core-contrasena" name="contrasena" type="password" autoComplete="current-password" required aria-describedby="aviso-bloqueo" value={contrasena} onChange={(event: ChangeEvent<HTMLInputElement>) => setContrasena(event.target.value)} />
              </div>
              <button className="login-submit" type="submit" disabled={state.status === 'loading'}>
                {state.status === 'loading' ? 'Verificando acceso…' : 'Ingresar'}
              </button>
            </form>

            <div className="login-lock-note" id="aviso-bloqueo">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 2.5 18 17H2L10 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                <path d="M10 7.5v4.5M10 14.5v.2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p>Después de 5 intentos fallidos seguidos, el usuario queda bloqueado. Solo un supervisor puede desbloquearlo.</p>
            </div>

            <footer className="login-footer">
              <span>La sesión vence tras 30 minutos sin actividad.</span>
              <span>Cada ingreso, intento fallido y cierre de sesión queda registrado con usuario, fecha y hora.</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}
