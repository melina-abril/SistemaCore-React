import type { RouteObject } from 'react-router-dom';
import { HomePage } from './pages/HomePage';

export const HOME_ROUTES: RouteObject[] = [{ index: true, element: <HomePage /> }];
