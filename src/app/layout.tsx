// src/app/layout.tsx
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/queryClient";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body >
        <QueryClientProvider client={queryClient}>
           
        </QueryClientProvider>
      </body>
    </html>
  );
}
