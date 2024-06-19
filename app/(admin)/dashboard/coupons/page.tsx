'use client';

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Fab,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AddIcon from '@mui/icons-material/Add';
import React, { useEffect, useState } from 'react';
import AddCoupon from '@/Components/admin/items/AddCoupon';
import RemoveIcon from '@mui/icons-material/Remove';

interface Category {
    id: number;
    name: string;
}

interface Coupon {
    id: number;
    code: string;
    discount: number;
    startDate: string;
    endDate: string;
    categoryId: number;
    isActive: boolean;
    category: Category;
}

const Coupons = () => {
    const [openAddCoupon, setOpenAddCoupon] = useState<boolean>(false);
    const [triggerAddCoupon, setTriggerAddCoupon] = useState<boolean>(false);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [dialogDelete, setDialogDelete] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<number>(-1);
    const [alert, setAlert] = useState<{
        status: number | null;
        text: string | null;
    }>({ status: null, text: null });

    useEffect(() => {
        const getAllCoupons = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/coupon`);
                const data: Coupon[] = await res.json();

                if (res.ok) {
                    setCoupons(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getAllCoupons();
    }, [triggerAddCoupon, alert.status]);

    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert({ status: null, text: null });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alert]);

    const handleDelete = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/coupon/${idDelete}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { message } = await res.json();
            setAlert({
                status: res.status,
                text: message,
            });
        } catch (error) {
            setAlert({
                status: 500,
                text: 'Something Error when delete coupon!!',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                Coupons
            </Typography>

            {isLoading && <CircularProgress />}

            {alert.status && (
                <Alert
                    severity={`${alert.status === 200 ? 'success' : 'error'}`}
                    sx={{ position: 'fixed', top: '100px', right: '70px' }}
                >
                    {alert.text}
                </Alert>
            )}

            <Fab
                onClick={() => setOpenAddCoupon(true)}
                color="primary"
                aria-label="add"
                sx={{ position: 'fixed', right: '30px', bottom: '70px' }}
            >
                <AddIcon />
            </Fab>

            {openAddCoupon && (
                <AddCoupon
                    openAddCoupon={openAddCoupon}
                    setOpenAddCoupon={setOpenAddCoupon}
                    setTriggerAddCoupon={setTriggerAddCoupon}
                />
            )}

            {dialogDelete && (
                <React.Fragment>
                    <Dialog
                        open={dialogDelete}
                        onClose={() => setDialogDelete(false)}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">
                            {'Are you sure to delete this coupon?'}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                ^_^ .
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setDialogDelete(false)}>
                                Disagree
                            </Button>
                            <Button onClick={() => handleDelete()}>
                                Agree
                            </Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            )}

            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {coupons.map((item, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Box
                                sx={{
                                    marginBottom: '90px',
                                    position: 'relative',
                                    padding: '20px',
                                    borderRadius: '12px',
                                    backgroundColor: '#FA8BFF',
                                    backgroundImage:
                                        'linear-gradient(45deg, #FA8BFF 0%, #2BD2FF 52%, #2BFF88 90%)',
                                }}
                            >
                                <Button
                                    onClick={() => {
                                        setDialogDelete(true);
                                        setIdDelete(item.id);
                                    }}
                                    variant="contained"
                                    sx={{
                                        backgroundColor: 'red',
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: 'auto',
                                        borderRadius: '999px',
                                    }}
                                >
                                    <RemoveIcon />
                                </Button>

                                <Box>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: '130px',
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: 'white',
                                                fontSize: '23px',
                                            }}
                                        >
                                            GIFT CARD
                                        </Typography>
                                        <CardGiftcardIcon
                                            sx={{
                                                color: 'white',
                                                width: '70px',
                                                height: '70px',
                                            }}
                                        />
                                    </Box>

                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '42px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {item.discount}% OFF
                                    </Typography>

                                    <Typography
                                        sx={{
                                            color: 'white',
                                            fontSize: '17px',
                                        }}
                                    >
                                        {item.category.name}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        position: 'absolute',
                                        bottom: '-72px',
                                        left: '0px',
                                        right: '0px',
                                        width: '80%',
                                        backgroundColor: 'white',
                                        padding: '12px',
                                        paddingX: '16px',
                                        // display: 'flex',
                                        // justifyContent: 'center',
                                        marginX: 'auto',
                                        borderBottomRightRadius: '12px',
                                        borderBottomLeftRadius: '12px',
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                        <Typography sx={{ fontWeight: 'bold' }}>
                                            Code
                                        </Typography>
                                        <Typography>
                                            {item.startDate.slice(0, 10)}
                                        </Typography>
                                        <Typography>
                                            {item.endDate.slice(0, 10)}
                                        </Typography>
                                    </Box>

                                    <Typography>{item.code}</Typography>
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};

export default Coupons;
