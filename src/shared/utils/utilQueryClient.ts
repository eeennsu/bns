import { QueryClient } from '@tanstack/react-query';
import type { QueryClientConfig } from '@tanstack/react-query';

const utilQueryClient = (config?: QueryClientConfig) =>
  new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 1000 * 60 * 10,
        staleTime: 1000 * 60 * 5,
        notifyOnChangeProps: ['data'],
        refetchOnWindowFocus: false,
        retry: 2,
        ...config?.defaultOptions?.queries,
      },
    },
    ...config,
  });

export default utilQueryClient;
