"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Auto-reload on chunk load failure (stale deployment)
    const isChunkError =
      error.name === "ChunkLoadError" ||
      error.message?.includes("Loading chunk") ||
      error.message?.includes("Failed to fetch dynamically imported module") ||
      error.message?.includes("Importing a module script failed");

    if (isChunkError) {
      // Prevent infinite reload loop with sessionStorage flag
      const reloadKey = "chunk_error_reload";
      const lastReload = sessionStorage.getItem(reloadKey);
      const now = Date.now();

      if (!lastReload || now - Number(lastReload) > 10000) {
        sessionStorage.setItem(reloadKey, String(now));
        window.location.reload();
        return;
      }
    }
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
        fontFamily: "sans-serif",
      }}
    >
      <h2 style={{ fontSize: "20px", marginBottom: "12px", color: "#333" }}>
        Đã xảy ra lỗi
      </h2>
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "20px" }}>
        Vui lòng tải lại trang để tiếp tục sử dụng.
      </p>
      <button
        onClick={() => window.location.reload()}
        style={{
          padding: "10px 24px",
          fontSize: "14px",
          backgroundColor: "#4F46E5",
          color: "#fff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        Tải lại trang
      </button>
    </div>
  );
}
