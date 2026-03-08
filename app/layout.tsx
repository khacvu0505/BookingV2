import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import Script from "next/script";
import ClientProvider from "@/components/ClientLayout/ClientProvider";

import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
// remixicon CSS loaded via <link> in <head> for font preloading
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
      <head>
        <link
          rel="preload"
          href="/fonts/remixicon.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/remixicon.css"
        />
      </head>
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
