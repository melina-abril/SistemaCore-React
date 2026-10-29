import { env } from '../../../config/env';
import { apiPost } from '../../../core/http/apiClient';
import type { Sesion } from '../models/auth.models';
import { mockLogin, mockLogout } from './auth.mock';

export interface LoginRequest {
  usuario: string;
  contrasena: string;
}

export interface LoginResponse {
  token: string;
  expiraEn: string;
  nombre: string;
  rol: Sesion['rol'];
}

export function login(request: LoginRequest): Promise<LoginResponse> {
  return env.useMock ? mockLogin(request) : apiPost<LoginResponse>('/auth/login', request);
}

export function logout(): Promise<void> {
  return env.useMock ? mockLogout() : apiPost<void>('/auth/logout', {});
}
