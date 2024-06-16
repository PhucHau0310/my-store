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
    OutlinedInput,
    Typography,
} from '@mui/material';

import DescriptionIcon from '@mui/icons-material/Description';
import React, { useCallback, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Image from 'next/image';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from '@firebase/storage';
import { imageDb } from '@/lib/firsebase';
import CheckIcon from '@mui/icons-material/Check';

interface AddProductProps {
    openAddCategory: boolean;
    setOpenAddCategory: React.Dispatch<React.SetStateAction<boolean>>;
    triggerAddCate: boolean;
    setTriggerAddCate: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddCategory: React.FC<AddProductProps> = ({
    openAddCategory,
    setOpenAddCategory,
    triggerAddCate,
    setTriggerAddCate,
}) => {
    const [image, setImage] = useState<string | null>(null);
    const [uploadImg, setUploadImg] = useState<string>('');
    const [name, setName] = useState<string | null>(null);
    const [desc, setDesc] = useState<string | null>(null);
    const [errorName, setErrorName] = useState<{
        error: boolean;
        text: string;
    }>();
    const [errorDesc, setErrorDesc] = useState<{
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

    const handleAddCategory = async () => {
        let hasError = false;
        const errorName = { error: false, text: '' };
        const errorDesc = { error: false, text: '' };
        const errorImage = { error: false, text: '' };

        if (!name?.trim() || name.length < 5) {
            errorName.error = true;
            errorName.text =
                'Category Name must not be empty and length must be at least 5 characters';
            hasError = true;
        }

        if (!desc?.trim() || desc.length < 10) {
            errorDesc.error = true;
            errorDesc.text =
                'Category Description must not be empty and length must be at least 10 characters';
            hasError = true;
        }

        if (!image) {
            errorImage.error = true;
            errorImage.text = 'Please select an image file';
            hasError = true;
        }

        setErrorName(errorName);
        setErrorDesc(errorDesc);
        setErrorImage(errorImage);

        if (hasError) {
            return;
        }

        try {
            setLoading(true);
            const data = {
                name: name,
                description: desc,
                image: uploadImg,
            };
            const res = await fetch(`/api/category/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            // if (res.ok) {
            // }
            const { message } = await res.json();
            setMessRes(message);

            setName(null);
            setDesc(null);
            setImage(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setTriggerAddCate(true);
        }
    };
    return (
        <Dialog
            open={openAddCategory}
            onClose={() => setOpenAddCategory(false)}
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
                {'Add Category'}
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
                    error={errorName?.error}
                    variant="standard"
                    sx={{ width: '70%', marginX: 'auto' }}
                >
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Category Name
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
                    error={errorDesc?.error}
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
                <Button onClick={() => setOpenAddCategory(false)}>
                    Cancel
                </Button>
                <Button onClick={handleAddCategory} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddCategory;
