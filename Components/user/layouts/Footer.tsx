'use client';

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import HelpIcon from '@mui/icons-material/Help';
import { Box, Container, Typography } from '@mui/material';
import stripe from '@/public/icons/stripe.svg';
import visa from '@/public/icons/visa.svg';
import amazon from '@/public/icons/amazon-pay.svg';
import klarna from '@/public/icons/klarna.svg';
import applePay from '@/public/icons/apple-pay.svg';
import ggPay from '@/public/icons/google-pay.svg';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Footer = () => {
    const cardPayment = [stripe, visa, amazon, klarna, applePay, ggPay];
    return (
        <Container
            maxWidth="lg"
            sx={{
                marginBottom: '50px',
                borderTop: '1px solid black',
                paddingTop: '100px',
            }}
        >
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={5} lg={4}>
                        <Item>
                            <Box
                                sx={{
                                    alignItems: 'center',
                                    px: 0,
                                }}
                            >
                                <img
                                    src={
                                        'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                                    }
                                    style={{
                                        width: '150px',
                                        height: 'auto',
                                        cursor: 'pointer',
                                    }}
                                    alt="logo of sitemark"
                                />
                            </Box>
                            <Typography sx={{ alignItems: 'start' }}>
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Laboriosam provident sint
                                exercitationem fugit, quidem magni quo facilis.
                                Aut deserunt cum accusantium, officia quas, ex,
                                laudantium in eveniet voluptatem rerum
                                aspernatur.
                            </Typography>
                        </Item>

                        <Item sx={{ marginTop: '30px' }}>
                            <Typography
                                fontSize={'20px'}
                                fontWeight={'bold'}
                                sx={{ marginBottom: '20px' }}
                            >
                                Accepted Payments
                            </Typography>
                            <Grid
                                container
                                spacing={{ xs: 2, md: 3 }}
                                columns={{ xs: 4, sm: 8, md: 12 }}
                            >
                                {cardPayment.map((image, index) => (
                                    <Grid xs={2} sm={4} md={4} key={index}>
                                        <Image
                                            src={image}
                                            style={{
                                                width: '50px',
                                                border: '1px solid black',
                                                padding: '4px',
                                                borderRadius: '12px',
                                            }}
                                            alt="image"
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Item>
                    </Grid>

                    <Grid container xs={12} md={7} lg={8} spacing={4}>
                        <Grid xs={6} lg={3}>
                            <Item>
                                <Box
                                    id="category-a"
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Department
                                </Box>
                                <Box
                                    component="ul"
                                    aria-labelledby="category-a"
                                    sx={{ pl: 2 }}
                                >
                                    <li style={{ marginTop: '10px' }}>
                                        Fashion
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Education Product
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Frozen Food
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Fashion
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Education Product
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Frozen Food
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Fashion
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Education Product
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Frozen Food
                                    </li>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid xs={6} lg={3}>
                            <Item>
                                <Box
                                    id="category-b"
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    About Us
                                </Box>
                                <Box
                                    component="ul"
                                    aria-labelledby="category-b"
                                    sx={{ pl: 2 }}
                                >
                                    <li style={{ marginTop: '10px' }}>
                                        About ShopCart
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        News & Blog
                                    </li>
                                    <li style={{ marginTop: '10px' }}>Help</li>
                                    <li style={{ marginTop: '10px' }}>
                                        About ShopCart
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        News & Blog
                                    </li>
                                    <li style={{ marginTop: '10px' }}>Help</li>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid xs={6} lg={3}>
                            <Item>
                                <Box
                                    id="category-c"
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Services
                                </Box>
                                <Box
                                    component="ul"
                                    aria-labelledby="category-c"
                                    sx={{ pl: 2 }}
                                >
                                    <li style={{ marginTop: '10px' }}>
                                        Gift Card
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Mobile App
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Shipping & Delivery
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Order Pickup
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Account SignUp
                                    </li>
                                </Box>
                            </Item>
                        </Grid>
                        <Grid xs={6} lg={3}>
                            <Item>
                                <Box
                                    id="category-d"
                                    sx={{
                                        fontSize: '14px',
                                        fontWeight: 'bold',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    Help
                                </Box>
                                <Box
                                    component="ul"
                                    aria-labelledby="category-d"
                                    sx={{ pl: 2 }}
                                >
                                    <li style={{ marginTop: '10px' }}>
                                        Shopcart Help
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Returns
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Track Orders
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Contact Us
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Feedback
                                    </li>
                                    <li style={{ marginTop: '10px' }}>
                                        Security & Fraud
                                    </li>
                                </Box>
                            </Item>
                        </Grid>
                    </Grid>

                    <Grid
                        xs={12}
                        container
                        justifyContent="space-between"
                        alignItems="center"
                        flexDirection={{ xs: 'column', sm: 'row' }}
                        sx={{ fontSize: '12px' }}
                    >
                        <Grid
                            container
                            columnSpacing={1}
                            sx={{ order: { xs: 1, sm: 2 } }}
                        >
                            <Grid>
                                <Item>Terms of Use</Item>
                            </Grid>
                            <Grid>
                                <Item>Privacy Policy</Item>
                            </Grid>
                        </Grid>

                        <Grid
                            container
                            columnSpacing={1}
                            sx={{ order: { xs: 1, sm: 2 } }}
                        >
                            <Grid>
                                <Item>
                                    <BusinessCenterIcon />
                                    <Typography>Become Seller</Typography>
                                </Item>
                            </Grid>
                            <Grid>
                                <Item>
                                    <CardGiftcardIcon />
                                    <Typography>Gift Cards</Typography>
                                </Item>
                            </Grid>
                            <Grid>
                                <Item>
                                    <HelpIcon />
                                    <Typography>Help Center</Typography>
                                </Item>
                            </Grid>
                        </Grid>

                        <Grid sx={{ order: { xs: 2, sm: 1 } }}>
                            <Item>© Copyright: NguyenHau | 2024</Item>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Footer;
