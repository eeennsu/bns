export const cloneSearchParams = (searchParams: URLSearchParams): URLSearchParams => {
  const prevSearchParams = Array.from(searchParams.entries());
  return new URLSearchParams(prevSearchParams);
};

export const buildUrlWithParams = (
  path: string,
  params: Record<string, string | number | undefined>,
) => {
  const url = new URL(path);

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined || value !== '') url.searchParams.append(key, value.toString());
  });

  return url.pathname + url.search;
};
