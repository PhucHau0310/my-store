'use client';

import { Box, Stack, Typography } from '@mui/material';
import { LineChart, PieChart } from '@mui/x-charts';
import React from 'react';

const uData = [
    4000, 3000, 2000, 2780, 1890, 2390, 3490, 5000, 4002, 2201, 3333, 2323,
];
const pData = [
    2400, 1398, 9800, 3908, 4800, 3800, 4300, 2000, 2201, 4002, 3555, 4323,
];
const xLabels = [
    'Month 1',
    'Month 2',
    'Month 3',
    'Month 4',
    'Month 5',
    'Month 6',
    'Month 7',
    'Month 8',
    'Month 9',
    'Month 10',
    'Month 11',
    'Month 12',
];

interface Props {
    productCounts: {
        [key: number]: number;
    };
}

interface ArrayType {
    productId: number;
    quantity: number;
    percent: number;
}

interface Products {
    id: number;
    name: string;
}

const ChartDashboard = ({ productCounts }: Props) => {
    const [array, setArray] = React.useState<ArrayType[]>([]);
    const [products, setProducts] = React.useState<Products[]>([]);

    React.useEffect(() => {
        const products = async () => {
            try {
                const res = await fetch(`/api/product`);
                const data: Products[] = await res.json();

                if (res.ok) {
                    setProducts(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        products();
    }, []);

    React.useEffect(() => {
        const sortedArray = Object.entries(productCounts)
            .map(([key, value]) => ({
                productId: Number(key),
                quantity: value,
            }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5); // Take top 5

        const total = sortedArray.reduce((acc, item) => acc + item.quantity, 0);

        const newArray = sortedArray.map((item) => ({
            ...item,
            percent: (item.quantity / total) * 100,
        }));

        setArray(newArray);
    }, [productCounts]);

    console.log(products);
    console.log(array);

    const items = array.map((item) => {
        const product = products.find((pro) => pro.id === item.productId);
        return {
            value: item.percent,
            label: product ? product.name : `Product ${item.productId}`,
        };
    });

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'center',
                gap: '40px',
            }}
        >
            <Box
                sx={{
                    backgroundColor: '#f1eee4',
                    marginY: '50px',
                    padding: '20px',
                    width: '50%',
                    borderRadius: '20px',
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
            >
                <LineChart
                    width={500}
                    height={300}
                    series={[
                        { data: pData, label: 'Sales' },
                        { data: uData, label: 'Orders' },
                    ]}
                    xAxis={[{ scaleType: 'point', data: xLabels }]}
                />
            </Box>

            <Box
                sx={{
                    backgroundColor: '#f1eee4',
                    marginY: '50px',
                    padding: '20px',
                    width: '50%',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography
                    sx={{
                        fontSize: '30px',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginBottom: '20px',
                    }}
                >
                    Best Selling Products
                </Typography>
                <Stack
                    direction={{ xs: 'column', md: 'row' }}
                    alignItems={{ xs: 'flex-start', md: 'center' }}
                    justifyContent="space-between"
                    sx={{ width: '100%' }}
                >
                    <PieChart
                        series={[
                            {
                                data: items,
                            },
                        ]}
                        // onClick={handleClick}
                        width={400}
                        height={200}
                        margin={{ right: 200 }}
                    />
                </Stack>
            </Box>
        </Box>
    );
};

export default ChartDashboard;
