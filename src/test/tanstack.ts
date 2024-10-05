import { QueryClient, queryOptions } from "@tanstack/angular-query-experimental";

import { mockPromise } from "./async-data";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

export function crearQueryOptions<T>(keys: Array<unknown>, data: T) {
  return queryOptions({
    queryKey: ['key', ...keys],
    queryFn: () => mockPromise(data),
  })
}
