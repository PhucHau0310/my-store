'use client';

import * as React from 'react';
import {
    Badge,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    Menu,
    OutlinedInput,
    Select,
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
import { SignedIn, SignedOut, UserButton, useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const logoStyle = {
    width: '140px',
    height: 'auto',
    cursor: 'pointer',
};

interface AllCategories {
    id: number;
    name: string;
    description: string;
    image: string;
    published: boolean;
}

function Header() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const userClient = useUser();
    const [rows, setRows] = React.useState<AllCategories[]>([]);
    const [categoryType, setCategoryType] = React.useState<
        string | number | null
    >(null);
    const [valueSearch, setValueSearch] = React.useState<string | null>(null);
    const carts = useSelector((state: any) => state.cart);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearch = () => {
        console.log(valueSearch);
    };

    React.useEffect(() => {
        const getAllCategories = async () => {
            try {
                const res = await fetch(`/api/category`);
                const data: AllCategories[] = await res.json();

                if (res.ok) {
                    setRows(data);
                }
            } catch (error) {
                console.log(error);
            }
        };

        getAllCategories();
    }, []);
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
                            <Link href="/">
                                <img
                                    src={
                                        'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                                    }
                                    style={logoStyle}
                                    alt="logo of sitemark"
                                />
                            </Link>
                        </Box>

                        <Box sx={{ minWidth: 200 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">
                                    Categories
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Category"
                                    value={categoryType}
                                    onChange={(e) =>
                                        setCategoryType(e.target.value)
                                    }
                                >
                                    {rows.map((cate, idx) => (
                                        <MenuItem key={idx} value={cate.id}>
                                            {cate.name}
                                        </MenuItem>
                                    ))}
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
                                    <Link href={'/store'}>Store</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem sx={{ py: '6px', px: '12px' }}>
                                <Typography
                                    variant="body1"
                                    color="text.primary"
                                >
                                    <Link href={'/about-us'}>About Us</Link>
                                </Typography>
                            </MenuItem>
                            <MenuItem sx={{ py: '6px', px: '12px' }}>
                                <Typography
                                    variant="body1"
                                    color="text.primary"
                                >
                                    <Link href={'/contact'}> Contact</Link>
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
                                value={valueSearch}
                                onChange={(e) => setValueSearch(e.target.value)}
                                id="outlined-adornment-password"
                                type="text"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="Search"
                                            edge="end"
                                            onClick={handleSearch}
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
                            <SignedOut>
                                <Button
                                    color="primary"
                                    variant="text"
                                    size="small"
                                    component="a"
                                    // href="/sign-in"
                                    // target="_blank"
                                >
                                    <Link href={'/sign-in'}>Sign in</Link>
                                </Button>
                                <Button
                                    color="primary"
                                    variant="contained"
                                    size="small"
                                    component="a"
                                    // href="/sign-up"
                                    // target="_blank"
                                >
                                    <Link href={'/sign-up'}>Sign up</Link>
                                </Button>
                            </SignedOut>
                            <SignedIn>
                                <Typography variant="body1" color="black">
                                    Hi, {userClient.user?.username}
                                </Typography>
                                <UserButton />
                            </SignedIn>
                        </Box>

                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '3px',
                            }}
                        >
                            <Badge badgeContent={carts.length} color="success">
                                <ShoppingCartIcon color="primary" />
                            </Badge>

                            <div>
                                <Button
                                    id="basic-button"
                                    aria-controls={
                                        open ? 'basic-menu' : undefined
                                    }
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    Cart
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                        'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    <MenuItem onClick={handleClose}>
                                        <Link href={'/detail-cart'}>
                                            Detail Carts
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={handleClose}>
                                        <Link href={'/checkout'}>
                                            CheckOuts
                                        </Link>
                                    </MenuItem>
                                </Menu>
                            </div>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </div>
    );
}

export default Header;
