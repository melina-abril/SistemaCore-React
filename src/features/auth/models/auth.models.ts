export interface Sesion {
  token: string;
  usuario: string;
  nombre: string;
  rol: 'OPERADOR' | 'SUPERVISOR';
}
