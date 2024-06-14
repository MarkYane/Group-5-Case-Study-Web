import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleLogin = () => {
        navigate('/dashboard'); // Navigate to the dashboard directly
    };

    return (
        <Box sx={{
            marginLeft: '50%',
            backgroundImage: 'linear-gradient(#2CAFA4, #0194D3)',
            border: 'none',
            height: '100vh',
            width: '50%',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography variant='h3' sx={{ color: 'white', fontFamily: 'Nunito Sans, sans-serif', fontWeight: 100 }}>Welcome Back!</Typography>
            <Box sx={{
                marginTop: '5%',
                backgroundColor: 'white',
                height: '42vh',
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
                    sx={{
                        width: '98.5%',
                        font: 'Nunito Sans, 12px',
                        marginBottom: '10%'
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
                        font: 'Nunito Sans, 12px'
                    }}
                />
                <Button variant="contained" onClick={handleLogin} sx={{
                    marginTop: '15%',
                    width: '98%',
                    paddingTop: '4%',
                    paddingBottom: '4%',
                    backgroundColor: '#2CAFA4',
                    fontFamily: 'Nunito Sans, Sans-serif',
                    fontSize: '1.2rem'
                }}>Login</Button>
                <Typography variant='h6' sx={{
                    textAlign: 'center',
                    marginTop: '5%',
                    fontFamily: 'Nunito Sans, Sans-serif'
                }}>Don't have an account?</Typography>
                <Link to="/register">
                    <Button variant='text' sx={{
                        marginLeft: '39%',
                        fontFamily: 'Nunito Sans, sans-serif',
                        color: '#2CAFA4'
                    }}>Register here</Button>
                </Link>
            </Box>
        </Box>
    );
}

export default Login;
