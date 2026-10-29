import { createBrowserRouter, Navigate } from 'react-router-dom';
import { App } from './App';
import { RequireAuth } from './core/session/RequireAuth';
import { AUTH_ROUTES } from './features/auth/auth.routes';
import { HOME_ROUTES } from './features/home/home.routes';

export const router = createBrowserRouter([
  ...AUTH_ROUTES,
  {
    path: '/',
    element: <RequireAuth><App /></RequireAuth>,
    children: [
      ...HOME_ROUTES,
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
