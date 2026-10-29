interface StatusBadgeProps {
  estado: string;
}

export function StatusBadge({ estado }: StatusBadgeProps) {
  const normalized = estado.toUpperCase();
  const tone = normalized === 'COMPLETADO' || normalized === 'CONFIRMADO'
    ? 'success'
    : normalized === 'CANCELADO' || normalized === 'ERROR'
      ? 'error'
      : 'warning';

  return <span className={`badge badge--${tone}`}>{estado.replaceAll('_', ' ')}</span>;
}
