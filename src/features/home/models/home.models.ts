export type Rol = 'OPERADOR' | 'SUPERVISOR';

export type EstadoCierre = 'Pendiente' | 'En curso' | 'Completado';

export interface ResumenDia {
  nombre: string;
  rol: Rol;
  fechaOperativa: string;
  cantidadMovimientos: number;
  estadoCierre: EstadoCierre;
}
