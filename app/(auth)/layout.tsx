"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useVerifyIsLogin } from "@/hooks/useVerifyIsLogin";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const isLogin = useVerifyIsLogin();
  const router = useRouter();

  useEffect(() => {
    if (isLogin) {
      router.replace("/");
    }
  }, [isLogin, router]);

  if (isLogin) {
    return null;
  }

  return <>{children}</>;
}
