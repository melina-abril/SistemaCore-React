import { Outlet } from 'react-router-dom';
import { AppHeader } from './core/layout/AppHeader';
import { SideNav } from './core/layout/SideNav';
import './App.css';

export function App() {
  return (
    <div className="app-shell">
      <AppHeader />
      <div className="app-shell__body">
        <SideNav />
        <main className="app-shell__main" id="contenido">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
