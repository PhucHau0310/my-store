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

const Footer = () => {
    const cardPayment = [stripe, visa, amazon, klarna, applePay, ggPay];
    return (
        <Container maxWidth="lg">
            <div className="flex flex-row items-start gap-4 border-t-2 mt-8 pt-10 border-t-[#e4e2e2] ">
                <div className="w-[40%]">
                    <Box
                        sx={{
                            alignItems: 'center',
                            ml: '-18px',
                            px: 0,
                        }}
                    >
                        <img
                            src={
                                'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                            }
                            style={{
                                width: '180px',
                                height: 'auto',
                                cursor: 'pointer',
                            }}
                            alt="logo of sitemark"
                        />
                    </Box>

                    <p className="text-base font-medium my-4">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Laboriosam provident sint exercitationem fugit, quidem
                        magni quo facilis. Aut deserunt cum accusantium, officia
                        quas, ex, laudantium in eveniet voluptatem rerum
                        aspernatur.
                    </p>

                    <div>
                        <h2 className="font-semibold text-base mb-3">
                            Accepted Payments
                        </h2>

                        <div className="grid grid-cols-3 gap-4 w-1/3">
                            {cardPayment.map((item, idx) => (
                                <div
                                    className="rounded-lg p-2 border border-[#e4e2e2]"
                                    key={idx}
                                >
                                    <Image
                                        src={item}
                                        alt={item}
                                        width={30}
                                        height={30}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-[15%] ">
                    <ul className="text-[#726f6e]">
                        <span className="font-semibold text-lg mb-2 block">
                            Department
                        </span>
                        <li className="mb-2">Fashion</li>
                        <li className="mb-2">Education Product</li>
                        <li className="mb-2">Frozen Food</li>
                        <li className="mb-2">Beverages</li>
                        <li className="mb-2">Organic Grocery</li>
                        <li className="mb-2">Office Supplies</li>
                        <li className="mb-2">Beauty Products</li>
                        <li className="mb-2">Books</li>
                        <li className="mb-2">Electronics & Gadget</li>
                        <li className="mb-2">Travel Accessories</li>
                        <li className="mb-2">Fitness</li>
                        <li className="mb-2">Sneakers</li>
                        <li className="mb-2">Toys</li>
                        <li className="mb-2">Furniture</li>
                    </ul>
                </div>

                <div className="w-[15%]">
                    <ul className="text-[#726f6e]">
                        <span className="font-semibold text-lg mb-2 block">
                            About Us
                        </span>
                        <li className="mb-2">About ShopCart</li>
                        <li className="mb-2">Careers</li>
                        <li className="mb-2">News & Blog</li>
                        <li className="mb-2">Help</li>
                        <li className="mb-2">Press Center</li>
                        <li className="mb-2">Shop By Location</li>
                        <li className="mb-2">Shopcart Brands</li>
                        <li className="mb-2">Affiliate & Partners</li>
                        <li className="mb-2">Ideas & Guides</li>
                    </ul>
                </div>

                <div className="w-[15%] ">
                    <ul className="text-[#726f6e]">
                        <span className="font-semibold text-lg mb-2 block">
                            Services
                        </span>
                        <li className="mb-2">Gift Card</li>
                        <li className="mb-2">Mobile App</li>
                        <li className="mb-2">Shipping & Delivery</li>
                        <li className="mb-2">Order Pickup</li>
                        <li className="mb-2">Account SignUp</li>
                    </ul>
                </div>

                <div className="w-[15%] ">
                    <ul className="text-[#726f6e]">
                        <span className="font-semibold text-lg mb-2 block">
                            Help
                        </span>
                        <li className="mb-2">Shopcart Help</li>
                        <li className="mb-2">Returns</li>
                        <li className="mb-2">Track Orders</li>
                        <li className="mb-2">Contact Us</li>
                        <li className="mb-2">Feedback</li>
                        <li className="mb-2">Security & Fraud</li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-row justify-between items-center border-t-2 mt-8 mb-2 border-t-[#e4e2e2] py-10 text-lg font-medium">
                <div className="w-[40%] flex flex-row items-center gap-3">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                        }}
                    >
                        <BusinessCenterIcon color="secondary" />
                        <Typography variant="h6" color="text.primary">
                            Become Seller
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                        }}
                    >
                        <CardGiftcardIcon color="secondary" />
                        <Typography variant="h6" color="text.primary">
                            Gift Cards
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                        }}
                    >
                        <HelpIcon color="secondary" />
                        <Typography variant="h6" color="text.primary">
                            Help Center
                        </Typography>
                    </Box>
                </div>

                <div className="w-[30%] flex flex-row gap-8 items-center">
                    <p>Terms of Use</p>
                    <p>Privacy Policy</p>
                </div>

                <div className="w-[30%] text-right ">
                    <p>All Right reserved by NguyenHau | 2024</p>
                </div>
            </div>
        </Container>
    );
};

export default Footer;
