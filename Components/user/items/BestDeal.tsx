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
import React, { useRef, useState } from 'react';

interface AllProducts {
    id: number;
    name: String;
    picture: string;
    version: string;
    description: string;
    price: number;
    quantity: number;
    published: boolean;
    categoryId: number;
}

const BestDeal = () => {
    const [isLoading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<AllProducts[]>([]);
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const getAllProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/product`);
                const data: AllProducts[] = await res.json();

                if (res.ok) {
                    setProducts(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getAllProducts();
    }, []);

    React.useEffect(() => {
        const scrollContainer = scrollContainerRef.current;

        if (!scrollContainer) return;

        let scrollAmount = 0;
        const maxScroll = scrollContainer.scrollWidth;

        // console.log('Max Scroll:', maxScroll);

        const scrollInterval = setInterval(() => {
            if (scrollAmount < maxScroll) {
                scrollAmount += 300;
                // console.log('Scrolling to:', scrollAmount);
                scrollContainer.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth',
                });
            } else {
                scrollAmount = 0;
                // console.log('Reset scroll');
                scrollContainer.scrollTo({
                    left: scrollAmount,
                    behavior: 'smooth',
                });
            }
        }, 2000);

        return () => clearInterval(scrollInterval);
    }, []);

    return (
        <Box>
            <Typography
                variant="h4"
                color="text.primary"
                sx={{ marginBottom: '25px', marginTop: '120px' }}
            >
                Today Best Deals For You
            </Typography>
            <Box
                ref={scrollContainerRef}
                sx={{
                    // overflowX: 'scroll',
                    overflowX: 'hidden',
                    paddingBottom: '40px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '24px',
                    scrollBehavior: 'smooth',
                }}
            >
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    products
                        .splice(Math.floor(Math.random() * products.length), 6)
                        .map((item, idx) => (
                            <Card
                                key={idx}
                                sx={{ maxWidth: 345, flexShrink: 0 }}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        image={item.picture}
                                        alt="green iguana"
                                        sx={{
                                            objectFit: 'cover',
                                            height: '180px',
                                        }}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                            sx={{
                                                height: '50px',
                                            }}
                                        >
                                            {item.name}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            sx={{
                                                height: '60px',
                                            }}
                                        >
                                            {item.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                        See More
                                    </Button>
                                </CardActions>
                            </Card>
                        ))
                )}
            </Box>
        </Box>
    );
};

export default BestDeal;
