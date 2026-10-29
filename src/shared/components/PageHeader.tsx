import type { ReactNode } from 'react';

interface PageHeaderProps {
  titulo: string;
  children?: ReactNode;
}

export function PageHeader({ titulo, children }: PageHeaderProps) {
  return (
    <header className="page-header">
      <h1>{titulo}</h1>
      {children && <div className="page-header__actions">{children}</div>}
    </header>
  );
}
