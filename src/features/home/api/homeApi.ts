import { env } from '../../../config/env';
import { apiGet } from '../../../core/http/apiClient';
import { mockResponse } from '../../../core/http/mockResponse';
import type { ResumenDia } from '../models/home.models';
import { crearResumenDiaMock } from './home.mock';

export function obtenerResumenDia(signal?: AbortSignal): Promise<ResumenDia> {
  return env.useMock
    ? mockResponse(crearResumenDiaMock())
    : apiGet<ResumenDia>('/inicio/resumen', signal);
}
