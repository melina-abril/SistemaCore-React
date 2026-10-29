interface EmptyStateProps {
  mensaje: string;
}

export function EmptyState({ mensaje }: EmptyStateProps) {
  return <div className="state-panel" role="status">{mensaje}</div>;
}
