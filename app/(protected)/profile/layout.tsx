"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useVerifyIsLogin } from "@/hooks/useVerifyIsLogin";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const isLogin = useVerifyIsLogin();
  const router = useRouter();

  useEffect(() => {
    if (!isLogin) {
      router.replace("/login");
    }
  }, [isLogin, router]);

  if (!isLogin) {
    return null;
  }

  return <>{children}</>;
}
