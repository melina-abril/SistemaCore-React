import type { ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../../../core/session/SessionContext';

interface QuickLink {
  to: string;
  label: string;
  description: string;
  icon: 'clients' | 'accounts' | 'movements' | 'closing';
  soloSupervisor: boolean;
}

const LINKS: QuickLink[] = [
  { to: '/clientes', label: 'Clientes', description: 'Consultar el maestro de clientes', icon: 'clients', soloSupervisor: false },
  { to: '/cuentas', label: 'Cuentas', description: 'Consultar cuentas de clientes', icon: 'accounts', soloSupervisor: false },
  { to: '/movimientos', label: 'Movimientos', description: 'Ver y registrar movimientos', icon: 'movements', soloSupervisor: false },
  { to: '/cierre-diario', label: 'Cierre diario', description: 'Gestionar el cierre operativo', icon: 'closing', soloSupervisor: true },
];

function AccessIcon({ icon }: { icon: QuickLink['icon'] }): ReactElement {
  if (icon === 'clients') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3" /><path d="M3.5 19v-1a5.5 5.5 0 0 1 11 0v1H3.5ZM17 6a3 3 0 0 1 0 6M17 14a5 5 0 0 1 4 5" /></svg>;
  if (icon === 'accounts') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 10h18M7 15h4" /></svg>;
  if (icon === 'movements') return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h10" /><circle cx="18" cy="17" r="2" /></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h5M8 16h3m4 0 2 2 3-3" /></svg>;
}

export function QuickLinks(): ReactElement {
  const { isSupervisor } = useSession();

  return (
    <section className="home-links" aria-labelledby="home-links-title">
      <div className="home-links__heading">
        <h2 id="home-links-title">Accesos directos</h2>
        <p>Elige dónde continuar.</p>
      </div>
      <nav className="home-links__grid" aria-label="Accesos directos">
        {LINKS.filter((link) => !link.soloSupervisor || isSupervisor).map((link) => (
          <Link key={link.to} to={link.to} className={`home-links__item${link.soloSupervisor ? ' home-links__item--primary' : ''}`}>
            <span className="home-links__icon"><AccessIcon icon={link.icon} /></span>
            <span className="home-links__body">
              <span className="home-links__label">{link.label}<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></span>
              <span className="home-links__description">{link.description}</span>
            </span>
          </Link>
        ))}
      </nav>
    </section>
  );
}
