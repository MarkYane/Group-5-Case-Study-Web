import { Box, Typography, List, ListItem } from '@mui/material';
import './Dashboard.css'
import { useNavigate } from 'react-router-dom';
import DashboardNavigation from './Navigations/DashboardNavigation';
import { supabase } from '../client';
import { useState, useEffect } from 'react';

function Dashboard({ token }) {
    const navigate = useNavigate();
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
    ];
    const [patientCount, setPatientCount] = useState(0);
    const [wardCount, setWardCount] = useState(0);
    const [staffCount, setStaffCount] = useState(0);
    useEffect(() => {
        fetchPatient();
        fetchWard();
        fetchStaff();
    }, []);

    const fetchPatient = async () => {
        try {
            let { count, error } = await supabase
                .from('patients')
                .select('*', { count: 'exact', head: true });

            if (error) {
                alert(error);
            } else {
                setPatientCount(count);
            }
        } catch (error) {
            console.error('Error fetching row count:', error);
        }
    };

    const fetchWard = async () => {
        try {
            let { count, error } = await supabase
                .from('ward')
                .select('*', { count: 'exact', head: true });

            if (error) {
                alert(error);
            } else {
                setWardCount(count);
            }
        } catch (error) {
            console.error('Error fetching row count:', error);
        }
    };
    const fetchStaff = async () => {
        try {
            let { count, error } = await supabase
                .from('staff')
                .select('*', { count: 'exact', head: true });

            if (error) {
                alert(error);
            } else {
                setStaffCount(count);
            }
        } catch (error) {
            console.error('Error fetching row count:', error);
        }
    };
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
                <DashboardNavigation />

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
                        height: '9vh',
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
                                color: 'black',
                                paddingLeft: '7%'
                            }}>Total Patients : {patientCount}</Typography>
                        </Box>

                        <Box className='total'>
                            <div className='chart' id='staffChart'></div>
                            <Typography sx={{
                                fontSize: '1.5rem',
                                fontFamily: 'Nunito Sans, Sans-serif',
                                color: 'black',
                                paddingLeft: '7%'
                            }}>Total Staffs : {staffCount}</Typography>
                        </Box>

                        <Box className='total'>
                            <div className='chart' id='wardChart'></div>
                            <Typography sx={{
                                fontSize: '1.5rem',
                                fontFamily: 'Nunito Sans, Sans-serif',
                                color: 'black',
                                paddingLeft: '7%'
                            }}>Total Wards : {wardCount}</Typography>
                        </Box>

                    </Box>
                    {/* ---- END ----Totality Box */}

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
                    }}>Members</Typography>
                    <List sx={{
                        maxHeight: '33.2vh',
                        width: '99%',
                        paddingTop: 0,
                    }}>
                        {/* Diri mabutang history sa query */}
                        <ListItem sx={{
                            backgroundColor: 'white'
                        }}>
                            <Typography sx={{
                                fontSize: '1.5rem'
                            }}>
                                Ainez Anquillano
                            </Typography>
                        </ListItem>

                        <ListItem sx={{
                            backgroundColor: 'white'
                        }}>
                            <Typography sx={{
                                fontSize: '1.5rem'
                            }}>
                                Richelle Mae Arat
                            </Typography>
                        </ListItem>

                        <ListItem sx={{
                            backgroundColor: 'white'
                        }}>
                            <Typography sx={{
                                fontSize: '1.5rem'
                            }}>
                                Jeany Enterina
                            </Typography>
                        </ListItem>
                        <ListItem sx={{
                            backgroundColor: 'white'
                        }}>
                            <Typography sx={{
                                fontSize: '1.5rem'
                            }}>
                                Jan Ruel G. Nacua
                            </Typography>
                        </ListItem>

                    </List>
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;
