import Footer from '@/Components/user/layouts/Footer';
import Header from '@/Components/user/layouts/Header';
import React from 'react';

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <h1>Home</h1>
            <Footer />
        </>
    );
};

export default HomeLayout;
