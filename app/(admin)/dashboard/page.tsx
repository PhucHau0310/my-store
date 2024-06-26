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

interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    quantity: number;
}

interface OrdersType {
    id: number;
    userId: string;
    orderDate: string;
    totalAmount: number;
    shippingAddress: string;
    status: string;
    user: {
        id: string;
        name: string;
    };
    payment: {
        id: number;
        paymentMethod: string;
    };
    orderItems: OrderItem[];
}

const DashBoard: React.FC = () => {
    const [orders, setOrders] = React.useState<OrdersType[]>([]);
    const [productCounts, setProductCounts] = React.useState<{
        [key: number]: number;
    }>({});

    React.useEffect(() => {
        const getAllOrders = async () => {
            try {
                const res = await fetch(`/api/orders`);
                const data: OrdersType[] = await res.json();

                if (res.ok) {
                    setOrders(data);
                    calculateProductCounts(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllOrders();
    }, []);

    const calculateProductCounts = (orders: OrdersType[]) => {
        const counts: { [key: number]: number } = {};

        orders.forEach((order) => {
            order.orderItems.forEach((item) => {
                if (counts[item.productId]) {
                    counts[item.productId] += item.quantity;
                } else {
                    counts[item.productId] = item.quantity;
                }
            });
        });

        setProductCounts(counts);
    };
    const cards = [
        {
            icons: LocalShippingIcon,
            title: 'Today Orders',
            total: orders.filter(
                (order) =>
                    new Date(order.orderDate).toDateString() ===
                    new Date().toDateString()
            ).length,
            sub_info: {
                cash: orders.filter(
                    (order) =>
                        new Date(order.orderDate).toDateString() ===
                            new Date().toDateString() &&
                        order.payment.paymentMethod === 'CASH_ON_DELIVERY'
                ).length,
                card: orders.filter(
                    (order) =>
                        new Date(order.orderDate).toDateString() ===
                            new Date().toDateString() &&
                        order.payment.paymentMethod === 'CREDIT_CARD'
                ).length,
                credit: orders.filter(
                    (order) =>
                        new Date(order.orderDate).toDateString() ===
                            new Date().toDateString() &&
                        order.payment.paymentMethod === 'PAYPAL'
                ).length,
            },
            colorBg: '#19a485',
        },
        {
            icons: LocalShippingIcon,
            title: 'Yesterday Orders',
            total: orders.filter(
                (order) =>
                    new Date(order.orderDate).toDateString() ===
                    new Date(new Date().getDate() - 1).toDateString()
            ).length,
            sub_info: {
                cash: orders.filter(
                    (order) =>
                        new Date(order.orderDate).toDateString() ===
                            new Date(new Date().getDate() - 1).toDateString() &&
                        order.payment.paymentMethod === 'CASH_ON_DELIVERY'
                ).length,
                card: orders.filter(
                    (order) =>
                        new Date(order.orderDate).toDateString() ===
                            new Date(new Date().getDate() - 1).toDateString() &&
                        order.payment.paymentMethod === 'CREDIT_CARD'
                ).length,
                credit: orders.filter(
                    (order) =>
                        new Date(order.orderDate).toDateString() ===
                            new Date(new Date().getDate() - 1).toDateString() &&
                        order.payment.paymentMethod === 'PAYPAL'
                ).length,
            },
            colorBg: '#f28c41',
        },
        {
            icons: ShoppingCartIcon,
            title: 'This Month',
            total: orders.filter(
                (order) =>
                    new Date(order.orderDate).getMonth() ===
                        new Date().getMonth() &&
                    new Date(order.orderDate).getFullYear() ===
                        new Date().getFullYear()
            ).length,
            colorBg: '#4282ee',
        },
        {
            icons: PaymentIcon,
            title: 'Last Month',
            total: orders.filter(
                (order) =>
                    new Date(order.orderDate).getMonth() ===
                        new Date(
                            new Date().getFullYear(),
                            new Date().getMonth() - 1,
                            1
                        ).getMonth() &&
                    new Date(order.orderDate).getFullYear() ===
                        new Date(
                            new Date().getFullYear(),
                            new Date().getMonth() - 1,
                            1
                        ).getFullYear()
            ).length,
            colorBg: '#149eaf',
        },
        {
            icons: PaymentIcon,
            title: 'All-Time Sales',
            total: orders.length,
            colorBg: '#10aa68',
        },
    ];

    const cardSubs = [
        {
            icons: ShoppingCartIcon,
            title: 'Total Order',
            total: orders.length,
            colorBg: '#d66119',
        },
        {
            icons: PendingActionsIcon,
            title: 'Orders Pending',
            total: orders.filter((item) => item.status === 'PENDING').length,
            colorBg: '#3b79dd',
        },
        {
            icons: LocalShippingIcon,
            title: 'Orders Processing',
            total: orders.filter((item) => item.status === 'PROCESSING').length,
            colorBg: '#21b895',
        },
        {
            icons: CheckIcon,
            title: 'Orders Delivered',
            total: orders.filter((item) => item.status === 'DELIVERED').length,
            colorBg: '#1bbc73',
        },
    ];

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

            <ChartDashboard productCounts={productCounts} />

            <RecentOrder />
        </Box>
    );
};

export default DashBoard;
