'use client';

import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Avatar, Box, Typography } from '@mui/material';
import { useUser } from '@clerk/nextjs';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import CategoryIcon from '@mui/icons-material/Category';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ReduceCapacityIcon from '@mui/icons-material/ReduceCapacity';
import SettingsIcon from '@mui/icons-material/Settings';
import PublicIcon from '@mui/icons-material/Public';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

interface LeftSideBarProps {
    open: boolean;
    handleDrawerClose: () => void;
}

const menu1 = [
    {
        title: 'Dashboard',
        icon: <DashboardIcon />,
        route: '/dashboard',
    },
    {
        title: 'Products',
        icon: <InventoryIcon />,
        route: '/dashboard/products',
    },
    {
        title: 'Categories',
        icon: <CategoryIcon />,
        route: '/dashboard/categories',
    },
    {
        title: 'Coupons',
        icon: <TrendingDownIcon />,
        route: '/dashboard/coupons',
    },
];

const menu2 = [
    {
        title: 'Customers',
        icon: <PeopleAltIcon />,
        route: '/dashboard/customers',
    },
    {
        title: 'Orders',
        icon: <BookmarkBorderIcon />,
        route: '/dashboard/orders',
    },
    {
        title: 'Our Staff',
        icon: <ReduceCapacityIcon />,
        route: '/dashboard/our-staff',
    },
    {
        title: 'Settings',
        icon: <SettingsIcon />,
        route: '/dashboard/settings',
    },
    {
        title: 'International',
        icon: <PublicIcon />,
        route: '/dashboard/international',
    },
];

const LeftSideBar: React.FC<LeftSideBarProps> = ({
    open,
    handleDrawerClose,
}) => {
    const theme = useTheme();
    const userInfo = useUser();
    const router = useRouter();
    const [idxClick, setIdxClick] = useState<number>(-1);

    const handleClickNavigate = (idx: number, itemRoute: string) => {
        setIdxClick(idx);
        router.push(`${itemRoute}`);
    };

    return (
        <Drawer variant="permanent" open={open}>
            <DrawerHeader sx={{ backgroundColor: '#2c2c2c' }}>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'rtl' ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon sx={{ color: 'white' }} />
                    )}
                </IconButton>
            </DrawerHeader>

            <Divider sx={{ backgroundColor: '#515c48' }} />

            <Box
                sx={{
                    alignItems: 'center',
                    px: 0,
                    backgroundColor: '#2c2c2c',
                    paddingY: 1,
                }}
            >
                <img
                    src={
                        'https://assets-global.website-files.com/61ed56ae9da9fd7e0ef0a967/61f12e6faf73568658154dae_SitemarkDefault.svg'
                    }
                    style={{ width: '180px', height: 'auto' }}
                    alt="logo of sitemark"
                />
            </Box>

            <Divider sx={{ backgroundColor: '#515c48' }} />

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    px: 0,
                    backgroundColor: '#2c2c2c',
                    paddingY: 1,
                    paddingLeft: '15px',
                }}
            >
                <Avatar alt="Cindy Baker" src={userInfo.user?.imageUrl ?? ''} />

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        px: 0,
                        backgroundColor: '#2c2c2c',
                        paddingY: 1,
                        marginLeft: '12px',
                    }}
                >
                    <Typography
                        sx={{
                            color: '#bbb7c3',
                            fontSize: '16px',
                            textAlign: 'start',
                            width: '180px',
                            fontWeight: 'bold',
                        }}
                    >
                        {userInfo.user?.username ?? ''}
                    </Typography>
                    <Typography
                        sx={{
                            color: '#bbb7c3',
                            fontSize: '15px',
                            textAlign: 'start',
                            width: '180px',
                        }}
                    >
                        Role: Admin
                    </Typography>
                </Box>
            </Box>

            <List sx={{ backgroundColor: '#2c2c2c' }}>
                {menu1.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton
                            onClick={() =>
                                handleClickNavigate(index, item.route)
                            }
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: `${
                                        idxClick === index
                                            ? '#97865e'
                                            : '#bbb7c3'
                                    } `,
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.title}
                                sx={{
                                    opacity: open ? 1 : 0,
                                    color: `${
                                        idxClick === index
                                            ? '#97865e'
                                            : '#bbb7c3'
                                    } `,
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>

            <Divider sx={{ backgroundColor: '#515c48' }} />

            <List sx={{ backgroundColor: '#2c2c2c' }}>
                {menu2.map((item, index) => (
                    <ListItem
                        key={index}
                        disablePadding
                        sx={{ display: 'block' }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#bbb7c3',
                                }}
                            >
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={item.title}
                                sx={{ opacity: open ? 1 : 0, color: '#bbb7c3' }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default LeftSideBar;
