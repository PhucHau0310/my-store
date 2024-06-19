'use client';

import deliveryAnimation from '@/public/animations/hero-animation.json';
import { Box, Button, Typography } from '@mui/material';
import Lottie from 'react-lottie-player';

const Animation = () => {
    const handleScroll = () => {
        const mainElement = document.getElementById('direct-container');
        if (mainElement) {
            const mainPosition = mainElement.offsetTop;
            window.scrollTo({
                top: mainPosition,
                behavior: 'smooth',
            });
        }
    };
    return (
        <div className="w-full overflow-hidden relative">
            <Lottie
                loop
                animationData={deliveryAnimation}
                play
                className="w-screen"
            />
            <Box
                sx={{
                    position: 'absolute',
                    right: '10%',
                    top: '25%',
                    width: '300px',
                }}
            >
                <Typography variant="h4" color="green">
                    Online Software Products Store .
                </Typography>

                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        marginTop: '10px',
                        width: '150px',
                        height: '50px',
                        borderRadius: '999px',
                    }}
                >
                    <Typography
                        onClick={handleScroll}
                        variant="button"
                        color="white"
                    >
                        Buy Products
                    </Typography>
                </Button>
            </Box>
        </div>
    );
};

export default Animation;
