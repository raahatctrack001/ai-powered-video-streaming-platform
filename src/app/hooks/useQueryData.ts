import { QueryKey, useQuery } from "@tanstack/react-query";

export const useQueryData = (
  queryKey: QueryKey,
  enabled?: boolean // Use `boolean` directly instead of `Enabled`
) => {
  const { data, isLoading, isFetched, refetch, isFetching } = useQuery({
    queryKey,
    enabled,
  });

  return { data, isLoading, isFetched, refetch, isFetching };
};
