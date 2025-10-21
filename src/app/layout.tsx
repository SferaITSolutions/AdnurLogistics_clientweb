// src/app/layout.tsx
import "@splidejs/react-splide/css/sea-green";
import "@splidejs/react-splide/css";
import "./globals.css";
import '@splidejs/splide/css';
import { NextIntlClientProvider } from "next-intl";
import { TanStackProvider } from "@/providers/TanStackProvider";
import { getMessages } from "next-intl/server";

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
            {children}
          </NextIntlClientProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
