'use client';

import {
    Box,
    Breadcrumbs,
    Button,
    Checkbox,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    FormControlLabel,
    FormLabel,
    Link,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';

import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import DetailsIcon from '@mui/icons-material/Details';
import PaymentsIcon from '@mui/icons-material/Payments';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Radio from '@mui/material/Radio';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useUser } from '@clerk/nextjs';
import { deleteCarts } from '@/lib/redux/slices/cartSlice';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CheckOut = () => {
    const [isChecked, setChecked] = useState<boolean>(false);
    const [showAnimation, setShowAnimation] = useState(false);
    const [firstName, setFirstName] = useState<string | null>(null);
    const [lastName, setLastName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [mobileNo, setMobileNo] = useState<string | null>(null);
    const [address, setAddress] = useState<string | null>(null);
    const carts = useSelector((state: any) => state.cart);
    const subtotal = useSearchParams().get('subtotal');
    const coupon = useSearchParams().get('coupon');
    const [paymentType, setPaymentType] = useState<string | null | number>(
        null
    );

    const [alert, setAlert] = useState<{
        status: number | null;
        text: string | null;
    }>({ status: null, text: null });
    const [isLoading, setLoading] = useState<boolean>(false);
    const user = useUser();
    const dispatch = useDispatch();
    const router = useRouter();

    const handlePlaceOrder = async () => {
        // console.log({
        //     firstName,
        //     lastName,
        //     email,
        //     mobileNo,
        //     address,
        //     subtotal,
        //     coupon,
        //     paymentType,
        // });

        if (
            !firstName ||
            !lastName ||
            !email ||
            !mobileNo ||
            !address ||
            !paymentType
        ) {
            return;
        }

        const data = {
            carts: carts,
            userIdd: user.user?.id ?? '',
            shippingAddress: address,
            paymentMethod: paymentType,
        };

        try {
            setLoading(true);
            const res = await fetch(`/api/orders/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const { message } = await res.json();
            if (res.ok) {
                dispatch(deleteCarts());
            }

            setAlert({ status: res.status, text: message });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ marginY: '120px' }}>
            <div role="presentation" className="bg-[#f5f5f5] p-3 rounded-lg">
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
                        href={'/'}
                    >
                        <StoreIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        <Typography>Store</Typography>
                    </Link>
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
                        <DetailsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        <Typography>Detail Cart</Typography>
                    </Link>
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="text.primary"
                    >
                        <PaymentsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        CheckOut
                    </Typography>
                </Breadcrumbs>
            </div>

            <React.Fragment>
                <Dialog
                    open={alert.status === 200}
                    onClose={() => setAlert({ status: null, text: null })}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle
                        sx={{ marginX: 'auto' }}
                        id="alert-dialog-title"
                    >
                        <CheckCircleOutlineIcon
                            sx={{
                                color: 'green',
                                width: '80px',
                                height: '80px',
                            }}
                        />
                    </DialogTitle>
                    <DialogTitle
                        id="alert-dialog-title"
                        sx={{ color: 'green' }}
                    >
                        {'Your orders has been accepted'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Thank you so much for your orders ^.^
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions
                        sx={{ display: 'flex', justifyContent: 'center' }}
                    >
                        <Button
                            variant="contained"
                            onClick={() => router.push('/store')}
                        >
                            Continue Shopping
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '50px',
                    gap: '50px',
                }}
            >
                <Box sx={{ width: '65%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                width: '25%',
                                fontWeight: 'bold',
                                fontSize: '20px',
                            }}
                        >
                            BILLING ADDRESS
                        </Typography>
                        <Box
                            sx={{
                                height: '1px',
                                width: '75%',
                                backgroundColor: 'black',
                            }}
                        ></Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Checkbox
                            {...label}
                            checked={isChecked}
                            onChange={(e) => setChecked(e.target.checked)}
                            onClick={() => setShowAnimation(true)}
                        />
                        <Typography>Returning Customer?</Typography>
                    </Box>

                    {isChecked ? (
                        <Box
                            sx={{
                                marginTop: '30px',
                                padding: '20px',
                                borderRadius: '12px',
                                border: '1px solid black',
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: '25px',
                                    marginBottom: '20px',
                                    fontWeight: 'bold',
                                }}
                            >
                                Delivery Information
                            </Typography>

                            <Typography
                                sx={{ fontSize: '18px', marginBottom: '5px' }}
                            >
                                Username: {firstName} {lastName}
                            </Typography>

                            <Typography
                                sx={{ fontSize: '18px', marginBottom: '5px' }}
                            >
                                Address: {address}
                            </Typography>

                            <Typography
                                sx={{ fontSize: '18px', marginBottom: '5px' }}
                            >
                                Mobile Phone: + {mobileNo}
                            </Typography>

                            <Typography
                                sx={{ fontSize: '18px', marginBottom: '5px' }}
                            >
                                Email: {email}
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                backgroundColor: '#f5f5f5',
                                className: `box-animation ${
                                    showAnimation ? 'show' : ''
                                }`,
                                padding: '30px',
                                marginTop: '20px',
                                borderRadius: '12px',
                            }}
                            noValidate
                            autoComplete="off"
                            component="form"
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    gap: '40px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '50%',
                                    }}
                                >
                                    <TextField
                                        // error
                                        id="outlined-basic"
                                        label="First Name"
                                        variant="outlined"
                                        value={firstName}
                                        onChange={(e) =>
                                            setFirstName(e.target.value)
                                        }
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '50%',
                                    }}
                                >
                                    <TextField
                                        // error
                                        id="outlined-basic"
                                        label="Last Name"
                                        variant="outlined"
                                        value={lastName}
                                        onChange={(e) =>
                                            setLastName(e.target.value)
                                        }
                                    />
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    gap: '40px',
                                    marginTop: '30px',
                                }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '50%',
                                    }}
                                >
                                    <TextField
                                        // error
                                        id="outlined-basic"
                                        label="Email"
                                        variant="outlined"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                    />
                                </Box>

                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        width: '50%',
                                    }}
                                >
                                    <TextField
                                        // error
                                        id="outlined-basic"
                                        label="Mobile No"
                                        variant="outlined"
                                        value={mobileNo}
                                        onChange={(e) =>
                                            setMobileNo(e.target.value)
                                        }
                                    />
                                </Box>
                            </Box>

                            <Box sx={{ marginTop: '30px', width: '100%' }}>
                                <TextField
                                    // error
                                    id="outlined-basic"
                                    label="Address"
                                    variant="outlined"
                                    fullWidth
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </Box>
                        </Box>
                    )}
                </Box>

                <Box sx={{ width: '35%' }}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}
                    >
                        <Typography
                            sx={{
                                width: '40%',
                                fontSize: '20px',
                                fontWeight: 'bold',
                            }}
                        >
                            ORDER TOTAL
                        </Typography>
                        <Box
                            sx={{
                                height: '1px',
                                width: '60%',
                                backgroundColor: 'black',
                            }}
                        ></Box>
                    </Box>

                    <Box
                        sx={{
                            backgroundColor: '#f5f5f5',
                            padding: '20px',
                            borderRadius: '12px',
                            marginTop: '12px',
                        }}
                    >
                        <Typography
                            sx={{
                                fontSize: '18px',
                                fontWeight: 'bold',
                                marginBottom: '12px',
                            }}
                        >
                            Products
                        </Typography>
                        {carts.map((cart: any, idx: number) => (
                            <Box
                                key={idx}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    marginBottom: '12px',
                                }}
                            >
                                <Typography>{cart.name}</Typography>
                                <Typography>
                                    $ {cart.quantityBuy * cart.price}
                                </Typography>
                            </Box>
                        ))}

                        <Box
                            sx={{
                                width: '100%',
                                height: '1px',
                                backgroundColor: 'black',
                            }}
                        ></Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginY: '12px',
                            }}
                        >
                            <Typography
                                sx={{ fontSize: '17px', fontWeight: 'bold' }}
                            >
                                Subtotal
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                $ {subtotal}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginY: '12px',
                            }}
                        >
                            <Typography
                                sx={{ fontSize: '17px', fontWeight: 'bold' }}
                            >
                                Shipping
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                $ 10
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginY: '12px',
                            }}
                        >
                            <Typography
                                sx={{ fontSize: '17px', fontWeight: 'bold' }}
                            >
                                Coupon
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                $ {coupon}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                width: '100%',
                                height: '1px',
                                backgroundColor: 'black',
                            }}
                        ></Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginY: '12px',
                            }}
                        >
                            <Typography
                                sx={{ fontSize: '18px', fontWeight: 'bold' }}
                            >
                                Total
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                ${' '}
                                {Number(coupon) === 0
                                    ? Number(subtotal) - 10
                                    : (Number(subtotal) * Number(coupon)) /
                                          100 -
                                      10}
                            </Typography>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginTop: '20px',
                        }}
                    >
                        <Typography
                            sx={{
                                width: '30%',
                                fontSize: '20px',
                                fontWeight: 'bold',
                            }}
                        >
                            Payment
                        </Typography>
                        <Box
                            sx={{
                                height: '1px',
                                width: '70%',
                                backgroundColor: 'black',
                            }}
                        ></Box>
                    </Box>

                    <Box
                        sx={{
                            backgroundColor: '#f5f5f5',
                            padding: '20px',
                            borderRadius: '12px',
                            marginTop: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px',
                        }}
                    >
                        <FormControl>
                            <RadioGroup
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="female"
                                name="radio-buttons-group"
                                value={paymentType}
                                onChange={(e) => setPaymentType(e.target.value)}
                            >
                                <FormControlLabel
                                    value="CREDIT_CARD"
                                    control={<Radio />}
                                    label="CREDIT_CARD"
                                />
                                <FormControlLabel
                                    value="PAYPAL"
                                    control={<Radio />}
                                    label="PAYPAL"
                                />
                                <FormControlLabel
                                    value="CASH_ON_DELIVERY"
                                    control={<Radio />}
                                    label="CASH_ON_DELIVERY"
                                />
                            </RadioGroup>
                        </FormControl>
                        <Button
                            onClick={handlePlaceOrder}
                            sx={{ height: '50px' }}
                            variant="contained"
                        >
                            Place Order
                        </Button>

                        {isLoading && <CircularProgress />}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default CheckOut;
