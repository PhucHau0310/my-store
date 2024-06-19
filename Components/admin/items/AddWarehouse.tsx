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
    Typography,
} from '@mui/material';

import React, { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import LocationCityIcon from '@mui/icons-material/LocationCity';

interface AddProductProps {
    openAddWarehouse: boolean;
    setOpenAddWarehouse: React.Dispatch<React.SetStateAction<boolean>>;
    triggerAddWarehouse: boolean;
    setTriggerAddWarehouse: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddWarehouse: React.FC<AddProductProps> = ({
    openAddWarehouse,
    setOpenAddWarehouse,
    triggerAddWarehouse,
    setTriggerAddWarehouse,
}) => {
    const [name, setName] = useState<string | null>(null);
    const [location, setLocation] = useState<string | null>(null);
    const [errorName, setErrorName] = useState<{
        error: boolean;
        text: string;
    }>();
    const [errorLocation, setErrorLocation] = useState<{
        error: boolean;
        text: string;
    }>();
    const [isLoading, setLoading] = useState<boolean>(false);
    const [messRes, setMessRes] = useState<string | null>(null);

    const handleAddCategory = async () => {
        let hasError = false;
        const errorName = { error: false, text: '' };
        const errorLocation = { error: false, text: '' };

        if (!name?.trim() || name.length < 5) {
            errorName.error = true;
            errorName.text =
                'Warehouse Name must not be empty and length must be at least 5 characters';
            hasError = true;
        }

        if (!location?.trim()) {
            errorLocation.error = true;
            errorLocation.text = 'Warehouse Location must not be empty';
            hasError = true;
        }

        setErrorName(errorName);
        setErrorLocation(errorLocation);

        if (hasError) {
            return;
        }

        try {
            setLoading(true);
            setTriggerAddWarehouse(false);
            const data = {
                name: name,
                location: location,
            };
            const res = await fetch(`/api/warehouse/new`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const { message } = await res.json();
            setMessRes(message);

            setName(null);
            setLocation(null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
            setTriggerAddWarehouse(true);
        }
    };

    return (
        <Dialog
            open={openAddWarehouse}
            onClose={() => setOpenAddWarehouse(false)}
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
                {'Add Warehouse'}
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
                        Warehouse Name
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
                    error={errorLocation?.error}
                    variant="standard"
                    sx={{ width: '70%', marginX: 'auto' }}
                >
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Warehouse Location
                    </InputLabel>
                    <Input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                                <LocationCityIcon />
                            </InputAdornment>
                        }
                        sx={{}}
                    />
                    {errorLocation?.error && (
                        <Typography
                            sx={{
                                paddingTop: '2px',
                                color: 'red',
                            }}
                        >
                            {errorLocation.text}
                        </Typography>
                    )}
                </FormControl>
            </Box>
            <DialogActions>
                <Button onClick={() => setOpenAddWarehouse(false)}>
                    Cancel
                </Button>
                <Button onClick={handleAddCategory} autoFocus>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddWarehouse;
