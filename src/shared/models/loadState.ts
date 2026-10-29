export type LoadState<T> =
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'error'; mensaje: string }
  | { status: 'ready'; data: T };
