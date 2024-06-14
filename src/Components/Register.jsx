import { Box, TextField, Typography, Button } from '@mui/material';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Link } from 'react-router-dom';
import './Login.css'
import { supabase } from '../client';
function Register() {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const [formData, setFormData] = useState({
        email:'', fullName:'', password:'', contactNumber:''
    })
    
    function handleChange(event){
        setFormData((prevFormData)=>{
            return{
                ...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    }

    async function handleSubmit(e){
        e.preventDefault()
        try{
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                fullname: formData.fullName,
                password: formData.password,
                contactnumber: formData.contactNumber,
            })
            if(error) throw error

            alert('Check your email for verification link')

        }catch(error){
            alert(error)
        }
    }
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

                    <form onSubmit={handleSubmit}>
                    <Typography variant='h5' sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        color: '#5E6368',
                        marginBottom: '2%'
                    }}>Email</Typography>

                    <TextField variant='outlined' size="medium" label="Enter email" name='email' onChange={handleChange} sx={{
                        width: '98.5%',
                        font: 'Nunito Sans, 12px',
                        marginBottom: '8%'
                    }}>
                    </TextField>

                    <Typography variant='h5' sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        color: '#5E6368',
                        marginBottom: '2%'
                    }}>Full Name</Typography>

                    <TextField variant='outlined' size="medium" label="Enter fullname"  name='fullName' onChange={handleChange} sx={{
                        width: '98.5%',
                        font: 'Nunito Sans, 12px',
                        marginBottom: '8%'
                    }}>
                    </TextField>

                    <Typography variant='h5' sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        color: '#5E6368',
                        marginBottom: '2%'
                    }}>Password</Typography>

                    <TextField
                        name='password' onChange={handleChange} 
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
                        font: 'Nunito Sans, 12px',
                        marginBottom: '8%'
                        }}
                    />

                    <Typography variant='h5' sx={{
                        fontFamily: 'Nunito Sans, sans-serif',
                        color: '#5E6368',
                        marginBottom: '2%'
                    }}>Contact Number</Typography>

                    <TextField variant='outlined' size="medium" label="Enter contact number" name='contactNumber' onChange={handleChange} sx={{
                        width: '98.5%',
                        font: 'Nunito Sans, 12px',
                        marginBottom: '0'
                    }}>
                    </TextField>
                   

                    <Button type='submit' variant="contained" sx={{
                        marginTop: '15%',
                        width: '98%',
                        paddingTop: '4%',
                        paddingBottom: '4%',
                        backgroundColor: '#2CAFA4',
                        fontFamily: 'Nunito Sans, Sans-serif',
                        fontSize: '1.2rem'
                    }}>Create Account</Button>
                     </form>
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
