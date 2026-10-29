import { getSession } from '../../../core/session/sessionStore';
import type { ResumenDia } from '../models/home.models';

// Datos de ejemplo con la forma del backend; se reemplazan al conectarlo.
export function crearResumenDiaMock(): ResumenDia {
  const ahora = new Date();
  const fechaOperativa = `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}-${String(ahora.getDate()).padStart(2, '0')}`;
  const sesion = getSession();

  return {
    nombre: sesion?.nombre ?? 'Operador de ejemplo',
    rol: sesion?.rol ?? 'OPERADOR',
    fechaOperativa,
    cantidadMovimientos: 12,
    estadoCierre: 'Pendiente',
  };
}
