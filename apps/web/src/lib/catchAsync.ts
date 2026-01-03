export async function catchAsync<T, E = Error>(
  promise: Promise<T>,
): Promise<[E, undefined] | [undefined, T]> {
  try {
    const data = await promise;
    return [undefined, data];
  } catch (error) {
    const normalizedError =
      error instanceof Error ? error : new Error(String(error));
    return [normalizedError as E, undefined];
  }
}
