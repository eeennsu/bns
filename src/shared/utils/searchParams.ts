export const cloneSearchParams = (searchParams: URLSearchParams): URLSearchParams => {
  const prevSearchParams = Array.from(searchParams.entries());
  return new URLSearchParams(prevSearchParams);
};
