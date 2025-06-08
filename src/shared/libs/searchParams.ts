export const cloneSearchParams = (searchParams: URLSearchParams): URLSearchParams => {
  const prevSearchParams = Array.from(searchParams.entries());
  return new URLSearchParams(prevSearchParams);
};

export const buildUrlWithParams = (
  path: string,
  params: Record<string, string | number | undefined> & {
    orderBy?: string;
    order?: 'asc' | 'desc';
  },
) => {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') {
      query.append(key, value.toString().trim());
    }
  });

  // query.append('orderBy', 'createdAt=desc&sortOrder=asc');

  return `${path}?${query.toString()}`;
};
