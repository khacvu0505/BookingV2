import { booking_id, create_invoice, info_booking, tax_include } from "@/utils/constants";
import { clearSessionStorage } from "@/utils/utils";
import React, { Component, ErrorInfo, ReactNode } from "react";

const isClient = typeof window !== "undefined";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  isLocal: boolean;
}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    isLocal: isClient ? window.location.host.includes("localhost") : false,
  };

  static getDerivedStateFromError(_: Error): Partial<ErrorBoundaryState> {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Uncaught error: ", error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError && !this.state.isLocal) {
      clearSessionStorage(info_booking);
      clearSessionStorage(booking_id);
      clearSessionStorage(tax_include);
      clearSessionStorage(create_invoice);
      if (isClient) {
        window.location.href = "/page-not-found";
      }
    }

    return this.props.children;
  }
}
