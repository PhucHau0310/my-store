import Footer from '@/Components/user/layouts/Footer';
import Header from '@/Components/user/layouts/Header';
import React from 'react';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Header />
            <div>{children}</div>
            <Footer />
        </>
    );
};

export default AdminLayout;
