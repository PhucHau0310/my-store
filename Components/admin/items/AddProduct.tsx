'use client';

import { AccountCircle } from '@mui/icons-material';
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
    OutlinedInput,
    Select,
    Typography,
} from '@mui/material';

import DescriptionIcon from '@mui/icons-material/Description';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SpaIcon from '@mui/icons-material/Spa';
import React, { useCallback, useEffect, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Image from 'next/image';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { imageDb } from '@/lib/firsebase';
import { v4 } from 'uuid';
import CheckIcon from '@mui/icons-material/Check';

interface AllCategories {
    id: number;
    name: string;
    description: string;
    image: string;
    published: boolean;
}

interface AddProductProps {
    openAddProduct: boolean;
    setOpenAddProduct: React.Dispatch<React.SetStateAction<boolean>>;
    setTriggerAddCate: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct: React.FC<AddProductProps> = ({
    openAddProduct,
    setOpenAddProduct,
    setTriggerAddCate,
}) => {
    const [categories, setCategories] = useState<AllCategories[]>([]);
    const [image, setImage] = useState<string | null>(null);
    const [uploadImg, setUploadImg] = useState<string>('');
    const [categoryType, setCategoryType] = useState<string | number | null>(
        null
    );
    const [name, setName] = useState<string | null>(null);
    const [desc, setDesc] = useState<string | null>(null);
    const [price, setPrice] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number | null>(null);
    const [version, setVersion] = useState<string | null>(null);
    const [errorName, setErrorName] = useState<{
        error: boolean;
        text: string;
    }>();
    const [errorCategoryType, setErrorCategoryType] = useState<{
        error: boolean;
        text: string;
    }>();
    const [errorDesc, setErrorDesc] = useState<{
        error: boolean;
        text: string;
    }>();
    const [errorPrice, setErrorPrice] = useState<{
        error: boolean;
        text: string;
    }>();
    const [errorQuantity, setErrorQuantity] = useState<{
        error: boolean;
        text: string;
    }>();
    const [errorVersion, setErrorVersion] = useState<{
        error: boolean;
        text: string;
    }>();
    const [errorImage, setErrorImage] = useState<{
        error: boolean;
        text: string;
    }>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [messRes, setMessRes] = useState<string | null>(null);

    const handleUploadFile = useCallback(
        async (e: any) => {
            const file = e.target.files?.[0];
            if (!file) return;

            const imgRef = ref(imageDb, `files/${v4()}`);
            const snapshot = await uploadBytes(imgRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);

            setImage(URL.createObjectURL(file));
            setUploadImg(downloadURL);
        },
        [imageDb, v4]
    );

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await fetch(`/api/category`);
                const data: AllCategories[] = await res.json();

                if (res.ok) {
                    setCategories(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getCategories();
    }, []);

    const handleAddProduct = async () => {
        let hasError = false;
        setErrorCategoryType({ error: false, text: '' });
        setErrorName({ error: false, text: '' });
        setErrorDesc({ error: false, text: '' });
        setErrorPrice({ error: false, text: '' });
        setErrorQuantity({ error: false, text: '' });
        setErrorVersion({ error: false, text: '' });
        setErrorImage({ error: false, text: '' });

        if (!categoryType) {
            setErrorCategoryType({
                error: true,
                text: 'Please select a category',
            });
            hasError = true;
        }

        if (!name?.trim() || name.length < 5) {
            setErrorName({
                error: true,
                text: 'Product Name must not be empty and length must be at least 5 characters',
            });
            hasError = true;
        }

        if (!desc?.trim() || desc.length < 10) {
            setErrorDesc({
                error: true,
                text: 'Product Description must not be empty and length must be at least 10 characters',
            });
            hasError = true;
        }

        if (!price || price <= 0) {
            setErrorPrice({
                error: true,
                text: 'Price must be a numeric value greater than 0',
            });
            hasError = true;
        }

        if (!quantity || quantity < 0) {
            setErrorQuantity({
                error: true,
                text: 'Quantity must be a numeric value greater than or equal to 0',
            });
            hasError = true;
        }

        if (!version?.trim()) {
            setErrorVersion({ error: true, text: 'Version must not be empty' });
            hasError = true;
        }

        if (!image) {
            setErrorImage({ error: true, text: 'Please select an image file' });
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            setLoading(true);
            setTriggerAddCate(false);
            const data = {
                name,
                description: desc,
                picture: uploadImg,
                price,
                quantity,
                version,
                categoryId: categoryType,
            };
            const res = await fetch(`/api/product/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const { message } = await res.json();
            setMessRes(message);

            if (res.ok) {
                setTriggerAddCate(true);
                setCategoryType(null);
                setName(null);
                setDesc(null);
                setPrice(null);
                setQuantity(null);
                setVersion(null);
                setImage(null);
                setUploadImg('');
            }
        } catch (error) {
            console.log(error);
            setMessRes('An error occurred while adding the product');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={openAddProduct}
            onClose={() => setOpenAddProduct(false)}
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
                {'Add Product'}
                {isLoading && <CircularProgress />}
            </DialogTitle>

            <DialogContent>
                <DialogContentText
                    id="alert-dialog-description"
                    sx={{ textAlign: 'center' }}
                >
                    Let's filled all information below!
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
                    variant="standard"
                    sx={{ width: '70%', marginX: 'auto' }}
                >
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Product Title / Name
                    </InputLabel>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                    />
                    {errorName?.error && (
                        <Typography
                            sx={{
                                paddingTop: '2px',
                                color: 'red',
                            }}
                        >
                            {errorName.text}
                        </Typography>
                    )}
                </FormControl>

                <FormControl
                    variant="standard"
                    sx={{ width: '70%', marginX: 'auto' }}
                >
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Description
                    </InputLabel>
                    <Input
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <DescriptionIcon />
                            </InputAdornment>
                        }
                        sx={{}}
                    />
                    {errorDesc?.error && (
                        <Typography
                            sx={{
                                paddingTop: '2px',
                                color: 'red',
                            }}
                        >
                            {errorDesc.text}
                        </Typography>
                    )}
                </FormControl>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <FormControl variant="standard" sx={{ width: '30%' }}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Price
                        </InputLabel>
                        <Input
                            value={price}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <MonetizationOnIcon />
                                </InputAdornment>
                            }
                        />
                        {errorPrice?.error && (
                            <Typography
                                sx={{
                                    paddingTop: '2px',
                                    color: 'red',
                                }}
                            >
                                {errorPrice.text}
                            </Typography>
                        )}
                    </FormControl>
                    <FormControl variant="standard" sx={{ width: '30%' }}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Quantity
                        </InputLabel>
                        <Input
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(Number(e.target.value))
                            }
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <ProductionQuantityLimitsIcon />
                                </InputAdornment>
                            }
                        />
                        {errorQuantity?.error && (
                            <Typography
                                sx={{
                                    paddingTop: '2px',
                                    color: 'red',
                                }}
                            >
                                {errorQuantity.text}
                            </Typography>
                        )}
                    </FormControl>
                    <FormControl variant="standard" sx={{ width: '30%' }}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Version
                        </InputLabel>
                        <Input
                            value={version}
                            onChange={(e) => setVersion(e.target.value)}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SpaIcon />
                                </InputAdornment>
                            }
                        />
                        {errorVersion?.error && (
                            <Typography
                                sx={{
                                    paddingTop: '2px',
                                    color: 'red',
                                }}
                            >
                                {errorVersion.text}
                            </Typography>
                        )}
                    </FormControl>
                </Box>

                <FormControl
                    error={errorImage?.error}
                    sx={{ width: '70%', marginX: 'auto', position: 'relative' }}
                >
                    <InputLabel htmlFor="component-outlined">
                        <AddPhotoAlternateIcon />
                        <Typography>
                            Drag your image here
                            <br />
                            (Only *.jpeg, *.png, *.webp images will be accepted)
                        </Typography>
                    </InputLabel>
                    <OutlinedInput
                        id="component-outlined"
                        label="Picture"
                        sx={{ height: '280px' }}
                        type="file"
                        onChange={(e) => handleUploadFile(e)}
                    />
                    {errorImage?.error && (
                        <Typography
                            sx={{
                                paddingTop: '2px',
                                color: 'red',
                            }}
                        >
                            {errorImage.text}
                        </Typography>
                    )}
                    {image && (
                        <Image
                            src={image}
                            alt="image file selected"
                            width={80}
                            height={80}
                            className="bg-orange-300 absolute bottom-0 left-1/2 -translate-x-1/2 mb-2 rounded-md p-2"
                        />
                    )}
                </FormControl>
            </Box>

            <DialogActions>
                <Button onClick={() => setOpenAddProduct(false)}>Cancel</Button>
                <Button onClick={handleAddProduct} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProduct;
