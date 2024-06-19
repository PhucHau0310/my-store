'use client';

import {
    Box,
    Breadcrumbs,
    Button,
    Container,
    FormControl,
    Input,
    InputAdornment,
    InputLabel,
    Link,
    Typography,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import { AccountCircle } from '@mui/icons-material';
import { useState } from 'react';
import EmailIcon from '@mui/icons-material/Email';
import SubjectIcon from '@mui/icons-material/Subject';
import MessageIcon from '@mui/icons-material/Message';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

const Contact = () => {
    const [name, setName] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [subject, setSubject] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);

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
                        Contact
                    </Typography>
                </Breadcrumbs>
            </div>

            <Typography
                sx={{ fontSize: '30px', fontWeight: 'bold', marginY: '20px' }}
            >
                CONTACT US
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '30px',
                    borderRadius: '18px',
                }}
            >
                <Box
                    sx={{
                        backgroundColor: '#f5f5f5',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingY: '30px',
                    }}
                    component="form"
                    noValidate
                    autoComplete="off"
                    width="60%"
                >
                    <FormControl
                        variant="standard"
                        sx={{
                            width: '70%',
                            marginX: 'auto',
                            marginBottom: '25px',
                        }}
                    >
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Your Name
                        </InputLabel>
                        <Input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            }
                        />
                        {/* {errorName?.error && (
                            <Typography
                                sx={{
                                    paddingTop: '2px',
                                    color: 'red',
                                }}
                            >
                                {errorName.text}
                            </Typography>
                        )} */}
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{
                            width: '70%',
                            marginX: 'auto',
                            marginBottom: '25px',
                        }}
                    >
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Your Email
                        </InputLabel>
                        <Input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <EmailIcon />
                                </InputAdornment>
                            }
                        />
                        {/* {errorName?.error && (
                            <Typography
                                sx={{
                                    paddingTop: '2px',
                                    color: 'red',
                                }}
                            >
                                {errorName.text}
                            </Typography>
                        )} */}
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{
                            width: '70%',
                            marginX: 'auto',
                            marginBottom: '25px',
                        }}
                    >
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Subject
                        </InputLabel>
                        <Input
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <SubjectIcon />
                                </InputAdornment>
                            }
                        />
                        {/* {errorName?.error && (
                            <Typography
                                sx={{
                                    paddingTop: '2px',
                                    color: 'red',
                                }}
                            >
                                {errorName.text}
                            </Typography>
                        )} */}
                    </FormControl>
                    <FormControl
                        variant="standard"
                        sx={{
                            width: '70%',
                            marginX: 'auto',
                            marginBottom: '25px',
                        }}
                    >
                        <InputLabel htmlFor="input-with-icon-adornment">
                            Message
                        </InputLabel>
                        <Input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            id="input-with-icon-adornment"
                            startAdornment={
                                <InputAdornment position="start">
                                    <MessageIcon />
                                </InputAdornment>
                            }
                        />
                        {/* {errorName?.error && (
                            <Typography
                                sx={{
                                    paddingTop: '2px',
                                    color: 'red',
                                }}
                            >
                                {errorName.text}
                            </Typography>
                        )} */}
                    </FormControl>

                    <Button variant="contained">Send Message</Button>
                </Box>

                <Box
                    width="40%"
                    sx={{
                        backgroundColor: '#f5f5f5',
                        borderRadius: '18px',
                        padding: '10px',
                        height: '200px',
                    }}
                >
                    <Box>
                        <LocationOnIcon />
                        <Typography>123 Street, New York, USA</Typography>
                    </Box>
                    <Box>
                        <EmailIcon />
                        <Typography>info@example.com</Typography>
                    </Box>
                    <Box>
                        <LocalPhoneIcon />
                        <Typography>+012 345 67890</Typography>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Contact;
