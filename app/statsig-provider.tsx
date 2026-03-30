"use client";

import React from "react";
import { StatsigProvider } from "@statsig/react-bindings";

export default function MyStatsig({ children }: { children: React.ReactNode }) {
  const user = {
    userID: "demo-user",
    // In production, use actual user ID from auth:
    // userID: session?.user?.id ?? "anonymous",
  };

  return (
    <StatsigProvider
      sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!}
      user={user}
    >
      {children}
    </StatsigProvider>
  );
}
