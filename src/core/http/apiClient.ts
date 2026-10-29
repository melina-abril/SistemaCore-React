import { env } from '../../config/env';
import { getToken, onSessionExpired, setToken } from '../session/sessionStore';

const DEFAULT_ERROR = 'No pudimos completar la operación. Intenta nuevamente.';

export class ApiError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

async function errorDetail(response: Response): Promise<string> {
  try {
    const value: unknown = await response.json();
    if (typeof value === 'object' && value !== null && 'detail' in value) {
      const detail = value.detail;
      if (typeof detail === 'string' && detail.trim()) return detail;
    }
  } catch {
    // La respuesta no incluye un ProblemDetails legible.
  }
  return DEFAULT_ERROR;
}

async function request<T>(method: string, path: string, body?: unknown, signal?: AbortSignal): Promise<T> {
  const token = getToken();
  const headers = new Headers({ Accept: 'application/json' });
  if (token) headers.set('Authorization', `Bearer ${token}`);
  if (body !== undefined) headers.set('Content-Type', 'application/json');

  const response = await fetch(`${env.apiBaseUrl.replace(/\/$/, '')}/${path.replace(/^\/+/, '')}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    signal,
  });

  if (!response.ok) {
    const message = await errorDetail(response);
    if (response.status === 401 && token && path.replace(/^\/+/, '') !== 'auth/login') {
      onSessionExpired();
    }
    throw new ApiError(response.status, message);
  }

  const updatedToken = response.headers.get('X-Auth-Token');
  if (updatedToken && token) setToken(updatedToken);
  if (response.status === 204) return undefined as T;
  return await response.json() as T;
}

export function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  return request<T>('GET', path, undefined, signal);
}

export function apiPost<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  return request<T>('POST', path, body, signal);
}

export function apiPut<T>(path: string, body: unknown, signal?: AbortSignal): Promise<T> {
  return request<T>('PUT', path, body, signal);
}

export function apiDelete(path: string, signal?: AbortSignal): Promise<void> {
  return request<void>('DELETE', path, undefined, signal);
}
