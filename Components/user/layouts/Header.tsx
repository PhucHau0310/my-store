'use client';

import * as React from 'react';
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputBase,
    InputLabel,
    OutlinedInput,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
};

function Header() {
    const [categories, setCategories] = React.useState('');

    const handleChangeCategory = (event: SelectChangeEvent) => {
        setCategories(event.target.value as string);
    };

    return (
        <div>
            <AppBar
                position="fixed"
                sx={{
                    boxShadow: 0,
                    bgcolor: 'transparent',
                    backgroundImage: 'none',
                    mt: 2,
                }}
            >
                <Container maxWidth="lg">
                    <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexShrink: 0,
                            borderRadius: '999px',
                            paddingY: '40px',
                            bgcolor:
                                theme.palette.mode === 'light'
                                    ? 'rgba(255, 255, 255, 0.4)'
                                    : 'rgba(0, 0, 0, 0.4)',
                            backdropFilter: 'blur(24px)',
                            maxHeight: 40,
                            border: '1px solid',
                            borderColor: 'divider',
                            boxShadow:
                                theme.palette.mode === 'light'
                                    ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                                    : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
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
                                style={logoStyle}
                                alt="logo of sitemark"
                            />
                        </Box>

                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Categories
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={categories}
                                    label="Age"
                                    onChange={handleChangeCategory}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <MenuItem
                                // onClick={}
                                sx={{ py: '6px', px: '12px' }}
                            >
                                <Typography
                                    variant="body1"
                                    color="text.primary"
                                >
                                    Store
                                </Typography>
                            </MenuItem>
                            <MenuItem sx={{ py: '6px', px: '12px' }}>
                                <Typography
                                    variant="body1"
                                    color="text.primary"
                                >
                                    About Us
                                </Typography>
                            </MenuItem>
                            <MenuItem sx={{ py: '6px', px: '12px' }}>
                                <Typography
                                    variant="body1"
                                    color="text.primary"
                                >
                                    Contact
                                </Typography>
                            </MenuItem>
                        </Box>

                        <FormControl
                            sx={{ m: 1, width: '25ch' }}
                            variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-password">
                                Search Product
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type="text"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Search"
                                            edge="end"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>

                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                gap: 0.5,
                                alignItems: 'center',
                            }}
                        >
                            <Button
                                color="primary"
                                variant="text"
                                size="small"
                                component="a"
                                href="/material-ui/getting-started/templates/sign-in/"
                                target="_blank"
                            >
                                Sign in
                            </Button>
                            <Button
                                color="primary"
                                variant="contained"
                                size="small"
                                component="a"
                                href="/material-ui/getting-started/templates/sign-up/"
                                target="_blank"
                            >
                                Sign up
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '2px',
                            }}
                        >
                            <ShoppingCartIcon color="primary" />
                            <Typography variant="h6" color="text.primary">
                                Cart
                            </Typography>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default Header;
