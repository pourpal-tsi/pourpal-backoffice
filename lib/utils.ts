export type QueryParams = Record<string, string | number | null>;

export function createQueryString(params: QueryParams) {
  const searchParams = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) searchParams.set(key, String(value));
  }
  return searchParams.toString();
}
