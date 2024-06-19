import {
    Box,
    Breadcrumbs,
    Button,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Container,
    Grid,
    Link,
    Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const AboutUs = () => {
    return (
        <Container maxWidth="lg" sx={{ marginY: '120px' }}>
            <div role="presentation" className="bg-[#f5f5f5] p-3 rounded-lg">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            cursor: 'pointer',
                        }}
                        color="inherit"
                        href={'/'}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        <Typography>Home</Typography>
                    </Link>
                    <Typography
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="text.primary"
                    >
                        <ConnectWithoutContactIcon
                            sx={{ mr: 0.5 }}
                            fontSize="inherit"
                        />
                        About Us
                    </Typography>
                </Breadcrumbs>
            </div>

            <Typography
                sx={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    marginY: '20px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                ABOUT US
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ width: '50%' }}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '45px' }}>
                        Welcome to My Store.
                    </Typography>
                    <Typography>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Nemo nesciunt voluptate incidunt veritatis voluptates
                        quaerat dignissimos! Sapiente quo assumenda, officiis
                        omnis laboriosam architecto at exercitationem adipisci
                        quae quos, debitis placeat.
                    </Typography>

                    <Button sx={{ marginTop: '20px' }} variant="contained">
                        Learn More
                    </Button>
                </Box>

                <img
                    width="50%"
                    src="data:image/png;base64,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"
                    alt="image"
                />
            </Box>

            <Typography
                sx={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    marginTop: '100px',
                    marginBottom: '60px',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                OUR TEAM Members
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
                <Grid
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {Array.from(Array(3)).map((_, index) => (
                        <Grid item xs={2} sm={4} md={4} key={index}>
                            <Card sx={{ maxWidth: 345 }}>
                                <CardMedia
                                    sx={{ height: 280 }}
                                    image="data:image/png;base64,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"
                                    title="avatar member"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        Lizard
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        Founder
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            gap: '10px',
                                            marginTop: '20px',
                                        }}
                                    >
                                        <FacebookIcon
                                            sx={{
                                                padding: '4px',
                                                borderRadius: '999px',
                                                border: '1px solid blue',
                                                width: '40px',
                                                height: '40px',
                                            }}
                                        />
                                        <TwitterIcon
                                            sx={{
                                                padding: '4px',
                                                borderRadius: '999px',
                                                border: '1px solid blue',
                                                width: '40px',
                                                height: '40px',
                                            }}
                                        />
                                        <LinkedInIcon
                                            sx={{
                                                padding: '4px',
                                                borderRadius: '999px',
                                                border: '1px solid blue',
                                                width: '40px',
                                                height: '40px',
                                            }}
                                        />
                                    </Typography>
                                </CardContent>
                                {/* <CardActions>
                                    <Button size="small">Share</Button>
                                    <Button size="small">Learn More</Button>
                                </CardActions> */}
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default AboutUs;
