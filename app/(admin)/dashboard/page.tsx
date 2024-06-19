'use client';

import React from 'react';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaymentIcon from '@mui/icons-material/Payment';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import CheckIcon from '@mui/icons-material/Check';
import CardTotal from '@/Components/admin/items/CardTotal';
import CardSub from '@/Components/admin/items/CardSub';
import ChartDashboard from '@/Components/admin/items/ChartDashboard';
import RecentOrder from '@/Components/admin/items/RecentOrder';

const cards = [
    {
        icons: LocalShippingIcon,
        title: 'Today Orders',
        total: 10,
        sub_info: {
            cash: 10,
            card: 10,
            credit: 10,
        },
        colorBg: '#19a485',
    },
    {
        icons: LocalShippingIcon,
        title: 'Yesterday Orders',
        total: 11,
        sub_info: {
            cash: 11,
            card: 11,
            credit: 11,
        },
        colorBg: '#f28c41',
    },
    {
        icons: ShoppingCartIcon,
        title: 'This Month',
        total: 12,
        colorBg: '#4282ee',
    },
    {
        icons: PaymentIcon,
        title: 'Last Month',
        total: 13,
        colorBg: '#149eaf',
    },
    {
        icons: PaymentIcon,
        title: 'All-Time Sales',
        total: 14,
        colorBg: '#10aa68',
    },
];

const cardSubs = [
    {
        icons: ShoppingCartIcon,
        title: 'Total Order',
        total: 552,
        colorBg: '#d66119',
    },
    {
        icons: PendingActionsIcon,
        title: 'Orders Pending',
        total: 185,
        colorBg: '#3b79dd',
    },
    {
        icons: LocalShippingIcon,
        title: 'Orders Processing',
        total: 25,
        colorBg: '#21b895',
    },
    {
        icons: CheckIcon,
        title: 'Orders Delivered',
        total: 306,
        colorBg: '#1bbc73',
    },
];

const DashBoard: React.FC = () => {
    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Dashboard Overview
            </Typography>
            <Box
                sx={{
                    minWidth: 275,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    overflowX: 'scroll',
                    paddingBottom: '14px',
                }}
            >
                {cards.map((card, idx) => (
                    <CardTotal
                        key={idx}
                        icons={card.icons}
                        total={card.total}
                        sub_info={card.sub_info}
                        colorBg={card.colorBg}
                        title={card.title}
                    />
                ))}
            </Box>

            <Box
                sx={{
                    minWidth: 275,
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '12px',
                    marginTop: '40px',
                }}
            >
                {cardSubs.map((card, idx) => (
                    <CardSub
                        key={idx}
                        icons={card.icons}
                        title={card.title}
                        colorBg={card.colorBg}
                        total={card.total}
                    />
                ))}
            </Box>

            <ChartDashboard />

            <RecentOrder />
        </Box>
    );
};

export default DashBoard;
