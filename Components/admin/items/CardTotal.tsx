import React from 'react';
import Typography from '@mui/material/Typography';
import { Box, Card, CardContent, SvgIconTypeMap } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface CardProps {
    icons: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
    };
    total: number;
    sub_info?: {
        cash: number;
        card: number;
        credit: number;
    };
    colorBg: string;
    title: string;
}

const CardTotal: React.FC<CardProps> = ({
    icons: IconComponent,
    total,
    sub_info,
    colorBg,
    title,
}) => {
    return (
        <Card
            variant="outlined"
            sx={{ minWidth: '300px', backgroundColor: colorBg }}
        >
            <CardContent>
                <IconComponent
                    sx={{
                        color: 'white',
                        width: '40px',
                        height: '40px',
                        marginX: 'auto',
                        display: 'block',
                    }}
                />
                <Typography
                    variant="h5"
                    component="div"
                    sx={{ color: 'white', textAlign: 'center' }}
                >
                    {title}
                </Typography>
                <Typography
                    sx={{ fontSize: 30, color: 'white', textAlign: 'center' }}
                    color="text.secondary"
                    gutterBottom
                >
                    {total}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                        gap: '3px',
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '3px',
                        }}
                    >
                        <Typography sx={{ fontSize: 18 }} color="white">
                            {sub_info?.cash && 'Cash:'}
                        </Typography>
                        <Typography sx={{ fontSize: 18 }} color="white">
                            {sub_info?.cash}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '3px',
                        }}
                    >
                        <Typography sx={{ fontSize: 18 }} color="white">
                            {sub_info?.card && 'Credit:'}
                        </Typography>
                        <Typography sx={{ fontSize: 18 }} color="white">
                            {sub_info?.card}
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            flexDirection: 'column',
                            gap: '3px',
                        }}
                    >
                        <Typography sx={{ fontSize: 18 }} color="white">
                            {sub_info?.credit && 'Paypal:'}
                        </Typography>
                        <Typography sx={{ fontSize: 18 }} color="white">
                            {sub_info?.credit}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardTotal;
