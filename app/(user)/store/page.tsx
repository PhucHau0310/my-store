'use client';

import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Container,
    Grid,
    Link,
    Rating,
    Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface Reviews {
    id: number;
    productId: number;
    userId: string;
    rating: number;
    comment?: string | null;
    reviewDate: string;
    product: AllProducts;
    user: User;
}

interface User {
    id: string;
    name: string;
    email: string;
    picture: string;
    shippingAddress?: string | null;
    mobile?: string | null;
    passwordHash?: string | null;
    role: string;
}

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
    Review: Reviews[];
}

const Store = () => {
    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    };
    const [isLoading, setLoading] = useState<boolean>(false);
    const [products, setProducts] = useState<AllProducts[]>([]);
    const [allProducts, setAllProducts] = useState<AllProducts[]>([]);
    const [limit, setLimit] = useState(9);
    const [optionPrice, setOptionPrice] = useState<string>('allPrice');

    const getAllProducts = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/product?limit=${limit}`);
            const data: AllProducts[] = await res.json();

            if (res.ok) {
                setProducts(data);
                setAllProducts(data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleLoadMore = () => {
        setLimit(limit + 9);
        getAllProducts();
    };

    React.useEffect(() => {
        getAllProducts();
    }, [limit]);

    const handleSelectPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedPrice = e.target.value;
        setOptionPrice(selectedPrice);
    };

    React.useEffect(() => {
        let filteredProducts: AllProducts[] = [...allProducts];

        switch (optionPrice) {
            case 'allPrice':
                break;
            case 'price-1':
                filteredProducts = filteredProducts.filter(
                    (product) => product.price <= 1000
                );
                break;
            case 'price-2':
                filteredProducts = filteredProducts.filter(
                    (product) => product.price > 1000 && product.price <= 4000
                );
                break;
            case 'price-3':
                filteredProducts = filteredProducts.filter(
                    (product) => product.price > 4000 && product.price <= 8000
                );
                break;
            case 'price-4':
                filteredProducts = filteredProducts.filter(
                    (product) => product.price > 8000 && product.price <= 12000
                );
                break;
            default:
                break;
        }

        setProducts(filteredProducts);
    }, [optionPrice, allProducts]);

    return (
        <Container maxWidth="lg" sx={{ marginY: '120px' }}>
            <div
                role="presentation"
                className="bg-[#f5f5f5] p-3 rounded-lg"
                onClick={handleClick}
            >
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        color="inherit"
                        href={'/'}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        <Typography>Home</Typography>
                    </Link>
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="text.primary"
                    >
                        <StoreIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Store
                    </Typography>
                </Breadcrumbs>
            </div>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '50px',
                }}
            >
                <Box sx={{ width: '25%' }}>
                    <FormControl>
                        <FormLabel
                            sx={{
                                fontSize: '25px',
                                fontWeight: 'bold',
                                marginBottom: '20px',
                            }}
                            id="demo-radio-buttons-group-label"
                        >
                            FILTER BY PRICE
                        </FormLabel>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="allPrice"
                            name="radio-buttons-group"
                            sx={{
                                backgroundColor: '#f5f5f5',
                                padding: '10px',
                                borderRadius: '12px',
                            }}
                            value={optionPrice}
                            onChange={(e) => handleSelectPrice(e)}
                        >
                            <FormControlLabel
                                value="allPrice"
                                control={<Radio />}
                                label="All Price"
                            />
                            <FormControlLabel
                                value="price-1"
                                control={<Radio />}
                                label="0 - 1000"
                            />
                            <FormControlLabel
                                value="price-2"
                                control={<Radio />}
                                label="1000 - 4000"
                            />
                            <FormControlLabel
                                value="price-3"
                                control={<Radio />}
                                label="4000 - 8000"
                            />
                            <FormControlLabel
                                value="price-4"
                                control={<Radio />}
                                label="8000 - 12000"
                            />
                        </RadioGroup>
                    </FormControl>
                </Box>

                <Box sx={{ width: '75%' }}>
                    {isLoading ? (
                        <Box
                            sx={{
                                display: 'flex',
                                alignContent: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid
                                container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                            >
                                {products.map((item, index) => (
                                    <Grid item xs={2} sm={4} md={4} key={index}>
                                        <Card
                                            sx={{
                                                maxWidth: 345,
                                                flexShrink: 0,
                                            }}
                                        >
                                            <Link
                                                underline="none"
                                                href={`store/productDetail/${item.id}`}
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
                                                                alignContent:
                                                                    'center',
                                                                textAlign:
                                                                    'center',
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {item.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                            sx={{
                                                                color: 'black',
                                                                textAlign:
                                                                    'center',
                                                                fontSize:
                                                                    '18px',
                                                            }}
                                                        >
                                                            $ {item.price}
                                                        </Typography>
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection:
                                                                    'row',
                                                                justifyContent:
                                                                    'center',
                                                                gap: '8px',
                                                            }}
                                                        >
                                                            <Rating
                                                                name="half-rating-read"
                                                                value={
                                                                    (item.Review.reduce(
                                                                        (
                                                                            sum,
                                                                            review
                                                                        ) =>
                                                                            sum +
                                                                            review.rating,
                                                                        0
                                                                    ) /
                                                                        item
                                                                            .Review
                                                                            .length) as number
                                                                }
                                                                precision={2.5}
                                                                readOnly
                                                            />
                                                            <Typography
                                                                sx={{
                                                                    color: 'black',
                                                                }}
                                                            >
                                                                (
                                                                {
                                                                    item.Review
                                                                        .length
                                                                }
                                                                )
                                                            </Typography>
                                                        </Box>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions>
                                                    <Button
                                                        size="small"
                                                        color="primary"
                                                    >
                                                        See More
                                                    </Button>
                                                </CardActions>
                                            </Link>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>

                            <Button
                                variant="contained"
                                sx={{
                                    display: 'block',
                                    backgroundColor: 'green',
                                    marginX: 'auto',
                                    marginTop: '40px',
                                }}
                                onClick={handleLoadMore}
                            >
                                Load More
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default Store;
