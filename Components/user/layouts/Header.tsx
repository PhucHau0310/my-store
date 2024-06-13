'use client';

import { useState } from 'react';
import Link from 'next/link';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import {
    Button,
    Container,
    Menu,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import StoreIcon from '@mui/icons-material/Store';
import ContactsIcon from '@mui/icons-material/Contacts';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
    const [categories, setCategories] = useState('');
    const [value, setValue] = useState(0);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleChange = (event: SelectChangeEvent) => {
        setCategories(event.target.value as string);
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        // <nav className="bg-white fixed top-0 left-0 right-0 py-6">
        //     <div className="flex flex-row items-center w-[1400px] bg-orange-200 mx-auto">
        //         <Link
        //             href={'/'}
        //             className="flex flex-row gap-3 items-center w-[15%] cursor-pointer "
        //         >
        //             <ShoppingBasketIcon className="w-10 h-10" />
        //             <h1 className="font-semibold text-2xl text-[#08442e]">
        //                 My Store
        //             </h1>
        //         </Link>

        //         <div className="w-[60%] flex flex-row items-center justify-between">
        //             <div className="w-[40%]">
        //                 <Box minWidth={200}>
        //                     <FormControl fullWidth>
        //                         <InputLabel id="demo-simple-select-label">
        //                             Categories
        //                         </InputLabel>
        //                         <Select
        //                             labelId="demo-simple-select-label"
        //                             id="demo-simple-select"
        //                             value={categories}
        //                             label="Categories"
        //                             onChange={handleChange}
        //                         >
        //                             <MenuItem value={10}>Ten</MenuItem>
        //                             <MenuItem value={20}>Twenty</MenuItem>
        //                             <MenuItem value={30}>Thirty</MenuItem>
        //                         </Select>
        //                     </FormControl>
        //                 </Box>
        //             </div>

        //             <div className="w-[60%]">
        //                 <Box sx={{ width: 350 }}>
        //                     <BottomNavigation
        //                         showLabels
        //                         value={value}
        //                         onChange={(event, newValue) => {
        //                             setValue(newValue);
        //                         }}
        //                     >
        //                         <BottomNavigationAction
        //                             label="Store"
        //                             icon={<StoreIcon />}
        //                         />
        //                         <BottomNavigationAction
        //                             label="About Us"
        //                             icon={<ContactsIcon />}
        //                         />
        //                         <BottomNavigationAction
        //                             label="Contact"
        //                             icon={<Diversity3Icon />}
        //                         />
        //                     </BottomNavigation>
        //                 </Box>
        //             </div>
        //         </div>

        //         <div className="w-[25%] flex flex-row items-center justify-between">
        //             <div className="flex flex-row items-center cursor-pointer ">
        //                 <AccountCircleIcon className="w-8 h-8 mr-2" />

        //                 <div className="text-base font-medium hover:border-b-2 hover:border-b-[#18181a]">
        //                     Sign In
        //                 </div>

        //                 <span className="mx-2">/</span>

        //                 <div className="text-base font-medium hover:border-b-2 hover:border-b-[#18181a]">
        //                     Sign Up
        //                 </div>
        //             </div>

        //             <div className="flex flex-row items-center">
        //                 <ShoppingCartIcon className="w-8 h-8" />
        //                 <div>
        //                     <Button
        //                         id="basic-button"
        //                         aria-controls={open ? 'basic-menu' : undefined}
        //                         aria-haspopup="true"
        //                         aria-expanded={open ? 'true' : undefined}
        //                         onClick={handleClick}
        //                     >
        //                         Cart
        //                     </Button>
        //                     <Menu
        //                         id="basic-menu"
        //                         anchorEl={anchorEl}
        //                         open={open}
        //                         onClose={handleClose}
        //                         MenuListProps={{
        //                             'aria-labelledby': 'basic-button',
        //                         }}
        //                     >
        //                         <MenuItem onClick={handleClose}>
        //                             Detail Cart
        //                         </MenuItem>
        //                         <MenuItem onClick={handleClose}>
        //                             CheckOuts
        //                         </MenuItem>
        //                     </Menu>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </nav>

        <nav className="bg-gray-800 p-4 sticky top-0 left-0 right-0">
            <div className="container mx-auto flex items-center justify-between">
                <Link
                    href={'/'}
                    className="flex flex-row gap-3 items-center w-[15%] cursor-pointer "
                >
                    <ShoppingBasketIcon className="w-10 h-10" />
                    <h1 className="font-semibold text-2xl text-[#08442e]">
                        My Store
                    </h1>
                </Link>

                <Box minWidth={200}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                            Categories
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={categories}
                            label="Categories"
                            onChange={handleChange}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </Box>

                <Box sx={{ width: 350 }}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction
                            label="Store"
                            icon={<StoreIcon />}
                        />
                        <BottomNavigationAction
                            label="About Us"
                            icon={<ContactsIcon />}
                        />
                        <BottomNavigationAction
                            label="Contact"
                            icon={<Diversity3Icon />}
                        />
                    </BottomNavigation>
                </Box>

                <AccountCircleIcon className="w-8 h-8 mr-2" />

                <div className="text-base font-medium hover:border-b-2 hover:border-b-[#18181a]">
                    Sign In
                </div>

                <span className="mx-2">/</span>

                <div className="text-base font-medium hover:border-b-2 hover:border-b-[#18181a]">
                    Sign Up
                </div>

                <ShoppingCartIcon className="w-8 h-8" />
                <div>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
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
                        <MenuItem onClick={handleClose}>Detail Cart</MenuItem>
                        <MenuItem onClick={handleClose}>CheckOuts</MenuItem>
                    </Menu>
                </div>
            </div>
        </nav>
    );
};

export default Header;
