import type { Metadata } from 'next';
import { Lato, Comfortaa } from 'next/font/google';
import './globals.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import AuthProvider from '@/components/layout/AuthProvider/AuthProvider';
import TanStackProvider from '@/components/layout/TanStackProvider/TanStackProvider';
import Loader from '@/components/common/Loader/Loader';

const comfortaa = Comfortaa({
  subsets: ['latin', 'latin-ext', 'cyrillic', 'cyrillic-ext'],
  weight: ['700'],
  variable: '--second-family',
  display: 'swap',
  fallback: [], 
});

const lato = Lato({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  variable: '--font-family',
  display: 'swap',
  fallback: [], 
});

export const metadata: Metadata = {
  title: 'Лелека',
  description: 'Застосунок для вагітних.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${comfortaa.variable} ${lato.variable} `}>
        <TanStackProvider>
          <AuthProvider>
            {children}
            <Toaster richColors position="top-right" toastOptions={{ duration: 2000 }} />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
