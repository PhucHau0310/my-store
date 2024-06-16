'use client';
import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import BarChartIcon from '@mui/icons-material/BarChart';

const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

interface HeaderProps {
    open: boolean;
    handleDrawerOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ open, handleDrawerOpen }) => {
    return (
        <AppBar
            position="fixed"
            open={open}
            sx={{ backgroundColor: '#f1eee4' }}
        >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                    <MenuIcon sx={{ color: 'black' }} />
                </IconButton>
                <BarChartIcon sx={{ marginRight: '15px', color: 'black' }} />
                <Typography
                    variant="h6"
                    noWrap
                    sx={{ color: 'black' }}
                    component="div"
                >
                    Analytical Board
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
