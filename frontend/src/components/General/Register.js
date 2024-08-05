import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Grid, Snackbar, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import AddDataNoToken from "../../hooks/addWithoutToken";
import { useNavigate } from 'react-router-dom';
import sideImage from '../../assets/images/register_car_sharing.jpg';


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [open, setOpen] = useState(false);
    const { createData, loadingCreate, errorCreate } = AddDataNoToken();
    const navigate = useNavigate();
    const [userType, setUserType] = useState('needCar');
    const [age, setAge] = useState(null); // or useState(0);
    const [yearsOfExperience, setYearsOfExperience] = useState(null); // or useState(0);
    const [address, setAddress] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (age < 18) {
            alert('You must be at least 18 years old to register.');
            return;
        }

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        const role = userType === 'needCar' ? 'RENTER' : 'OWNER'; // set role based on userType

        const user = {
            username,
            password,
            name,
            email,
            role,
            age,
            yearsOfExperience,
            address
        };

        console.log(user);

        const url = 'http://localhost:8080/auth/signup';
        await createData(url, user);
        setOpen(true);
        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    return (
        <Grid container justifyContent="flex-end"style={{ height: '100vh' }}>
            <Grid item xs={12} sm={12} md={6}
                  style={{ backgroundImage: `url(${sideImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'left' }} />
            <Grid item xs={12} sm={12} md={6} style={{ padding: '50px' }}>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, ml:3 }}>
                    <RadioGroup
                        aria-label="user type"
                        name="userType"
                        value={userType}
                        onChange={(e) => setUserType(e.target.value)}
                        row
                    >
                        <FormControlLabel value="needCar" control={<Radio />} label="I want a car" />
                        <FormControlLabel value="giveCar" control={<Radio />} label="I can give my car" />
                    </RadioGroup>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        name="name"
                        autoComplete="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="age"
                        label="Age"
                        name="age"
                        autoComplete="age"
                        value={age}
                        onChange={(e) => setAge(Number(e.target.value))}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="yearsOfExperience"
                        label={userType === 'needCar' ? 'Years of Experience as Driver' : 'Years as Owner'}
                        name="yearsOfExperience"
                        autoComplete="years_of_experience"
                        value={yearsOfExperience}
                        onChange={(e) => setYearsOfExperience(Number(e.target.value))}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="address"
                        label="Address"
                        name="address"
                        autoComplete="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
                <Snackbar open={open} autoHideDuration={2000} message="Registration successful!" />
            </Grid>
        </Grid>
    );
};

export default Register;
