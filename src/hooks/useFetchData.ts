import { useEffect, useState, useRef } from "react";
import type { ApiResponse } from "@/types";

type FetchFunction<T, P> = (params: P) => Promise<ApiResponse<T>>;

export const useFetchData = <T = any, P = any>(
  funcFetch: FetchFunction<T, P>,
  params: P
): [T | null, boolean, number, () => void] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(1);

  const prevParams = useRef<P | null>(null);
  const prevFuncFetch = useRef<FetchFunction<T, P> | null>(null);

  const refetchData = (): void => {
    data && fetchData();
  };

  const fetchData = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await funcFetch(params);
      if (res?.success) {
        setData(res?.data);
        setTotalPage(res?.totalPage ?? 1);
      } else {
        setData(null);
      }
    } catch (error) {
      setData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if params exist and are not an empty object
    if (params && typeof params === "object" && Object.keys(params as Record<string, unknown>).length === 0) {
      return; // Do not call the API if params is an empty object
    }

    const funcChanged = prevFuncFetch.current !== funcFetch;
    const paramsChanged =
      JSON.stringify(prevParams.current) !== JSON.stringify(params);

    if (funcChanged || paramsChanged) {
      fetchData();
      prevFuncFetch.current = funcFetch;
      prevParams.current = params;
    }
  }, [funcFetch, params]);

  return [data, isLoading, totalPage, refetchData];
};
