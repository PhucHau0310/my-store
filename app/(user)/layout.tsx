import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import Header from '@/Components/user/layouts/Header';
import Footer from '@/Components/user/layouts/Footer';

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
        <html lang="en">
            <Header />
            <body className={inter.className}>
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
