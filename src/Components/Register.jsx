import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState('');
    const [password, setPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    };

    const handleRegister = () => {
        if (!email || !fullName || !password || !contactNumber) {
            setError('Please fill in all fields.');
            return;
        }
        if (!validateEmail(email)) {
            setError('Please enter a valid email.');
            return;
        }

        // Simulate registration logic
        if (email && fullName && password && contactNumber) {
            // Assume registration is successful
            navigate('/dashboard');
        } else {
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <>
            <Box sx={{
                marginLeft: '0',
                backgroundImage: 'linear-gradient(#2CAFA4, #0194D3)',
                border: 'none',
                height: '100vh',
                width: '50%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <Typography variant='h3' sx={{ color: 'white', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 100 }}>Register Now!</Typography>
                <Box sx={{
                    marginTop: '5%',
                    backgroundColor: 'white',
                    height: '58vh',
                    width: '45vh',
                    borderRadius: '28px',
                    opacity: 0.8,
                    paddingLeft: '4.5%',
                    paddingTop: '5%',
                    paddingRight: '5%',
                    paddingBottom: '4.5%'
                }}>
                    <Typography variant='h5' sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        color: '#5E6368',
                        marginBottom: '2%'
                    }}>Email</Typography>
                    <TextField
                        variant='outlined'
                        size="medium"
                        label="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            width: '98.5%',
                            font: 'Nunito Sans, 12px',
                            marginBottom: '8%'
                        }}
                    />
                    <Typography variant='h5' sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        color: '#5E6368',
                        marginBottom: '2%'
                    }}>Full Name</Typography>
                    <TextField
                        variant='outlined'
                        size="medium"
                        label="Enter fullname"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        sx={{
                            width: '98.5%',
                            font: 'Nunito Sans, 12px',
                            marginBottom: '8%'
                        }}
                    />
                    <Typography variant='h5' sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        color: '#5E6368',
                        marginBottom: '2%'
                    }}>Password</Typography>
                    <TextField
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        label="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleTogglePassword}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            width: '98.5%',
                            font: 'Nunito Sans, 12px',
                            marginBottom: '8%'
                        }}
                    />
                    <Typography variant='h5' sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        color: '#5E6368',
                        marginBottom: '2%'
                    }}>Contact Number</Typography>
                    <TextField
                        variant='outlined'
                        size="medium"
                        label="Enter contact number"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        sx={{
                            width: '98.5%',
                            font: 'Nunito Sans, 12px',
                            marginBottom: '0'
                        }}
                    />
                    {error && (
                        <Typography variant='body1' sx={{ color: 'red', marginTop: '10px' }}>{error}</Typography>
                    )}
                    <Button variant="contained" onClick={handleRegister} sx={{
                        marginTop: '15%',
                        width: '98%',
                        paddingTop: '4%',
                        paddingBottom: '4%',
                        backgroundColor: '#2CAFA4',
                        fontFamily: 'Nunito Sans, Sans-serif',
                        fontSize: '1.2rem'
                    }}>Create Account</Button>
                    <Typography variant='h6' sx={{
                        textAlign: 'center',
                        marginTop: '5%',
                        fontFamily: 'Nunito Sans, Sans-serif'
                    }}>Already have an account?</Typography>
                    <Link to='/'>
                        <Button variant='text' sx={{
                            marginLeft: '39%',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: '#2CAFA4'
                        }}>Login Here</Button>
                    </Link>
                </Box>
            </Box>
        </>
    );
}

export default Register;
