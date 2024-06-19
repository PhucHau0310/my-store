'use client';

import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

interface Category {
    id: number;
    name: string;
}

interface Coupons {
    id: number;
    code: string;
    discount: number;
    startDate: string;
    endDate: string;
    categoryId: number;
    isActive: boolean;
    category: Category;
}

const GetUp = () => {
    const [coupons, setCoupons] = useState<Coupons[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getCoupons = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/coupon`);
                const data: Coupons[] = await res.json();

                if (res.ok) {
                    setCoupons(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getCoupons();
    }, []);

    return (
        <Box>
            <Typography
                variant="h4"
                color="text.primary"
                sx={{ marginBottom: '25px', marginTop: '120px' }}
            >
                Get Up To 70% Off
            </Typography>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <Box
                    sx={{
                        overflowX: 'scroll',
                        paddingBottom: '40px',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '24px',
                    }}
                >
                    {coupons.map((item, idx) => (
                        <Card key={idx} sx={{ maxWidth: 345, flexShrink: 0 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    // image="/static/images/cards/contemplative-reptile.jpg"
                                    image="data:image/jpeg;base64,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"
                                    alt="coupon"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            height: '60px',
                                            marginTop: '12px',
                                            width: '80%',
                                        }}
                                    >
                                        {item.category.name}
                                    </Typography>
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        color="text.secondary"
                                    >
                                        Code: {item.code}
                                    </Typography>
                                    <Typography variant="h4" color="div">
                                        {item.discount}% OFF
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Receive
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default GetUp;
