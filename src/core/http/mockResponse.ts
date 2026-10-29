export async function mockResponse<T>(data: T): Promise<T> {
  await new Promise<void>((resolve) => window.setTimeout(resolve, 180));
  return structuredClone(data);
}
