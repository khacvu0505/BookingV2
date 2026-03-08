"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback } from "react";

type ParamValue = string | number | boolean | undefined | null;
type ParamsObject = Record<string, ParamValue>;
type SetSearchParamsOptions = { replace?: boolean };
type SetSearchParamsFn = (
  newParams:
    | URLSearchParams
    | ParamsObject
    | ((prev: URLSearchParams) => URLSearchParams),
  options?: SetSearchParamsOptions
) => void;

// Convert querystring to object
export default function useQueryParams(): [Record<string, any>, SetSearchParamsFn] {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const params: Record<string, string> = Object.fromEntries(searchParams.entries());

  const setSearchParams: SetSearchParamsFn = useCallback(
    (newParams, options) => {
      let newSearch: string;

      if (newParams instanceof URLSearchParams) {
        newSearch = newParams.toString();
      } else if (typeof newParams === "function") {
        const prev = new URLSearchParams(searchParams.toString());
        newSearch = newParams(prev).toString();
      } else {
        const urlParams = new URLSearchParams();
        Object.entries(newParams).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            urlParams.set(key, String(value));
          }
        });
        newSearch = urlParams.toString();
      }

      // Skip navigation if params haven't changed
      if (newSearch === searchParams.toString()) return;

      const url = `${pathname}?${newSearch}`;
      if (options?.replace) {
        router.replace(url);
      } else {
        router.push(url);
      }
    },
    [router, pathname, searchParams]
  );

  return [params, setSearchParams];
}
