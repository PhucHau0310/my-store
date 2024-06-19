import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import NextTopLoader from 'nextjs-toploader';
import Providers from '@/lib/redux/Provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'My Store',
    description: 'My Store',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en">
                <body className={inter.className}>
                    <NextTopLoader />
                    <Providers>{children}</Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
