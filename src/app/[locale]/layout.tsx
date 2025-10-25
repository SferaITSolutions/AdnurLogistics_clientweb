import '@splidejs/react-splide/css';
import '@splidejs/react-splide/css/sea-green';
import '@splidejs/splide/css';
import 'antd/dist/reset.css';
import './globals.css';

import { Manrope, Nunito_Sans, Poppins, Urbanist } from 'next/font/google';

import ThemeState from '@/context/ThemeState';
import MainLayout from '@/providers/MainLayout';
import { TanStackProvider } from '@/providers/TanStackProvider';
import { Toaster } from '@/shared/components/dump/ui/sonner';
import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const urbanist = Urbanist({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Adnur logistic',
  description: 'Adnur logistic — eng ishonchli va tez logistic kampaniya.',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const messages = await getMessages();
  return (
    <html lang="en">
      <body className={nunito.className}>
        <TanStackProvider>
          <NextIntlClientProvider messages={messages}>
            <MainLayout>
              <ThemeState>
                {children}
                <Toaster />
              </ThemeState>
            </MainLayout>
          </NextIntlClientProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
