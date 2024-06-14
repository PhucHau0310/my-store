'use client';

import Lottie from 'react-lottie-player';
import cashBackAnimation from '@/public/animations/cash-back.json';
import { Box, Button, Typography } from '@mui/material';

const CashBack = () => {
    return (
        <div className="w-full bg-[#7ed2e4] flex flex-row items-center justify-between rounded-lg">
            <Box
                sx={{
                    width: '400px',
                    marginLeft: '30px',
                    boxShadow: 'revert',
                }}
            >
                <Typography variant="h3" color="white">
                    Get 5% Cash Back
                </Typography>

                <Typography variant="h6" color="white">
                    on My Store.
                </Typography>

                <Button
                    variant="contained"
                    color="success"
                    sx={{
                        marginTop: '20px',
                        width: '150px',
                        height: '50px',
                        borderRadius: '999px',
                    }}
                >
                    <Typography variant="button" color="white">
                        Learn More
                    </Typography>
                </Button>
            </Box>
            <div className="rounded-br-lg">
                <Lottie
                    loop
                    animationData={cashBackAnimation}
                    play
                    className="w-full h-[400px] overflow-hidden rounded-br-lg"
                />
            </div>
        </div>
    );
};

export default CashBack;
