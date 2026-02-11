"use client";

/**
 * Compatibility layer: re-exports Next.js navigation as React Router-like API.
 * This allows existing components to keep their `react-router-dom` imports
 * working during the migration by aliasing the package in next.config.
 */

import NextLink from "next/link";
import {
  useRouter as useNextRouter,
  usePathname,
  useSearchParams,
  useParams as useNextParams,
} from "next/navigation";
import React, { forwardRef, useMemo, useCallback } from "react";

// ─── useNavigate ──────────────────────────────────────────
export function useNavigate() {
  const router = useNextRouter();
  const navigate = useCallback(
    (to: string | number | { pathname?: string; search?: string }, options?: { replace?: boolean }) => {
      if (typeof to === "number") {
        if (to === -1) router.back();
        else router.forward();
        return;
      }

      let path: string;
      if (typeof to === "object") {
        path = to.pathname || "/";
        if (to.search) {
          path += (to.search.startsWith("?") ? "" : "?") + to.search;
        }
      } else {
        path = to;
      }

      if (options?.replace) {
        router.replace(path);
      } else {
        router.push(path);
      }
    },
    [router]
  );

  return navigate;
}

// ─── useLocation ──────────────────────────────────────────
export function useLocation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return useMemo(
    () => ({
      pathname,
      search: searchParams.toString() ? `?${searchParams.toString()}` : "",
      hash: typeof window !== "undefined" ? window.location.hash : "",
      state: null,
      key: "default",
    }),
    [pathname, searchParams]
  );
}

// ─── useParams ────────────────────────────────────────────
export function useParams() {
  return useNextParams();
}

// ─── useSearchParams (re-export) ──────────────────────────
export { useSearchParams };

// ─── Link ─────────────────────────────────────────────────
interface LinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  to: string;
  replace?: boolean;
  children?: React.ReactNode;
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, replace, children, ...rest }, ref) => {
    return (
      <NextLink href={to} replace={replace} ref={ref} {...rest}>
        {children}
      </NextLink>
    );
  }
);
Link.displayName = "Link";

// ─── Navigate (redirect component) ───────────────────────
export function Navigate({ to, replace: shouldReplace = true }: { to: string; replace?: boolean }) {
  const router = useNextRouter();

  React.useEffect(() => {
    if (shouldReplace) {
      router.replace(to);
    } else {
      router.push(to);
    }
  }, [to, shouldReplace, router]);

  return null;
}

// ─── Outlet (placeholder) ─────────────────────────────────
export function Outlet() {
  return null;
}

// ─── useRoutes (placeholder) ──────────────────────────────
export function useRoutes(_routes: unknown[]) {
  return null;
}

// ─── createSearchParams ───────────────────────────────────
export function createSearchParams(init?: Record<string, string | string[]> | URLSearchParams) {
  if (init instanceof URLSearchParams) return init;
  const params = new URLSearchParams();
  if (init) {
    Object.entries(init).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, v));
      } else if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
  }
  return params;
}

// ─── BrowserRouter (no-op wrapper for main.jsx compat) ───
export function BrowserRouter({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
