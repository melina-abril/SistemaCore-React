# Sistema Core · Frontend

Frontend en React 19, TypeScript y Vite para el inicio de sesión y el resumen de la operación diaria.

## Arranque

```sh
npm install
npm start
```

Abre http://localhost:4260. El modo mock está activo por defecto y no necesita backend. Usuarios de ejemplo: `operador` / `Operador123!` y `supervisor` / `Supervisor123!`. Después de cinco intentos fallidos, el usuario de ejemplo queda bloqueado.

## Backend .NET

Copia `.env.example` a `.env.local` y establece `VITE_USE_MOCK=false`. Las solicitudes a `/api` pasan por el proxy de Vite al backend en `http://localhost:5080`. Ajusta `VITE_API_BASE_URL` si necesitas otra ruta base. Ejecuta `npm run build` para comprobar los tipos y generar `dist`.

## Estructura

`src/features/auth` contiene la pantalla pública de inicio de sesión. `src/features/home` contiene el resumen del día. `src/core` reúne sesión, HTTP y layout; `src/shared` contiene los componentes y tipos reutilizables. Las rutas se registran en `src/router.tsx`.
