import { useState } from 'react';
import { ApiError } from '../../../core/http/apiClient';
import { useSession } from '../../../core/session/SessionContext';
import { login } from '../api/authApi';
import type { LoginRequest } from '../api/authApi';

type LoginState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'error'; title: string; detail?: string };

interface UseLoginResult {
  state: LoginState;
  ingresar: (request: LoginRequest) => Promise<boolean>;
}

export function useLogin(): UseLoginResult {
  const [state, setState] = useState<LoginState>({ status: 'idle' });
  const { iniciar } = useSession();

  async function ingresar(request: LoginRequest): Promise<boolean> {
    if (!request.usuario.trim() || !request.contrasena.trim()) {
      setState({ status: 'error', title: 'Completa usuario y contraseña para ingresar' });
      return false;
    }

    setState({ status: 'loading' });
    try {
      const response = await login({ usuario: request.usuario.trim(), contrasena: request.contrasena });
      iniciar({ token: response.token, usuario: request.usuario.trim(), nombre: response.nombre, rol: response.rol });
      setState({ status: 'idle' });
      return true;
    } catch (error: unknown) {
      if (error instanceof ApiError && error.status === 401) {
        const detail = /^Revisa los datos e intenta nuevamente\. Intento fallido [1-4] de 5\.$/.test(error.message)
          ? error.message
          : 'Revisa los datos e intenta nuevamente.';
        setState({ status: 'error', title: 'Usuario o contraseña incorrectos', detail });
      } else if (error instanceof ApiError && error.status === 423) {
        setState({ status: 'error', title: 'Usuario bloqueado. Pide a un supervisor que lo desbloquee' });
      } else {
        setState({ status: 'error', title: 'No se pudo verificar el acceso. Intenta nuevamente' });
      }
      return false;
    }
  }

  return { state, ingresar };
}
