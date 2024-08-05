import * as React from 'react';
import {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import useAuthorization from "../../hooks/useAuthorization";



const defaultTheme = createTheme();


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://www.unipi.gr/unipi/el/">
                University of Piraeus
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


export default function SignIn() {

    const [credential, setCredential] = useState(null);
    const { isLoggedIn, authorize } = useAuthorization();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const username = data.get('username');
        const password = data.get('password');

        authorize(username, password);

        if (isLoggedIn) {
            const role = localStorage.getItem('role')
            if (role === 'RENTER') {
                navigate('/renter');
            } else if (role === 'OWNER') {
                navigate('/owner');
            }
        }

    };

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/');
        }
    }, [isLoggedIn]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            // href={getSocialLoginUrl('google')}
                        >
                            Sign In
                        </Button>
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            sx={{ mt: 1, mb: 4 }}
                        >
                        </Grid>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>

    );
}
