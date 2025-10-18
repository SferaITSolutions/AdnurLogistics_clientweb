// src/app/layout.tsx
"use client";
import "@splidejs/react-splide/css/sea-green"; 
import "@splidejs/react-splide/css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/shared/api/queryClient";
import "./globals.css";
import '@splidejs/splide/css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
