import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';
import { Footer } from '@/components/Footer';

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
      <body className={`${inter.className} flex md:flex-row bg-main-offWhite md:justify-between`}>
        <Sidebar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
