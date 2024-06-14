import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import './Dashboard.css';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from 'react-router-dom';

function Dashboard() {
    const numb = 4;
    const menuItems = [
        {
            text: 'Patients',
            path: '/patients'
        },
        {
            text: 'Staff',
            path: '/staff'
        },
        {
            text: 'Ward',
            path: '/dashboard/ward'
        },
        {
            text: 'Supplies',
            path: '/supplies'
        }
    ];
    
    return (
        <>
            {/* Whole Container for Dashboard.jsx */}
            <Box sx={{
                height: '100vh',
                width: '100%',
                backgroundColor: '#E7F3F5',
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'flex-start'
            }}>
                {/* ----- START ------ Sidebar */}
                <Box sx={{
                    height: '100vh',
                    width: '7%',
                    backgroundColor: 'white',
                    position: 'fixed',
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Button sx={{ marginTop: '50%' }}>
                        <Typography>
                            <i className="material-symbols-outlined">
                                person
                            </i>
                        </Typography>
                    </Button>
                    <Button sx={{ marginTop: '30%' }}>
                        <Typography>
                            <i className="material-symbols-outlined">
                                home
                            </i>
                        </Typography>
                    </Button>
                    <Button sx={{ marginTop: '620%' }}>
                        <Typography>
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
                        <Button 
                            component={Link} 
                            to={item.path}
                            sx={{
                                flexGrow: 1,
                                fontFamily: 'Nunito Sans, Sans-serif',
                                fontSize: '1.5rem',
                                color: 'black'
                            }} 
                            key={item.text}
                        >
                            {item.text}
                        </Button>
                    ))}
                </Box>
                {/* ------ END ------ Navigation Bar */}

                {/*Dashboard Box  */}
                <Box sx={{ 
                    height: '40vh',
                    width: '50%',
                    backgroundColor: '#E7F3F5',
                    marginLeft: '12%',
                    marginRight: '2%',
                    marginTop: '3%',
                    padding: 0,
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignContent: 'flex-start',
                }}>
                    <Typography variant="h4" sx={{
                        fontFamily: 'Nunito Sans, Sans-Serif',
                        fontWeight: 'bold',
                        marginBottom: '2%'
                    }}>DASHBOARD</Typography>

                    {/* ---- START ---- Totality Box */}
                    <Box sx={{
                        height:'9vh',
                        width: '98%',
                        backgroundColor: 'white',
                        display: 'flex',
                        justifyContent: 'space-evenly'
                    }}>
                        <Box className='total'>
                            <div className='chart' id='patientChart'></div>
                            <Typography sx={{
                                fontSize: '1.5rem',
                                fontFamily: 'Nunito Sans, Sans-serif',
                                color:'black',
                                paddingLeft: '7%'
                            }}>Total Patients : {numb}</Typography>
                        </Box>

                        <Box className='total'>
                            <div className='chart' id='staffChart'></div>
                            <Typography sx={{
                                fontSize: '1.5rem',
                                fontFamily: 'Nunito Sans, Sans-serif',
                                color:'black',
                                paddingLeft: '7%'
                            }}>Total Staffs : {numb}</Typography>
                        </Box>

                        <Box className='total'>
                        <div className='chart' id='wardChart'></div>
                        <Typography sx={{
                                fontSize: '1.5rem',
                                fontFamily: 'Nunito Sans, Sans-serif',
                                color:'black',
                                paddingLeft: '7%'
                            }}>Total Wards : {numb}</Typography>
                        </Box>

                    </Box>
                    {/* ---- END ----Totality Box */}

                    <Box sx={{
                        width: '47%',
                        height: '22vh',
                        backgroundColor: 'white',
                        marginTop: '2%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}>
                        {/* Pie chart for Available Rooms */}
                        <div className='availableChart'></div>               

                    </Box>

                    <Box sx={{
                        width: '47%',
                        height: '22vh',
                        backgroundColor: 'white',
                        marginTop: '2%',
                        marginLeft: '4%',
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center'
                    }}>
                        {/* Pie chart for Available Supplies */}
                        <div className='availableChart'></div> 

                    </Box>
                </Box>
                {/* Recents Box */}
                <Box sx={{
                    height: '37vh',
                    width: '31%',
                    backgroundColor: '#E7F3F5',
                    marginTop: '3.3%',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignContent: 'flex-start',
                    position: 'sticky'
                }}>
                    <Typography variant="h4" sx={{
                        fontFamily: 'Nunito Sans, Sans-Serif',
                        fontWeight: 'bold',
                        marginBottom: '2%',
                        marginRight: '90%'
                    }}>RECENTS</Typography>
                    <List sx={{
                        maxHeight: '33.2vh',
                        overflow: 'auto',
                        width: '99%'
                    }}>
                        {/* Diri mabutang history sa query */}
                        <ListItem sx={{
                            backgroundColor: 'white'
                        }}>
                            <Typography sx={{
                                fontSize: '1.5rem'
                            }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, molestiae? Atque accusantium at excepturi unde velit! Hic nobis animi odio explicabo, maiores voluptatum minima sunt architecto accusantium maxime, veritatis esse.
                            </Typography>
                        </ListItem>

                        <ListItem sx={{
                            backgroundColor: 'white'
                        }}>
                            <Typography sx={{
                                fontSize: '1.5rem'
                            }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, molestiae? Atque accusantium at excepturi unde velit! Hic nobis animi odio explicabo, maiores voluptatum minima sunt architecto accusantium maxime, veritatis esse.
                            </Typography>
                        </ListItem>
                        
                        <ListItem sx={{
                            backgroundColor: 'white'
                        }}>
                            <Typography sx={{
                                fontSize: '1.5rem'
                            }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, molestiae? Atque accusantium at excepturi unde velit! Hic nobis animi odio explicabo, maiores voluptatum minima sunt architecto accusantium maxime, veritatis esse.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{
                            backgroundColor: 'white'
                        }}>
                            <Typography sx={{
                                fontSize: '1.5rem'
                            }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, molestiae? Atque accusantium at excepturi unde velit! Hic nobis animi odio explicabo, maiores voluptatum minima sunt architecto accusantium maxime, veritatis esse.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{
                            backgroundColor: 'white'
                        }}>
                            <Typography sx={{
                                fontSize: '1.5rem'
                            }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, molestiae? Atque accusantium at excepturi unde velit! Hic nobis animi odio explicabo, maiores voluptatum minima sunt architecto accusantium maxime, veritatis esse.
                            </Typography>
                        </ListItem>
                        <ListItem sx={{
                            backgroundColor: 'white'
                        }}>
                            <Typography sx={{
                                fontSize: '1.5rem'
                            }}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, molestiae? Atque accusantium at excepturi unde velit! Hic nobis animi odio explicabo, maiores voluptatum minima sunt architecto accusantium maxime, veritatis esse.
                            </Typography>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;
