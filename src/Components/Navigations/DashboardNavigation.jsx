import './DashboardNavigation.css'
import { Box, Button, Typography} from '@mui/material';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
function DashboardNavigation(){
    let location = useLocation()
    let navigate = useNavigate()
    function handleLogout(){
        sessionStorage.removeItem('token')
        navigate('/')
    }
    const menuItems = [
        {
            text: 'Patients',
            path: '/patients'
        },
        {
            text: 'Staff',
            path: '/staffs'
        },
        {
            text: 'Ward',
            path: '/wards'
        },
        {
            text: 'Supplies',
            path: '/supplies'
        }
    ]
    return(
        <>
                {/* ----- START ------ Sidebar */}
                <Box sx={{
                    height: '100vh',
                    width: '7%',
                    backgroundImage: 'linear-gradient(#2CAFA4, #0194D3)',
                    position: 'fixed',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Button sx={{
                        marginTop: '43%',
                        width: '100%',
                        height: '180px',
                        backgroundColor: location.pathname == '/profile'? 'white' : 'transparent'
                    }}>
                        <Link to='/profile'> 
                            <Typography sx={{
                                color: location.pathname == '/profile'? '#2CAFA4' : '#ffffff'
                            }}>
                            <i className="material-symbols-outlined">
                                person
                            </i>
                            </Typography>
                        </Link>
                    </Button>
                    <Button sx={{
                        marginTop: '30%',
                        width: '100%',
                        height: '180px',
                        backgroundColor: location.pathname == '/dashboard'? 'white' : '#transparent'
                    }}>
                        <Link to='/dashboard'>
                            <Typography sx={{
                                color: location.pathname == '/dashboard'? '#2CAFA4' : '#ffffff'
                            }}>
                            
                                <i className="material-symbols-outlined">
                                    home
                                </i>
                            
                            </Typography>
                        </Link>
                    </Button>
                    <Button onClick={handleLogout} sx={{
                        marginTop: '620%',
                        width: '100%',
                        height: '180px'
                    }}>
                        <Typography sx={{
                            color: '#ffffff'
                        }}>
                        <i className="material-symbols-outlined" id='logout'>
                            logout
                        </i>
                        </Typography>
                    </Button>
                </Box>

                {/* ------ END ----- Sidebar */}
                
                {/* ------ START ------ Navigation Bar */}
                <Box sx={{
                    backgroundColor: 'white',
                    height: '7vh',
                    width: '90%',
                    marginLeft: '12%',
                    marginRight: '5%',
                    marginTop: '3%',
                    display: 'flex'
                    
                }}>

                {menuItems.map(item => (
                    
                    <Button variant='text' 
                    component={Link}
                    to={item.path}
                    sx={{
                        flexGrow: 1,
                        fontFamily: 'Nunito Sans, Sans-serif',
                        fontSize: '1.5rem',
                        color: location.pathname == item.path ? 'white' : 'black',
                        backgroundColor: location.pathname == item.path ? '#26ABAA' : 'white',
                    }}key={item.text}>
                            {item.text}
                    </Button>
                    
                    
                ))}
                </Box>

                {/* ------ END ------ Navigation Bar */}
                
            
        </>
    );
}

export default DashboardNavigation;