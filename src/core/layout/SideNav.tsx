import { NavLink } from 'react-router-dom';
import './layout.css';

export function SideNav() {
  return (
    <nav className="side-nav" aria-label="Navegación principal">
      <NavLink className={({ isActive }) => `side-nav__link${isActive ? ' side-nav__link--active' : ''}`} to="/" end>
        Inicio
      </NavLink>
    </nav>
  );
}
