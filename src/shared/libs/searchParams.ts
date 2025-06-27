export const cloneSearchParams = (searchParams: URLSearchParams): URLSearchParams => {
  const prevSearchParams = Array.from(searchParams.entries());
  return new URLSearchParams(prevSearchParams);
};

export const buildPathWithParams = (
  path: string,
  params: Record<string, string | number | undefined> & {},
) => {
  const filteredParams = Object.entries(params).filter(
    ([, value]) => value !== undefined && value !== '',
  );

  const searchParams = new URLSearchParams(
    filteredParams.map(([key, value]) => [key, String(value)]),
  );

  return `${path}?${searchParams.toString()}`;
};
