'use client';

import Header from '@/Components/admin/layouts/Header';
import LeftSideBar from '@/Components/admin/layouts/LeftSideBar';
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Header open={open} handleDrawerOpen={handleDrawerOpen} />
            <LeftSideBar open={open} handleDrawerClose={handleDrawerClose} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    backgroundColor: '#f8f7f1',
                    overflowX: 'scroll',
                }}
            >
                <div style={{ height: '64px', backgroundColor: '#f8f7f1' }} />{' '}
                {/* Spacer for AppBar */}
                {children}
            </Box>
        </Box>
    );
};

export default AdminLayout;
