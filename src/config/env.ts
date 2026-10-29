export const env: { apiBaseUrl: string; useMock: boolean } = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '/api',
  useMock: import.meta.env.VITE_USE_MOCK !== 'false',
};
