import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokemon v2',
  description: 'A simple pokemon playground with Next.js and Tailwind CSS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Suspense fallback={<p>Loooooooooooooooo.......</p>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
