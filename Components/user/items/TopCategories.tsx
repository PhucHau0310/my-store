'use client';

import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    CircularProgress,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';

interface AllCategories {
    id: number;
    name: string;
    description: string;
    image: string;
    published: boolean;
}

const TopCategories = () => {
    const [rows, setRows] = React.useState<AllCategories[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);

    React.useEffect(() => {
        const getAllCategories = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/category`);
                const data: AllCategories[] = await res.json();

                if (res.ok) {
                    setRows(data);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        getAllCategories();
    }, []);
    return (
        <Box id="direct-container">
            <Typography
                variant="h4"
                color="text.primary"
                sx={{ marginBottom: '25px' }}
            >
                Store Our Top Categories
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
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    rows.map((item, idx) => (
                        <Card key={idx} sx={{ maxWidth: 345, flexShrink: 0 }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={item.image}
                                    alt="green iguana"
                                    sx={{
                                        objectFit: 'cover',
                                        height: '180px',
                                    }}
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            height: '80px',
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            height: '80px',
                                        }}
                                    >
                                        {item.description}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    See More
                                </Button>
                            </CardActions>
                        </Card>
                    ))
                )}
            </Box>
        </Box>
    );
};

export default TopCategories;
