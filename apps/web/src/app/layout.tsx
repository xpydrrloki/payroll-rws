import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';
import ReactQueryProviders from '@/providers/ReactQueryProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Personalia',
  description: 'Aplikasi web untuk manajemen karyawan',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ReactQueryProviders>
          <Toaster richColors position='top-right'/>
          {children}
        </ReactQueryProviders>
      </body>
    </html>
  );
}
