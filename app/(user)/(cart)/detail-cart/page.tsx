'use client';

import {
    Alert,
    Avatar,
    Box,
    Breadcrumbs,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Link,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    TextField,
    Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import DetailsIcon from '@mui/icons-material/Details';
import {
    DataGrid,
    GridActionsCellItem,
    GridColDef,
    GridRowModesModel,
} from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import AddIcon from '@mui/icons-material/Add';
import CustomNoRows from '@/Components/admin/items/CustomNoRows';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { deleteCart, updateQuantityBuy } from '@/lib/redux/slices/cartSlice';
import { useRouter } from 'next/navigation';

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

const DetailCart = () => {
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
    const [open, setOpen] = React.useState(false);
    const [idRowProduct, setIdRowProduct] = React.useState<number>(-1);
    const carts = useSelector((state: any) => state.cart);
    const dispatch = useDispatch();
    const [valueSearch, setValueSearch] = useState<string | null>(null);
    const [isSearch, setIsSearch] = useState<boolean>(false);
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [searchCoupons, setSearchCoupons] = useState<Coupon[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [selectCoupons, setSelectCoupons] = useState<Coupon[]>([]);
    const [alert, setAlert] = useState<{
        status: number | null;
        text: string | null;
    }>({ status: null, text: null });

    const handleDecreaseQuantity = (id: number, quantity: number) => {
        if (quantity === 1) {
            return;
        }

        const updatedQuantity = quantity - 1;
        dispatch(updateQuantityBuy({ id, quantity: updatedQuantity }));
    };

    const handleIncreaseQuantity = (id: number, quantity: number) => {
        const updatedQuantity = quantity + 1;
        dispatch(updateQuantityBuy({ id, quantity: updatedQuantity }));
    };

    const columns: GridColDef[] = [
        {
            field: 'id',
            headerName: 'ID',
            width: 50,
            // editable: true,
        },
        {
            field: 'categoryId',
            headerName: 'Category ID',
            width: 100,
            // editable: true,
        },
        {
            field: 'picture',
            headerName: 'Products',
            width: 100,
            renderCell: (params) => (
                <img
                    src={params.value}
                    alt={params.row.name}
                    style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                    }}
                />
            ),
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 100,
            // editable: true,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 120,
            // editable: true,
            type: 'actions',
            getActions: ({ row }) => {
                return [
                    <GridActionsCellItem
                        key={`save-${row.quantity}`}
                        icon={
                            <RemoveIcon
                                sx={{
                                    backgroundColor: 'yellow',
                                }}
                            />
                        }
                        label="Decrease"
                        onClick={() =>
                            handleDecreaseQuantity(row.id, row.quantity)
                        }
                        color="inherit"
                    />,
                    <Typography key={`save-${row.quantity}`}>
                        {row.quantityBuy}
                    </Typography>,
                    <GridActionsCellItem
                        key={`save-${row.quantity}`}
                        icon={
                            <AddIcon
                                sx={{
                                    backgroundColor: 'yellow',
                                }}
                            />
                        }
                        label="Increase"
                        onClick={() =>
                            handleIncreaseQuantity(row.id, row.quantity)
                        }
                        color="inherit"
                    />,
                ];
            },
        },
        {
            field: 'total',
            headerName: 'Total',
            // type: 'boolean',
            width: 120,
            // editable: true,
            renderCell: (params) => params.row.quantityBuy * params.row.price,
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: 'Remove',
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id, row }) => {
                return [
                    <GridActionsCellItem
                        key={`save-${id}`}
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={() => handleDelete(row.id)}
                        color="inherit"
                    />,
                ];
            },
        },
    ];

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const handleDelete = (id: number) => {
        setIdRowProduct(id);
        setOpen(true);
    };

    const handleAgreeDelete = () => {
        dispatch(deleteCart(idRowProduct));
        setOpen(false);
    };

    let subTotal = 0;
    if (carts.length > 0) {
        subTotal = carts.reduce(
            (sum: any, cart: any) => sum + cart.quantityBuy * cart.price,
            0
        );
    }

    const handleSearch = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setValueSearch(e.target.value);
        if (e.target.value) {
            setIsSearch(true);
            const filteredCoupons = coupons.filter(
                (item) =>
                    item.code.includes(e.target.value) ||
                    item.category.name.includes(e.target.value)
            );
            setSearchCoupons(filteredCoupons);
        } else {
            setIsSearch(false);
            setSearchCoupons([]);
        }
    };

    React.useEffect(() => {
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
    }, []);

    const handleAddCoupon = () => {
        const selectedCoupon = coupons.find(
            (coupon) => coupon.code === valueSearch
        );

        if (selectedCoupon) {
            const isAlreadySelected = selectCoupons.some(
                (coupon) => coupon.id === selectedCoupon.id
            );

            if (!isAlreadySelected) {
                setSelectCoupons((prevCoupons) => [
                    ...prevCoupons,
                    selectedCoupon,
                ]);
                setValueSearch(null);
                setAlert({ status: 200, text: 'Add Coupon Success' });
            } else {
                setAlert({ status: 500, text: 'Coupon is selected' });
                console.log('Coupon đã được chọn');
            }
        } else {
            setAlert({ status: 200, text: 'Coupon code not found' });
            console.log('Coupon code not found');
        }
    };

    React.useEffect(() => {
        if (alert.status) {
            const timer = setTimeout(() => {
                setAlert({ status: null, text: null });
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [alert.status]);

    const router = useRouter();

    let couponApply = 0;
    selectCoupons.forEach((coupon) => {
        const cartItems = carts.filter(
            (cart: any) => cart.categoryId === coupon.categoryId
        );
        if (cartItems.length > 0) {
            const totalDiscountForCategory = cartItems.reduce(
                (sum: any, cart: any) => sum + coupon.discount,
                0
            );
            couponApply += totalDiscountForCategory;
        }
    });
    // cart.quantityBuy * cart.price * (coupon.discount / 100),

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
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="text.primary"
                    >
                        <DetailsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Detail Cart
                    </Typography>
                </Breadcrumbs>
            </div>

            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {'Are you sure delete this product?'}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            HIHIHIHIHIHIHI
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)}>Disagree</Button>
                        <Button onClick={handleAgreeDelete}>Agree</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>

            {alert.status && (
                <Alert
                    sx={{ position: 'fixed', top: '100px', right: '20px' }}
                    severity={alert.status === 200 ? 'success' : 'error'}
                >
                    {alert.text}
                </Alert>
            )}

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '50px',
                    marginTop: '40px',
                }}
            >
                <Box sx={{ height: 520, width: '65%' }}>
                    <DataGrid
                        rows={carts}
                        columns={columns}
                        editMode="row"
                        checkboxSelection
                        rowModesModel={rowModesModel}
                        onRowModesModelChange={handleRowModesModelChange}
                        slots={{
                            noRowsOverlay: CustomNoRows,
                        }}
                        slotProps={{
                            // toolbar: { setRows, setRowModesModel },
                            toolbar: { setRowModesModel },
                        }}
                    />
                </Box>

                <Box sx={{ width: '35%' }}>
                    <Box sx={{ position: 'relative' }}>
                        <TextField
                            id="filled-basic"
                            label="Coupon Code"
                            variant="filled"
                            value={valueSearch}
                            onChange={(e) => handleSearch(e)}
                        />
                        <Button
                            variant="contained"
                            sx={{
                                height: '50px',
                                marginLeft: '20px',
                                display: 'inline-block',
                            }}
                            onClick={() => handleAddCoupon()}
                        >
                            Add Coupon
                        </Button>

                        {isSearch && (
                            <List
                                sx={{
                                    position: 'absolute',
                                    width: '100%',
                                    maxWidth: 360,
                                    bgcolor: 'background.paper',
                                    height: '200px',
                                    overflowY: 'auto',
                                }}
                            >
                                {searchCoupons.map((item, idx) => (
                                    <>
                                        <ListItem
                                            sx={{ cursor: 'pointer' }}
                                            key={idx}
                                            alignItems="flex-start"
                                            onClick={() =>
                                                setValueSearch(item.code)
                                            }
                                        >
                                            <ListItemAvatar>
                                                <Avatar
                                                    alt="Remy Sharp"
                                                    src="data:image/png;base64,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"
                                                />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.category.name}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{
                                                                display:
                                                                    'inline',
                                                            }}
                                                            component="span"
                                                            variant="h6"
                                                            color="text.primary"
                                                        >
                                                            CODE: {item.code}
                                                        </Typography>
                                                        <Typography component="div">
                                                            {item.startDate.slice(
                                                                0,
                                                                10
                                                            )}
                                                            {' ---> '}
                                                            {item.endDate.slice(
                                                                0,
                                                                10
                                                            )}
                                                        </Typography>
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider
                                            variant="inset"
                                            component="li"
                                        />
                                    </>
                                ))}
                            </List>
                        )}
                    </Box>

                    <Typography
                        sx={{
                            fontSize: '22px',
                            marginY: '20px',
                            fontWeight: 'bold',
                        }}
                    >
                        CART SUMMARY
                    </Typography>

                    <Box
                        sx={{
                            backgroundColor: '#f5f5f5',
                            paddingX: '18px',
                            paddingY: '25px',
                            marginBottom: '25px',
                        }}
                    >
                        {selectCoupons.map((select, idx) => (
                            <Box
                                key={idx}
                                sx={{
                                    border: '1px solid black',
                                    padding: '4px',
                                    borderRadius: '12px',
                                    marginBottom: '10px',
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
                                        Category ID:
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        {select.categoryId}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        {select.code}
                                    </Typography>
                                    <Typography sx={{ fontWeight: 'bold' }}>
                                        ${select.discount} %
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>

                    <Box
                        sx={{
                            backgroundColor: '#f5f5f5',
                            paddingX: '18px',
                            paddingY: '25px',
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
                                SubTotal
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                $ {subTotal}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginY: '20px',
                            }}
                        >
                            <Typography sx={{ fontWeight: 'bold' }}>
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
                                marginY: '20px',
                            }}
                        >
                            <Typography sx={{ fontWeight: 'bold' }}>
                                Coupon
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold' }}>
                                $ {couponApply}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                width: '100%',
                                backgroundColor: 'black',
                                height: '1px',
                                marginBottom: '30px',
                            }}
                        ></Box>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginY: '20px',
                            }}
                        >
                            <Typography
                                sx={{ fontWeight: 'bold', fontSize: '22px' }}
                            >
                                Total
                            </Typography>
                            <Typography
                                sx={{ fontWeight: 'bold', fontSize: '22px' }}
                            >
                                ${' '}
                                {couponApply === 0
                                    ? subTotal - 10
                                    : (subTotal * couponApply) / 100 - 10}
                            </Typography>
                        </Box>

                        <Button
                            onClick={() =>
                                router.push(
                                    `/checkout/?subtotal=${subTotal}&coupon=${couponApply}`
                                )
                            }
                            variant="contained"
                            sx={{ width: '100%' }}
                        >
                            Proceed To Checkout
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default DetailCart;
