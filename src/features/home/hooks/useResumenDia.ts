import { useCallback, useEffect, useState } from 'react';
import type { LoadState } from '../../../shared/models/loadState';
import { obtenerResumenDia } from '../api/homeApi';
import type { ResumenDia } from '../models/home.models';

export function useResumenDia(): { state: LoadState<ResumenDia>; reload: () => void } {
  const [state, setState] = useState<LoadState<ResumenDia>>({ status: 'loading' });
  const [intento, setIntento] = useState<number>(0);

  useEffect(() => {
    const controller = new AbortController();
    setState({ status: 'loading' });

    obtenerResumenDia(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ status: 'ready', data });
      })
      .catch(() => {
        if (!controller.signal.aborted) {
          setState({ status: 'error', message: 'No se pudo cargar el resumen del día' });
        }
      });

    return () => controller.abort();
  }, [intento]);

  const reload = useCallback((): void => setIntento((actual) => actual + 1), []);
  return { state, reload };
}
