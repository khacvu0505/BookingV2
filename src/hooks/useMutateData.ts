import { useState, useCallback } from "react";
import type { ApiResponse } from "@/types";

type MutateFunction<T, P> = (params: P) => Promise<ApiResponse<T>>;

export const useMutate = <T = any, P = any>(
  funcMutate: MutateFunction<T, P>
): [(params: P) => Promise<void>, T | null, boolean, Error | null] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(
    async (params: P): Promise<void> => {
      setIsLoading(true);
      setError(null); // Reset error before mutation
      try {
        const res = await funcMutate(params);
        if (res?.success) {
          setData(res?.data);
        } else {
          setData(null);
          setError(new Error(res?.message || "Mutation failed"));
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [funcMutate]
  );

  return [mutate, data, isLoading, error];
};
