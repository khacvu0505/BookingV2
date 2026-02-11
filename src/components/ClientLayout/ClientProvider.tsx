"use client";

import { ReactNode, Suspense } from "react";
import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store } from "@/store/store";
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

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <Suspense>
        <ClientHydration />
        <BootstrapClient />
        <ClientLayout>{children}</ClientLayout>
      </Suspense>
    </Provider>
  );
}
