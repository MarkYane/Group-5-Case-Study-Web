import './Profile.css'
import { Box, Button, Typography} from '@mui/material';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import DashboardNavigation from './Navigations/DashboardNavigation';
import Dog from '../assets/Images/Dog.jpg'
import Cat from '../assets/Images/Cat.jpg'
import Elephant from '../assets/Images/Elephant.jpg'
import Chameleon from '../assets/Images/Chameleon.jpg'
function Profile({token}){
    let location = useLocation()
    let navigate = useNavigate()
    const imageMenu = [Cat, Chameleon, Dog, Elephant]
    const randomIndex = Math.floor(Math.random() * imageMenu.length);

    return(
        <>
            <Box sx={{
                height: '100vh',
                width: '100%',
                backgroundColor: '#E7F3F5',
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'flex-start'
            }}>
                <DashboardNavigation/>
                <Box sx={{ 
                    height: '37vh',
                    width: '83%',
                    backgroundColor: 'white',
                    marginLeft: '12%',
                    marginRight: '2%',
                    marginTop: '3%',
                    padding: 0,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignContent: 'center',
                }}>
                    {/* Random Image Box */}
                    <Box sx={{
                        height: '350px',
                        width: '350px',
                        marginLeft: '5%',
                        backgroundColor: 'white',
                        borderRadius: '50%',
                        padding: 0
                    }}>
                        <img src={imageMenu[randomIndex]} style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                        }}>
                        </img>
                    </Box>
                    <Box sx={{
                        height: '300px',
                        width: '50%',
                        marginLeft: '5%',
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        <Typography variant='h3'sx={{
                            fontFamily: 'Nunito Sans, Sans-serf',
                            color: '#2CAFA4',
                            marginBottom: '3%',
                            marginTop: '4%'
                        }}>Name: {token.user.user_metadata.fullname}</Typography>

                        <Typography variant='h3'sx={{
                            fontFamily: 'Nunito Sans, Sans-serf',
                            color: '#2CAFA4',
                            marginBottom: '3%'
                        }}>Contact Number: {token.user.user_metadata.contactnumber}</Typography>

                        <Typography variant='h3'sx={{
                            fontFamily: 'Nunito Sans, Sans-serf',
                            color: '#2CAFA4',
                            marginBottom: '3%'
                        }}>Email: {token.user.user_metadata.email}</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Profile;