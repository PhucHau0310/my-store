import {
    Box,
    Card,
    CardContent,
    SvgIconTypeMap,
    Typography,
} from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface CardProps {
    icons: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
    };
    title: string;
    total: number;
    colorBg: string;
}

const CardSub: React.FC<CardProps> = ({
    icons: IconComponent,
    title,
    total,
    colorBg,
}) => {
    return (
        <Card
            variant="outlined"
            sx={{
                minWidth: '300px',
                backgroundColor: '#f1eee4',
                boxShadow: 'inherit',
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}
                >
                    <IconComponent
                        sx={{
                            color: 'white',
                            width: '40px',
                            height: '40px',
                            marginX: 'auto',
                            display: 'block',
                            backgroundColor: colorBg,
                            padding: '8px',
                            borderRadius: '999px',
                        }}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'start',
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ textAlign: 'center' }}
                            color="text.secondary"
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: 25,
                                color: 'black',
                                textAlign: 'center',
                            }}
                        >
                            {total}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CardSub;
