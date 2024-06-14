import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Typography,
} from '@mui/material';

const BestDeal = () => {
    return (
        <Box>
            <Typography
                variant="h4"
                color="text.primary"
                sx={{ marginBottom: '25px', marginTop: '120px' }}
            >
                Today Best Deals For You
            </Typography>
            <Box
                sx={{
                    overflowX: 'scroll',
                    paddingBottom: '40px',
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '24px',
                }}
            >
                <Card sx={{ maxWidth: 345, flexShrink: 0 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            // image="/static/images/cards/contemplative-reptile.jpg"
                            image="data:image/png;base64,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"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate
                                reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            See More
                        </Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345, flexShrink: 0 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            // image="/static/images/cards/contemplative-reptile.jpg"
                            image="data:image/png;base64,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"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate
                                reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            See More
                        </Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345, flexShrink: 0 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            // image="/static/images/cards/contemplative-reptile.jpg"
                            image="data:image/png;base64,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"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate
                                reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            See More
                        </Button>
                    </CardActions>
                </Card>
                <Card sx={{ maxWidth: 345, flexShrink: 0 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            // image="/static/images/cards/contemplative-reptile.jpg"
                            image="data:image/png;base64,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"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                Lizard
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Lizards are a widespread group of squamate
                                reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            See More
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Box>
    );
};

export default BestDeal;
