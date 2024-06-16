import { AccountCircle } from '@mui/icons-material';
import {
    Box,
    Button,
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
} from '@mui/material';

import DescriptionIcon from '@mui/icons-material/Description';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import SpaIcon from '@mui/icons-material/Spa';
import React from 'react';

interface AddProductProps {
    openAddProduct: boolean;
    setOpenAddProduct: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProduct: React.FC<AddProductProps> = ({
    openAddProduct,
    setOpenAddProduct,
}) => {
    return (
        <Dialog
            open={openAddProduct}
            onClose={() => setOpenAddProduct(false)}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
        >
            <DialogTitle id="alert-dialog-title" sx={{ textAlign: 'center' }}>
                {'Add Product'}
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
                        // value={age}
                        // onChange={handleChange}
                    >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <FormControl
                    variant="standard"
                    sx={{ width: '70%', marginX: 'auto' }}
                >
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Product Title / Name
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        }
                    />
                </FormControl>

                <FormControl
                    variant="standard"
                    sx={{ width: '70%', marginX: 'auto' }}
                >
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Description
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <DescriptionIcon />
                            </InputAdornment>
                        }
                        sx={{}}
                    />
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
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <MonetizationOnIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl variant="standard" sx={{ width: '30%' }}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Quantity
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <ProductionQuantityLimitsIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <FormControl variant="standard" sx={{ width: '30%' }}>
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Version
                        </InputLabel>
                        <Input
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SpaIcon />
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </Box>
            </Box>
            <DialogActions>
                <Button onClick={() => setOpenAddProduct(false)}>Cancel</Button>
                <Button onClick={() => setOpenAddProduct(false)} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddProduct;
