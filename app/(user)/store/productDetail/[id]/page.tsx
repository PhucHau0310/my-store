'use client';

import {
    Alert,
    Box,
    Breadcrumbs,
    Button,
    ButtonGroup,
    CircularProgress,
    Container,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    Link,
    Rating,
    Tab,
    Tabs,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import { usePathname, useRouter } from 'next/navigation';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import PinterestIcon from '@mui/icons-material/Pinterest';
import RateReviewIcon from '@mui/icons-material/RateReview';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import { useUser } from '@clerk/nextjs';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '@/lib/redux/slices/cartSlice';

interface Reviews {
    id: number;
    productId: number;
    userId: string;
    rating: number;
    comment?: string | null;
    reviewDate: string;
    product: Product;
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

interface Product {
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

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ProductDetail = () => {
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [value, setValue] = React.useState(0);
    const [rate, setRate] = React.useState<number | null>(null);
    const [review, setReview] = useState<string | null>(null);
    const [isPendingReview, setPendingReview] = useState<boolean>(false);
    const [alert, setAlert] = useState<{
        status: number | null;
        text: string | null;
    }>({ status: null, text: null });
    const [errorReview, setErrorReview] = useState<{
        error: boolean;
        text: string | null;
    }>({ error: false, text: null });
    const [errorRating, setErrorRating] = useState<{
        error: boolean;
        text: string | null;
    }>({ error: false, text: null });
    // const [isPendingAllReview, setPendingAllReview] = useState<boolean>(false);
    // const [allReviews, setAllReviews] = useState<Reviews[]>([]);
    const [quantityBuy, setQuantityBuy] = useState<number>(1);
    const [loadingAddCart, setLoadingAddCart] = useState<boolean>(false);
    const [alertAddCart, setAlertAddCart] = useState<{
        status: number | null;
        text: string | null;
    }>({ status: null, text: null });

    const pathname = usePathname();
    const idProduct = pathname.split('/')[3];
    const user = useUser();

    let ratingAvg =
        product?.Review && product?.Review.length > 0
            ? product.Review.reduce((sum, cur) => sum + cur.rating, 0) /
              product.Review.length
            : 0;

    const router = useRouter();
    const dispatch = useDispatch();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    };

    useEffect(() => {
        const getProduct = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/product/${idProduct}`);
                const data: Product = await res.json();

                if (res.ok) {
                    setProduct(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false);
            }
        };

        getProduct();
    }, [idProduct, alert.status]);

    useEffect(() => {
        if (alert.status) {
            const timer = setTimeout(() => {
                setAlert({ status: null, text: null });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alert.status]);

    const handleAddReview = async () => {
        const userId = user?.user?.id;
        const productId = product?.id;

        try {
            if (review === null || review.length === 0) {
                setErrorReview({
                    error: true,
                    text: 'Lets filled input review',
                });
            } else if (!rate) {
                setErrorRating({
                    error: true,
                    text: 'Lets rating product',
                });
            } else {
                setPendingReview(true);

                const data = {
                    userId: userId,
                    productId: productId,
                    rating: rate,
                    comment: review,
                };

                const res = await fetch(`/api/review/new`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                const { message } = await res.json();

                setAlert({
                    status: res.status,
                    text: message,
                });

                setErrorReview({
                    error: false,
                    text: null,
                });

                setErrorRating({
                    error: false,
                    text: null,
                });

                setReview(null);
                setRate(null);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setPendingReview(false);
        }
    };

    const handleAddToCart = (quantityBuy: number, product: Product | null) => {
        // console.log({ quantityBuy }, product);
        try {
            setLoadingAddCart(true);
            const data = {
                ...product,
                quantityBuy: quantityBuy,
            };

            if (data) {
                dispatch(addCart(data));
                setAlertAddCart({ status: 200, text: 'Add cart success' });
                router.push('/detail-cart');
            } else {
                setAlertAddCart({ status: 500, text: 'error add cart' });
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoadingAddCart(false);
        }
    };

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
                    <Link
                        underline="hover"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        color="inherit"
                        href={'/store'}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        <Typography>Store</Typography>
                    </Link>
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="text.primary"
                    >
                        <StoreIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Product Detail / {idProduct}
                    </Typography>
                </Breadcrumbs>
            </div>

            {alert.status && (
                <Alert
                    severity={`${alert.status === 200 ? 'success' : 'error'}`}
                    sx={{ position: 'fixed', bottom: '50px', right: '20px' }}
                >
                    {alertAddCart.text}
                </Alert>
            )}

            {isLoading ? (
                <Box
                    sx={{
                        display: 'flex',
                        alignContent: 'center',
                        justifyContent: 'center',
                        marginTop: '20px',
                    }}
                >
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            marginTop: '40px',
                            gap: '30px',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: '#f6f6f6',
                                width: '40%',
                                height: '400px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '18px',
                            }}
                        >
                            <img
                                src={product?.picture ?? ''}
                                alt="image"
                                style={{
                                    width: '60%',
                                    height: '50%',
                                    borderRadius: '18px',
                                }}
                            />
                        </Box>

                        <Box
                            sx={{
                                width: '60%',
                                padding: '20px',
                            }}
                        >
                            <Typography
                                sx={{ fontSize: '35px', fontWeight: 'bold' }}
                            >
                                {product?.name}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '5px',
                                }}
                            >
                                <Rating
                                    name="read-only"
                                    value={ratingAvg}
                                    precision={0.5}
                                    readOnly
                                />
                                <Typography>
                                    ({product?.Review.length} Reviews)
                                </Typography>
                            </Box>
                            <Typography
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '30px',
                                    marginTop: '10px',
                                    marginBottom: '20px',
                                }}
                            >
                                $ {product?.price}
                            </Typography>
                            <Typography>
                                {product?.description} Lorem ipsum dolor, sit
                                amet consectetur adipisicing elit. Pariatur ad
                                consequuntur cum ducimus eligendi quasi! Rem
                                esse mollitia et aperiam neque ex eius magnam,
                                totam libero nulla eaque sequi pariatur?
                            </Typography>

                            <Box>
                                <ButtonGroup
                                    sx={{ marginTop: '20px' }}
                                    variant="contained"
                                    aria-label="Basic button group"
                                >
                                    <Button
                                        onClick={() =>
                                            quantityBuy > 1 &&
                                            setQuantityBuy(quantityBuy - 1)
                                        }
                                    >
                                        -
                                    </Button>
                                    <Typography
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '60px',
                                        }}
                                    >
                                        {quantityBuy}
                                    </Typography>
                                    <Button
                                        onClick={() =>
                                            setQuantityBuy(quantityBuy + 1)
                                        }
                                    >
                                        +
                                    </Button>
                                </ButtonGroup>

                                {loadingAddCart ? (
                                    <CircularProgress
                                        sx={{ marginLeft: '40px' }}
                                    />
                                ) : (
                                    <Button
                                        sx={{ marginLeft: '20px' }}
                                        variant="contained"
                                        startIcon={<ShoppingCartIcon />}
                                        onClick={() =>
                                            handleAddToCart(
                                                quantityBuy,
                                                product
                                            )
                                        }
                                    >
                                        Add To Cart
                                    </Button>
                                )}
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    gap: '10px',
                                    marginTop: '20px',
                                }}
                            >
                                <Typography sx={{ fontWeight: 'bold' }}>
                                    Share on:{' '}
                                </Typography>
                                <FacebookIcon sx={{ cursor: 'pointer' }} />
                                <TwitterIcon sx={{ cursor: 'pointer' }} />
                                <LinkedInIcon sx={{ cursor: 'pointer' }} />
                                <PinterestIcon sx={{ cursor: 'pointer' }} />
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ width: '100%', marginTop: '50px' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs
                                value={value}
                                onChange={handleChange}
                                aria-label="basic tabs example"
                            >
                                <Tab label="Description" {...a11yProps(0)} />
                                <Tab label="Information" {...a11yProps(1)} />
                                <Tab
                                    label={`Reviews (${product?.Review.length})`}
                                    {...a11yProps(2)}
                                />
                            </Tabs>
                        </Box>

                        <CustomTabPanel value={value} index={0}>
                            <Typography
                                sx={{
                                    fontSize: '27px',
                                    fontWeight: 'bold',
                                    marginBottom: '10px',
                                }}
                            >
                                Product Description
                            </Typography>
                            <Typography sx={{ marginBottom: '10px' }}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Animi, amet? Maxime nam
                                praesentium voluptas qui expedita dolore
                                veritatis quibusdam perferendis quia voluptatem
                                natus, illo quisquam blanditiis eum tenetur,
                                eius rerum! Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Animi, amet?
                                Maxime nam praesentium voluptas qui expedita
                                dolore veritatis quibusdam perferendis quia
                                voluptatem natus, illo quisquam blanditiis eum
                                tenetur, eius rerum!
                            </Typography>
                            <Typography>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Veritatis nisi labore quia
                                incidunt maxime a voluptatum, ratione eum
                                expedita aspernatur obcaecati enim quasi error
                                minus hic alias, facilis odit nulla!
                            </Typography>
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={1}>
                            <Typography
                                sx={{
                                    fontSize: '27px',
                                    fontWeight: 'bold',
                                    marginBottom: '10px',
                                }}
                            >
                                Additional Information
                            </Typography>

                            <Typography sx={{ marginBottom: '10px' }}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Animi, amet? Maxime nam
                                praesentium voluptas qui expedita dolore
                                veritatis quibusdam perferendis quia voluptatem
                                natus, illo quisquam blanditiis eum tenetur,
                                eius rerum! Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Animi, amet?
                                Maxime nam praesentium voluptas qui expedita
                                dolore veritatis quibusdam perferendis quia
                                voluptatem natus, illo quisquam blanditiis eum
                                tenetur, eius rerum!
                            </Typography>
                            <Typography>
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Veritatis nisi labore quia
                                incidunt maxime a voluptatum, ratione eum
                                expedita aspernatur obcaecati enim quasi error
                                minus hic alias, facilis odit nulla!
                            </Typography>
                        </CustomTabPanel>

                        <CustomTabPanel value={value} index={2}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '80px',
                                }}
                            >
                                {alert.status && alert.text && (
                                    <Alert
                                        sx={{
                                            position: 'fixed',
                                            bottom: '50px',
                                            right: '40px',
                                        }}
                                        variant="filled"
                                        severity={`${
                                            alert.status === 200
                                                ? 'success'
                                                : 'error'
                                        }`}
                                    >
                                        {alert.text}
                                    </Alert>
                                )}

                                <Box
                                    sx={{
                                        width: '50%',
                                        height: '500px',
                                        overflowY: 'auto',
                                    }}
                                >
                                    {/* isPendingAllReview */}
                                    {!true ? (
                                        <CircularProgress />
                                    ) : (
                                        <>
                                            <Typography
                                                sx={{
                                                    fontSize: '22px',
                                                    fontWeight: 'bold',
                                                    marginBottom: '10px',
                                                }}
                                            >
                                                {product?.Review.length} review
                                                for "{product?.name}"
                                            </Typography>

                                            {product?.Review.map(
                                                (item, idx) => (
                                                    <Box
                                                        key={idx}
                                                        sx={{
                                                            marginBottom:
                                                                '40px',
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                display: 'flex',
                                                                flexDirection:
                                                                    'row',
                                                                gap: '20px',
                                                            }}
                                                        >
                                                            <img
                                                                src={
                                                                    item.user
                                                                        .picture
                                                                }
                                                                alt="image product"
                                                                width="80px"
                                                                height="80px"
                                                                className="border border-black"
                                                            />

                                                            <Box>
                                                                <Box
                                                                    sx={{
                                                                        display:
                                                                            'flex',
                                                                        flexDirection:
                                                                            'row',
                                                                        gap: '20px',
                                                                    }}
                                                                >
                                                                    <Typography
                                                                        sx={{
                                                                            fontWeight:
                                                                                'bold',
                                                                            fontSize:
                                                                                '16px',
                                                                        }}
                                                                    >
                                                                        {
                                                                            item
                                                                                .user
                                                                                .name
                                                                        }
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            fontStyle:
                                                                                'italic',
                                                                        }}
                                                                    >
                                                                        -{' '}
                                                                        {item.reviewDate.slice(
                                                                            0,
                                                                            19
                                                                        )}
                                                                    </Typography>
                                                                </Box>

                                                                <Rating
                                                                    sx={{
                                                                        marginTop:
                                                                            '5px',
                                                                    }}
                                                                    name="read-only"
                                                                    value={
                                                                        item.rating
                                                                    }
                                                                    // defaultValue={2.5}
                                                                    precision={
                                                                        0.5
                                                                    }
                                                                    readOnly
                                                                />
                                                            </Box>
                                                        </Box>
                                                        <Typography
                                                            sx={{
                                                                marginTop:
                                                                    '12px',
                                                                width: '82%',
                                                                marginLeft:
                                                                    'auto',
                                                            }}
                                                        >
                                                            {item.comment}
                                                        </Typography>
                                                    </Box>
                                                )
                                            )}
                                        </>
                                    )}
                                </Box>

                                <Box
                                    component="form"
                                    noValidate
                                    autoComplete="off"
                                    sx={{
                                        width: '50%',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: '20px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Leave a review{' '}
                                        {isPendingReview && (
                                            <CircularProgress />
                                        )}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: '15px',
                                            marginTop: '20px',
                                            marginBottom: '15px',
                                        }}
                                    >
                                        Your email address will not be
                                        published. Required fields are marked *
                                    </Typography>

                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            gap: '12px',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        <Typography component="legend">
                                            Your Rating *:
                                        </Typography>
                                        <Rating
                                            name="simple-controlled"
                                            value={rate}
                                            onChange={(event, newValue) => {
                                                setRate(newValue ?? 0);
                                            }}
                                        />
                                        {errorRating.error && (
                                            <Typography
                                                sx={{
                                                    paddingTop: '2px',
                                                    color: 'red',
                                                }}
                                            >
                                                {errorRating.text}
                                            </Typography>
                                        )}
                                    </Box>

                                    <FormControl
                                        variant="standard"
                                        sx={{ width: '70%', marginX: 'auto' }}
                                    >
                                        <InputLabel htmlFor="input-with-icon-adornment">
                                            Your Review *
                                        </InputLabel>
                                        <Input
                                            value={review}
                                            onChange={(e) =>
                                                setReview(e.target.value)
                                            }
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <RateReviewIcon />
                                                </InputAdornment>
                                            }
                                        />
                                        {errorReview.error && (
                                            <Typography
                                                sx={{
                                                    paddingTop: '2px',
                                                    color: 'red',
                                                }}
                                            >
                                                {errorReview.text}
                                            </Typography>
                                        )}
                                    </FormControl>

                                    <FormControl
                                        variant="standard"
                                        sx={{
                                            width: '70%',
                                            marginX: 'auto',
                                            marginTop: '25px',
                                        }}
                                    >
                                        <InputLabel htmlFor="input-with-icon-adornment">
                                            Your Name *
                                        </InputLabel>
                                        <Input
                                            value={user.user?.username}
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <EmailIcon />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>

                                    <FormControl
                                        variant="standard"
                                        sx={{
                                            width: '70%',
                                            marginX: 'auto',
                                            marginY: '25px',
                                        }}
                                    >
                                        <InputLabel htmlFor="input-with-icon-adornment">
                                            Your Email *
                                        </InputLabel>
                                        <Input
                                            value={
                                                user.user?.emailAddresses[0]
                                                    .emailAddress
                                            }
                                            id="input-with-icon-adornment"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <BadgeIcon />
                                                </InputAdornment>
                                            }
                                        />
                                    </FormControl>

                                    <Button
                                        variant="contained"
                                        onClick={handleAddReview}
                                    >
                                        Leave Your Review
                                    </Button>
                                </Box>
                            </Box>
                        </CustomTabPanel>
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default ProductDetail;
