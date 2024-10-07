import { QueryKey, useQueriesStore } from "@/app/hooks/useQueryStore";
import { Network } from "@/app/hooks/useUIStore";
import { useQuery } from "@apollo/client";
import { useCallback, useEffect } from "react";

type Variables = Record<
  string,
  string | number | number[] | boolean | null | undefined | Date
>;

const useCustomQuery = (
  network: Network,
  queryKey: QueryKey,
  query: any,
  variables?: Variables,
  skip?: boolean
) => {
  const { setRefetch } = useQueriesStore((state) => ({
    setRefetch: state.setRefetch,
  }));

  const { data, refetch } = useQuery(query, {
    variables: variables,
    skip: skip,
  });

  const refetchWrapper = useCallback(
    async (variables?: Variables) => {
      const { data: newData } = await refetch(variables);
      return newData;
    },
    [refetch]
  );

  useEffect(() => {
    setRefetch(queryKey, refetchWrapper);
  }, []);

  return data;
};

export default useCustomQuery;
