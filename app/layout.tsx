import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Script from "next/script";
import ClientProvider from "@/components/ClientLayout/ClientProvider";

import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import "remixicon/fonts/remixicon.css";
import "@/styles/index.scss";
import "@/App.style.scss";

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OKdimall - Du lịch và trải nghiệm",
  description: "Booking platform for hotels and tours",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className={beVietnamPro.className} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ClientProvider>{children}</ClientProvider>
        <Script
          src="https://sp.zalo.me/plugins/sdk.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
