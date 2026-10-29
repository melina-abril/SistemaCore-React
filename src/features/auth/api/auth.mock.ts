import { ApiError } from '../../../core/http/apiClient';
import { mockResponse } from '../../../core/http/mockResponse';
import type { LoginRequest, LoginResponse } from './authApi';

interface MockUser {
  contrasena: string;
  nombre: string;
  rol: LoginResponse['rol'];
}

const USERS: Record<string, MockUser> = {
  operador: { contrasena: 'Operador123!', nombre: 'Operador de ejemplo', rol: 'OPERADOR' },
  supervisor: { contrasena: 'Supervisor123!', nombre: 'Supervisor de ejemplo', rol: 'SUPERVISOR' },
};

const ATTEMPTS_KEY = 'sistema-core.mock-intentos';

function getAttempts(): Record<string, number> {
  try {
    const stored = sessionStorage.getItem(ATTEMPTS_KEY);
    if (!stored) return {};
    const parsed: unknown = JSON.parse(stored);
    if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) return {};
    const attempts: Record<string, number> = {};
    for (const [usuario, count] of Object.entries(parsed)) {
      if (typeof count === 'number' && Number.isInteger(count) && count >= 0) attempts[usuario] = count;
    }
    return attempts;
  } catch {
    return {};
  }
}

// El mock se reemplaza al conectar el backend; simula intentos consecutivos y bloqueo por usuario.
export async function mockLogin(request: LoginRequest): Promise<LoginResponse> {
  const usuario = request.usuario.trim().toLowerCase();
  const attempts = getAttempts();
  if ((attempts[usuario] ?? 0) >= 5) throw new ApiError(423, 'Usuario bloqueado');

  const user = USERS[usuario];
  if (!user || user.contrasena !== request.contrasena) {
    const count = (attempts[usuario] ?? 0) + 1;
    sessionStorage.setItem(ATTEMPTS_KEY, JSON.stringify({ ...attempts, [usuario]: count }));
    if (count >= 5) throw new ApiError(423, 'Usuario bloqueado');
    throw new ApiError(401, `Revisa los datos e intenta nuevamente. Intento fallido ${count} de 5.`);
  }

  const { [usuario]: _discarded, ...remainingAttempts } = attempts;
  void _discarded;
  sessionStorage.setItem(ATTEMPTS_KEY, JSON.stringify(remainingAttempts));
  return mockResponse({
    token: `mock-session-${usuario}`,
    expiraEn: new Date(Date.now() + 30 * 60 * 1000).toISOString(),
    nombre: user.nombre,
    rol: user.rol,
  });
}

export function mockLogout(): Promise<void> {
  return mockResponse(undefined);
}
