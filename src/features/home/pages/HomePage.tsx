import type { ReactElement } from 'react';
import { useSession } from '../../../core/session/SessionContext';
import { ErrorAlert } from '../../../shared/components/ErrorAlert';
import { LoadingState } from '../../../shared/components/LoadingState';
import { PageHeader } from '../../../shared/components/PageHeader';
import { DaySummaryCard } from '../components/DaySummaryCard';
import { QuickLinks } from '../components/QuickLinks';
import { useResumenDia } from '../hooks/useResumenDia';
import './HomePage.css';

export function HomePage(): ReactElement {
  const { sesion } = useSession();
  const { state, reload } = useResumenDia();

  return (
    <div className="home-page">
      <div className="home-page__intro">
        <PageHeader titulo="Inicio" />
        <p>Accede a la operación del día y consulta su estado actual.</p>
        {sesion && <p className="home-page__user">{sesion.nombre} · {sesion.rol === 'SUPERVISOR' ? 'Supervisor' : 'Operador'}</p>}
      </div>
      {state.status === 'loading' && <LoadingState />}
      {state.status === 'error' && <ErrorAlert mensaje={state.message} onReintentar={reload} />}
      {state.status === 'ready' && <DaySummaryCard resumen={state.data} />}
      <QuickLinks />
    </div>
  );
}
