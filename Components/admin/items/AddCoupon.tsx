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
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';

import React, { useEffect, useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import CodeIcon from '@mui/icons-material/Code';
import DateRangeIcon from '@mui/icons-material/DateRange';
import DiscountIcon from '@mui/icons-material/Discount';

interface AddCouponProps {
    openAddCoupon: boolean;
    setOpenAddCoupon: React.Dispatch<React.SetStateAction<boolean>>;
    setTriggerAddCoupon: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CategoryType {
    id: number;
    name: string;
    description: string;
    image: string;
}

const AddCoupon: React.FC<AddCouponProps> = ({
    openAddCoupon,
    setOpenAddCoupon,
    setTriggerAddCoupon,
}) => {
    const [code, setCode] = useState<string | null>(null);
    const [discount, setDiscount] = useState<number>(0);
    const [startDate, setStartDate] = useState<string | null>(null);
    const [endDate, setEndDate] = useState<string | null>(null);
    const [errorCode, setErrorCode] = useState<{
        error: boolean;
        text: string;
    }>();
    const [errorDiscount, setErrorDiscount] = useState<{
        error: boolean;
        text: string;
    }>();
    const [errorStartDate, setErrorStartDate] = useState<{
        error: boolean;
        text: string;
    }>();
    const [errorEndDate, setErrorEndDate] = useState<{
        error: boolean;
        text: string;
    }>();
    const [errorCategoryType, setErrorCategoryType] = useState<{
        error: boolean;
        text: string;
    }>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [messRes, setMessRes] = useState<string | null>(null);
    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [categoryType, setCategoryType] = useState<string | number | null>(
        null
    );

    useEffect(() => {
        const getAllCategories = async () => {
            try {
                const res = await fetch(`/api/category`);
                const data: CategoryType[] = await res.json();

                if (res.ok) {
                    setCategories(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllCategories();
    }, []);

    const handleSave = async () => {
        // console.log({ code, discount, startDate, endDate });

        let hasError = false;
        const errCode = { error: false, text: '' };
        const errDiscount = { error: false, text: '' };
        const errStartDate = { error: false, text: '' };
        const errEndDate = { error: false, text: '' };
        const errCategoryType = { error: false, text: '' };

        if (!code?.trim()) {
            errCode.error = true;
            errCode.text = 'Code Input is not filled';
            hasError = true;
        }

        if (discount < 0 && discount > 99) {
            errDiscount.error = true;
            errDiscount.text = 'Discount must be at greater 0 and smaller 100';
            hasError = true;
        }

        if (!startDate) {
            errStartDate.error = true;
            errStartDate.text = 'StartDate is not filled';
        }

        if (!endDate) {
            errEndDate.error = true;
            errEndDate.text = 'StartDate is not filled';
        }

        if (!categoryType) {
            errCategoryType.error = true;
            errCategoryType.text = 'Please select a category';
        }

        setErrorCode(errCode);
        setErrorDiscount(errDiscount);
        setErrorStartDate(errStartDate);
        setErrorEndDate(errEndDate);
        setErrorCategoryType(errCategoryType);

        if (hasError) {
            return;
        }

        try {
            setLoading(true);
            setTriggerAddCoupon(false);
            const data = {
                code: code,
                discount: discount,
                startDate: startDate,
                endDate: endDate,
                categoryId: categoryType,
            };
            const res = await fetch(`/api/coupon/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const { message } = await res.json();
            setMessRes(message);

            setCode(null);
            setDiscount(0);
            setStartDate(null);
            setEndDate(null);
            setCategoryType(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setTriggerAddCoupon(true);
        }
    };
    return (
        <Dialog
            open={openAddCoupon}
            onClose={() => setOpenAddCoupon(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            {messRes && (
                <Alert
                    sx={{
                        position: 'fixed',
                        top: '0px',
                        right: '0px',
                        width: '25%',
                        translate: `${messRes ? '0px' : '420px'}`,
                        transition: 'ease-in',
                    }}
                    icon={<CheckIcon fontSize="inherit" />}
                    severity="success"
                >
                    {messRes}
                </Alert>
            )}

            <DialogTitle
                id="alert-dialog-title"
                sx={{
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                }}
            >
                {'Add Coupon'}
                {isLoading && <CircularProgress />}
            </DialogTitle>
            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description"
                    sx={{ textAlign: 'center' }}
                >
                    Lets filled all information below!
                </DialogContentText>
            </DialogContent>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                width="100%"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignContent: 'center',
                    justifyContent: 'center',
                    gap: '20px',
                    paddingX: '20px',
                    paddingBottom: '30px',
                }}
            >
                <FormControl
                    variant="standard"
                    sx={{ width: '70%', marginX: 'auto' }}
                >
                    <InputLabel id="demo-simple-select-label">
                        Category Type
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Age"
                        value={categoryType}
                        onChange={(e) => setCategoryType(e.target.value)}
                    >
                        {categories.map((item, idx) => (
                            <MenuItem key={idx} value={item.id}>
                                {item.name}
                            </MenuItem>
                        ))}
                    </Select>

                    {errorCategoryType?.error && (
                        <Typography
                            sx={{
                                paddingTop: '2px',
                                color: 'red',
                            }}
                        >
                            {errorCategoryType.text}
                        </Typography>
                    )}
                </FormControl>

                <FormControl
                    error={errorCode?.error}
                    variant="standard"
                    sx={{ width: '70%', marginX: 'auto' }}
                >
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Code
                    </InputLabel>
                    <Input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <CodeIcon />
                            </InputAdornment>
                        }
                    />
                    {errorCode?.error && (
                        <Typography
                            sx={{
                                paddingTop: '2px',
                                color: 'red',
                            }}
                        >
                            {errorCode.text}
                        </Typography>
                    )}
                </FormControl>

                <FormControl
                    error={errorDiscount?.error}
                    variant="standard"
                    sx={{ width: '70%', marginX: 'auto' }}
                >
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Discount
                    </InputLabel>
                    <Input
                        type="number"
                        value={discount}
                        onChange={(e) => setDiscount(Number(e.target.value))}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <DiscountIcon />
                            </InputAdornment>
                        }
                        sx={{}}
                    />
                    {errorDiscount?.error && (
                        <Typography
                            sx={{
                                paddingTop: '2px',
                                color: 'red',
                            }}
                        >
                            {errorDiscount.text}
                        </Typography>
                    )}
                </FormControl>

                <FormControl
                    error={errorStartDate?.error}
                    variant="standard"
                    sx={{ width: '70%', marginX: 'auto' }}
                >
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Start Date
                    </InputLabel>
                    <Input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <DateRangeIcon />
                            </InputAdornment>
                        }
                        sx={{}}
                    />
                    {errorStartDate?.error && (
                        <Typography
                            sx={{
                                paddingTop: '2px',
                                color: 'red',
                            }}
                        >
                            {errorStartDate.text}
                        </Typography>
                    )}
                </FormControl>

                <FormControl
                    error={errorEndDate?.error}
                    variant="standard"
                    sx={{ width: '70%', marginX: 'auto' }}
                >
                    <InputLabel htmlFor="input-with-icon-adornment">
                        End Date
                    </InputLabel>
                    <Input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <DateRangeIcon />
                            </InputAdornment>
                        }
                        sx={{}}
                    />
                    {errorEndDate?.error && (
                        <Typography
                            sx={{
                                paddingTop: '2px',
                                color: 'red',
                            }}
                        >
                            {errorEndDate.text}
                        </Typography>
                    )}
                </FormControl>
            </Box>
            <DialogActions>
                <Button onClick={() => setOpenAddCoupon(false)}>Cancel</Button>
                <Button onClick={() => handleSave()}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCoupon;
