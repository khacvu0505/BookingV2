"use client";

import { ReactNode, Suspense, useEffect } from "react";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store } from "@/store/store";
import { getQueryClient } from "@/lib/query-client";
import "@/i18n";

const ClientLayout = dynamic(
  () => import("@/components/ClientLayout/ClientLayout"),
  { ssr: false }
);
const ClientHydration = dynamic(
  () => import("@/components/ClientLayout/ClientHydration"),
  { ssr: false }
);
const BootstrapClient = dynamic(
  () => import("@/components/ClientLayout/BootstrapClient"),
  { ssr: false }
);

function useChunkErrorHandler() {
  useEffect(() => {
    const handler = (event: ErrorEvent) => {
      const msg = event.message || "";
      const isChunkError =
        msg.includes("Loading chunk") ||
        msg.includes("Failed to fetch dynamically imported module") ||
        msg.includes("Importing a module script failed");

      if (isChunkError) {
        const reloadKey = "chunk_error_reload";
        const lastReload = sessionStorage.getItem(reloadKey);
        const now = Date.now();

        if (!lastReload || now - Number(lastReload) > 10000) {
          sessionStorage.setItem(reloadKey, String(now));
          window.location.reload();
        }
      }
    };

    const rejectionHandler = (event: PromiseRejectionEvent) => {
      const msg =
        event.reason?.message || event.reason?.toString?.() || "";
      const isChunkError =
        msg.includes("Loading chunk") ||
        msg.includes("Failed to fetch dynamically imported module") ||
        msg.includes("Importing a module script failed");

      if (isChunkError) {
        const reloadKey = "chunk_error_reload";
        const lastReload = sessionStorage.getItem(reloadKey);
        const now = Date.now();

        if (!lastReload || now - Number(lastReload) > 10000) {
          sessionStorage.setItem(reloadKey, String(now));
          window.location.reload();
        }
      }
    };

    window.addEventListener("error", handler);
    window.addEventListener("unhandledrejection", rejectionHandler);
    return () => {
      window.removeEventListener("error", handler);
      window.removeEventListener("unhandledrejection", rejectionHandler);
    };
  }, []);
}

export default function ClientProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient();
  useChunkErrorHandler();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Suspense>
          <ClientHydration />
          <BootstrapClient />
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
