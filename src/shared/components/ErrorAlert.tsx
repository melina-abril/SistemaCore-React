interface ErrorAlertProps {
  mensaje: string;
  onReintentar?: () => void;
}

export function ErrorAlert({ mensaje, onReintentar }: ErrorAlertProps) {
  return (
    <div className="error-alert" role="alert">
      <span>{mensaje}</span>
      {onReintentar && <button className="button button--secondary" type="button" onClick={onReintentar}>Reintentar</button>}
    </div>
  );
}
