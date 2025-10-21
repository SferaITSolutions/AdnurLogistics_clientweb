// src/app/layout.tsx
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css";
import "./globals.css";
import '@splidejs/splide/css';
import 'antd/dist/reset.css';

import { NextIntlClientProvider } from "next-intl";
import { TanStackProvider } from "@/providers/TanStackProvider";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/shared/components/dump/ui/sonner";
import ThemeState from "@/context/ThemeState";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <NextIntlClientProvider messages={messages}>
            <ThemeState>
              {children}
              <Toaster />
            </ThemeState>
          </NextIntlClientProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
