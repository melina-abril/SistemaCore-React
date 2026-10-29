import type { Sesion } from '../../features/auth/models/auth.models';

const SESSION_KEY = 'sistema-core.sesion';
const listeners = new Set<() => void>();
let sessionExpired = false;

function notify(): void {
  listeners.forEach((listener) => listener());
}

export function getSession(): Sesion | null {
  try {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (!stored) return null;

    const value: unknown = JSON.parse(stored);
    if (typeof value !== 'object' || value === null) return null;
    const candidate = value as Record<string, unknown>;
    if (
      typeof candidate.token !== 'string' ||
      typeof candidate.usuario !== 'string' ||
      typeof candidate.nombre !== 'string' ||
      (candidate.rol !== 'OPERADOR' && candidate.rol !== 'SUPERVISOR')
    ) return null;

    return {
      token: candidate.token,
      usuario: candidate.usuario,
      nombre: candidate.nombre,
      rol: candidate.rol,
    };
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  return getSession()?.token ?? null;
}

export function setToken(token: string): void {
  const session = getSession();
  if (session) setSession({ ...session, token });
}

export function setSession(session: Sesion): void {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  sessionExpired = false;
  notify();
}

export function clearSession(): void {
  sessionStorage.removeItem(SESSION_KEY);
  sessionExpired = false;
  notify();
}

export function onSessionExpired(): void {
  sessionStorage.removeItem(SESSION_KEY);
  sessionExpired = true;
  notify();
}

export function isSessionExpired(): boolean {
  return sessionExpired;
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}
