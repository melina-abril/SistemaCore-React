import type { ReactElement } from 'react';
import type { EstadoCierre, ResumenDia } from '../models/home.models';

interface DaySummaryCardProps {
  resumen: ResumenDia;
}

const ESTADOS: EstadoCierre[] = ['Pendiente', 'En curso', 'Completado'];

export function DaySummaryCard({ resumen }: DaySummaryCardProps): ReactElement {
  const [anio, mes, dia] = resumen.fechaOperativa.split('-').map(Number);
  const fecha = new Intl.DateTimeFormat('es', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(anio, mes - 1, dia)));
  const claseEstado = resumen.estadoCierre === 'Completado'
    ? 'home-summary__status--completed'
    : resumen.estadoCierre === 'En curso'
      ? 'home-summary__status--progress'
      : 'home-summary__status--pending';

  return (
    <section className="home-summary" aria-labelledby="home-summary-title">
      <div className="home-summary__heading">
        <h2 id="home-summary-title">Resumen del día</h2>
        <span>Actualizado al ingresar</span>
      </div>
      <div className="home-summary__grid">
        <article className="home-summary__card">
          <div className="home-summary__card-heading">
            <span>Movimientos cargados</span>
            <span className="home-summary__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h16M4 17h10" /><circle cx="18" cy="17" r="2" /></svg>
            </span>
          </div>
          <div className="home-summary__value-group">
            <strong className="home-summary__count">{resumen.cantidadMovimientos.toLocaleString('es')}</strong>
            <span>Registrados en la fecha operativa vigente</span>
          </div>
        </article>
        <article className="home-summary__card">
          <div className="home-summary__card-heading">
            <span>Fecha operativa vigente</span>
            <span className="home-summary__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M7 3v4M17 3v4M3 10h18" /></svg>
            </span>
          </div>
          <div className="home-summary__value-group">
            <strong className="home-summary__date">{fecha}</strong>
            <span>{anio}</span>
          </div>
        </article>
        <article className="home-summary__card home-summary__card--status">
          <div className="home-summary__card-heading">
            <span>Estado del cierre</span>
            <span className="home-summary__icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h5M8 16h3m4 0 2 2 3-3" /></svg>
            </span>
          </div>
          <div>
            <span className={`home-summary__status ${claseEstado}`}><span className="home-summary__dot" />{resumen.estadoCierre}</span>
          </div>
          <div className="home-summary__legend">
            <span>Estados posibles:</span>
            {ESTADOS.map((estado) => (
              <span key={estado} className={`home-summary__legend-item home-summary__legend-item--${estado === 'Completado' ? 'completed' : estado === 'En curso' ? 'progress' : 'pending'}`}>{estado}</span>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
