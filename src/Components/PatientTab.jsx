import React, { useState, useEffect } from 'react';
import './PatientTab.css';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { createClient } from '@supabase/supabase-js';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { supabase } from '../client.js';

const PatientTab = () => {
  const [activeMenuItem, setActiveMenuItem] = useState('Patients');
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({
    consultantName: '',
    date: '',
    time: '',
    room: ''
  });

  const menuItems = [
    { text: 'Patients', path: '/patients' },
    { text: 'Staff', path: '/staff' },
    { text: 'Ward', path: '/ward' },
    { text: 'Supplies', path: '/supplies' }
  ];

  // const fetchPatients = async () => {
  //   let { data, error } = await supabase.from('Patients').select('*');
  //   if (error) {
  //     console.error('Error fetching patients:', error);
  //   } else {
  //     setPatients(data);
  //   }
  // };

  async function fetchPatients() {
    const { data } = await supabase
      .from('Patients')
      .select('*')
    setPatients(data)

  }

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleLogout = () => {
    console.log('Logged out');
  };

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const deletePatient = async (id) => {
    let { error } = await supabase.from('Patients').delete().eq('id', id);
    if (error) {
      console.error('Error deleting patient:', error);
    } else {
      fetchPatients();
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentDetails({
      ...appointmentDetails,
      [name]: value
    });
  };

  const handleSubmit = () => {
    console.log('Appointment Details:', appointmentDetails);
    // Add logic to save the appointment
    handleClose();
  };

  return (
    <div className="patient-tab">
      {/* Sidebar */}
      <Box
        sx={{
          height: '100vh',
          width: '100px',
          backgroundImage: 'linear-gradient(#2CAFA4, #0194D3)',
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Button sx={{ marginTop: '50%' }} className="sidebar-icon-button">
          <Typography>
            <i className="material-symbols-outlined sidebar-icon">person</i>
          </Typography>
        </Button>
        <Button sx={{ marginTop: '30%' }} className="sidebar-icon-button">
          <Typography>
            <i className="material-symbols-outlined sidebar-icon">home</i>
          </Typography>
        </Button>
        <Button onClick={handleLogout} sx={{ marginTop: 'auto', marginBottom: '40px' }} className="sidebar-icon-button">
          <Typography>
            <i className="material-symbols-outlined sidebar-icon">logout</i>
          </Typography>
        </Button>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          marginLeft: '100px',
          width: 'calc(100% - 100px)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Top Navigation Bar */}
        <Box
          sx={{
            backgroundColor: 'white',
            padding: '10px',
            boxShadow: 'none',
            marginTop: '3%',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '90%',
            alignSelf: 'center',
            borderRadius: '5px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-around'
            }}
          >
            {menuItems.map((item) => (
              <Button
                key={item.text}
                sx={{
                  fontSize: '1.2rem',
                  color: '#292D32',
                  textDecoration: 'none',
                  textTransform: 'none',
                  borderBottom: '2px solid transparent',
                  paddingBottom: '5px',
                  transition: 'color 0.3s ease, border-color 0.3s ease',
                  borderRadius: '0',
                  borderBottomWidth: '5px',
                  '&:hover': {
                    borderBottomColor: '#2CAFA4',
                    color: '#2CAFA4'
                  },
                  '&.active': {
                    borderBottomColor: '#2CAFA4',
                    color: '#292D32'
                  }
                }}
                className={activeMenuItem === item.text ? 'active' : ''}
                onClick={() => setActiveMenuItem(item.text)}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Buttons */}
        <Box sx={{ padding: '20px', width: '90%', alignSelf: 'center' }}>
          <div className="buttons">
            <button>See All Inpatients</button>
            <button>See All Outpatients</button>
            <button>See Waiting List</button>
            <button onClick={handleOpen}>Set Appointment</button>
          </div>
        </Box>

        {/* Modal for Setting Appointment */}
        <Modal open={open} onClose={handleClose}>
          <Box className="modal-box">
            <Typography variant="h6" component="h2">Set an Appointment</Typography>
            <TextField
              label="Consultant Name"
              name="consultantName"
              value={appointmentDetails.consultantName}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Date"
              name="date"
              type="date"
              value={appointmentDetails.date}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Time"
              name="time"
              type="time"
              value={appointmentDetails.time}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Examination Room"
              name="room"
              value={appointmentDetails.room}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
              <Button variant="contained" onClick={handleSubmit} sx={{ backgroundColor: '#26ABAA' }}>Submit</Button>
              <Button variant="contained" onClick={handleClose} sx={{ backgroundColor: '#FC696A' }}>Cancel</Button>
            </Box>
          </Box>
        </Modal>

        {/* Patient List */}
        <Typography variant="h5" className="patient-list-title" style={{ paddingLeft: '80px', paddingBottom: '10px', color: '#292D32', fontSize: '20px', fontWeight: 'bold' }}>
          PATIENT LIST
        </Typography>
        <Box className="patient-list-container">
          <Box className="search-action-buttons" sx={{ display: 'flex', alignItems: 'center' }}>
            <SearchIcon />
            <TextField
              size="medium"
              id="input-with-sx"
              placeholder="Enter patient number"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ width: '100%', marginRight: '1rem' }}
            />
            <Button
              sx={{
                height: '70%',
                minWidth: '90px', // Adjust width as needed
                backgroundColor: '#26ABAA',
                fontFamily: 'Nunito Sans, Sans-serif',
                color: 'white',
                textTransform: 'none',
                marginLeft: '1rem', // Adjust spacing between buttons
              }}
              onClick={handleSearch}
            >
              Search
            </Button>
            <Button
              sx={{
                height: '70%',
                minWidth: '90px', // Adjust width as needed
                backgroundColor: '#FC696A',
                fontFamily: 'Nunito Sans, Sans-serif',
                color: 'white',
                textTransform: 'none',
                marginLeft: '1rem', // Adjust spacing between buttons
              }}
              onClick={() => deletePatient(selectedPatientId)}
            >
              Delete
            </Button>
          </Box>

          <TableContainer component={Paper} className="patient-list" elevation={0}>
            <Table className="patient-content-table">
              <TableHead>
                <TableRow>
                  <TableCell>Patient Number</TableCell>
                  <TableCell>Full Name</TableCell>
                  <TableCell>Sex</TableCell>
                  <TableCell>Marital Status</TableCell>
                  <TableCell>Next of Kin</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Date of Birth</TableCell>
                  <TableCell>Registered Date</TableCell>
                  <TableCell>See More</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => 
                  <TableRow key={patient.patient_num}>
                    <TableCell>{patient.patient_num}</TableCell>
                    <TableCell>{patient.full_name}</TableCell>
                    <TableCell>{patient.sex}</TableCell>
                    <TableCell>{patient.marital_status}</TableCell>
                    <TableCell>{patient.next_of_kin}</TableCell>
                    <TableCell>{patient.contact_number}</TableCell>
                    <TableCell>{patient.date_of_birth}</TableCell>
                    <TableCell>{patient.registered_date}</TableCell>
                    <TableCell>
                      <IconButton>
                        <MoreHorizIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Box className="pagination">
            <Button>Prev</Button>
            <Typography sx={{ color: '#BFBFBF' }}>1 of 3 Pages</Typography>
            <Button>Next</Button>
          </Box>
        </Box>

      </Box>
    </div>
  );
};

export default PatientTab;
