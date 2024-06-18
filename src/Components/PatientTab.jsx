import './PatientTab.css';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import DashboardNavigation from './Navigations/DashboardNavigation';
import SearchIcon from '@mui/icons-material/Search';

function PatientTab({ token }) {
  const [patients, setPatients] = useState([]);
  const [patientDetails, setPatientDetails] = useState(null);
  const [patientNum, setPatientNum] = useState('');
  const [kinPatientNum, setKinPatientNum] = useState('');
  const [doctorPatientNum, setDoctorPatientNum] = useState('');
  const [nextOfKin, setNextOfKin] = useState([]);
  const [localDoctor, setLocalDoctor] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    const { data } = await supabase.from('patients').select('*');
    setPatients(data);
  }

  async function fetchPatientDetails(patientNumber) {
    const { data, error } = await supabase.from('patients').select('*').eq('patient_num', patientNumber).single();
    if (error) {
      console.error('Error fetching patient details:', error);
    } else {
      setPatientDetails(data);
    }
  }

  async function fetchNextOfKin(patientNumber) {
    const { data } = await supabase.from('next_of_kin').select('*').eq('patient_num', patientNumber);
    setNextOfKin(data);
  }

  async function fetchLocalDoctor(patientNumber) {
    const { data, error } = await supabase.from('local_doctors').select('*').eq('patient_num', patientNumber).single();
    if (error) {
      console.error('Error fetching local doctor:', error);
    } else {
      setLocalDoctor(data);
    }
  }




  const handlePatientSearch = () => {
    fetchPatientsDetails(patientNum);
  };

  const handleKinSearch = () => {
    fetchNextOfKin(kinPatientNum);
  };

  const handleDoctorSearch = () => {
    fetchLocalDoctor(doctorPatientNum);
  };

  const handleOpenDialog = (title, initialData) => {
    setDialogTitle(title);
    setFormData(initialData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({});
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitPatient = async () => {
    const { error } = await supabase.from('patients').insert([formData]);
    if (error) {
      console.error('Error inserting patient:', error);
    } else {
      handleCloseDialog();
      fetchPatients();
    }
  };

  const handleSubmitNextOfKin = async () => {
    const { error } = await supabase.from('next_of_kin').insert([formData]);
    if (error) {
      console.error('Error inserting next of kin:', error);
    } else {
      handleCloseDialog();
      fetchNextOfKin(formData.patient_num);
    }
  };

  const handleSubmitLocalDoctor = async () => {
    const { error } = await supabase.from('local_doctors').insert([formData]);
    if (error) {
      console.error('Error inserting local doctor:', error);
    } else {
      handleCloseDialog();
      fetchLocalDoctor(formData.patient_num);
    }
  };

  const handleUpdatePatient = async () => {
    const { error } = await supabase.from('patients').update(formData).eq('patient_num', formData.patient_num);
    if (error) {
      console.error('Error updating patient:', error);
    } else {
      handleCloseDialog();
      fetchPatients();
    }
  };

  const handleUpdateNextOfKin = async () => {
    const { error } = await supabase.from('next_of_kin').update(formData).eq('patient_num', formData.patient_num);
    if (error) {
      console.error('Error updating next of kin:', error);
    } else {
      handleCloseDialog();
      fetchNextOfKin(formData.patient_num);
    }
  };

  const handleUpdateLocalDoctor = async () => {
    const { error } = await supabase.from('local_doctors').update(formData).eq('patient_num', formData.patient_num);
    if (error) {
      console.error('Error updating local doctor:', error);
    } else {
      handleCloseDialog();
      fetchLocalDoctor(formData.patient_num);
    }
  };

  const handleDeletePatient = async (patientNumber) => {
    const { error } = await supabase.from('patients').delete().eq('patient_num', patientNumber);
    if (error) {
      console.error('Error deleting patient:', error);
    } else {
      fetchPatients();
    }
  };

  const handleDeleteNextOfKin = async (patientNumber) => {
    const { error } = await supabase.from('next_of_kin').delete().eq('patient_num', patientNumber);
    if (error) {
      console.error('Error deleting next of kin:', error);
    } else {
      fetchNextOfKin(patientNumber);
    }
  };

  const handleDeleteLocalDoctor = async (patientNumber) => {
    const { error } = await supabase.from('local_doctors').delete().eq('patient_num', patientNumber);
    if (error) {
      console.error('Error deleting local doctor:', error);
    } else {
      fetchLocalDoctor(patientNumber);
    }
  };






  return (
    <>
      <Box sx={{
        maxHeight: '1000vh',
        width: '100%',
        backgroundColor: '#E7F3F5',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
      }}>
        <DashboardNavigation />

        {/* Patient Table */}
        <Box sx={{
          height: '45vh',
          width: '83%',
          backgroundColor: 'white',
          marginLeft: '12%',
          marginRight: '2%',
          marginTop: '2%',
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          border: '0px solid black'
        }}>
          <Typography variant='h4' sx={{
            fontFamily: 'Nunito Sans, Sans-serif',
            marginBottom: '1%',
            fontWeight: 'bold',
            backgroundColor: '#E7F3F5',
            width: '100%'
          }}>
            Patients
          </Typography>
          {/* Buttons & Input */}
          <Box sx={{
            height: '4vh',
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            paddingLeft: '2%'
          }}>
            <SearchIcon sx={{ color: 'action.active', mr: 0, my: 2.6 }} />
            <TextField
              size='medium'
              id="input-with-sx"
              label="Enter patient number"
              variant="standard"
              value={patientNum}
              onChange={(e) => setPatientNum(e.target.value)}
            />

            <Button onClick={handlePatientSearch} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '2%',
              marginTop: '0.5%',
              backgroundColor: '#26ABAA',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Search
            </Button>
            <Button onClick={() => handleOpenDialog('Add Patient', {
              patient_num: '',
              first_name: '',
              last_name: '',
              address: '',
              tel_num: '',
              date_of_birth: '',
              sex: '',
              marital_status: '',
              registered_date: '',
              clinic_num: ''
            })} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '54%',
              marginTop: '0.5%',
              backgroundColor: '#26ABAA',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Add
            </Button>

            <Button onClick={() => handleOpenDialog('Update Patient', {
              patient_num: '',
              first_name: '',
              last_name: '',
              address: '',
              tel_num: '',
              date_of_birth: '',
              sex: '',
              marital_status: '',
              registered_date: '',
              clinic_num: ''
            })} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '2%',
              marginTop: '0.5%',
              backgroundColor: '#26ABAA',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Update
            </Button>

            <Button onClick={handleDeletePatient} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '2%',
              marginTop: '0.5%',
              backgroundColor: '#FC696A',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Delete
            </Button>
          </Box>

          {/* Display for Patient Table */}
          <Box sx={{
            backgroundColor: 'white',
            height: '37vh',
            width: '100%',
          }}>
            <table className="content-table">
              <thead>
                <tr>
                  <th>Patient Number</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Sex</th>
                  <th>Date of Birth</th>
                  <th>Tel Num</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient) =>
                  <tr key={patient.patient_num}>
                    <td>{patient.patient_num}</td>
                    <td>{patient.first_name}</td>
                    <td>{patient.last_name}</td>
                    <td>{patient.sex}</td>
                    <td>{patient.date_of_birth}</td>
                    <td>{patient.tel_num}</td>
                    <td>{patient.address}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
        </Box>
      

      {/* Dialog for Add/Update Patient */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Patient Number"
            type="text"
            fullWidth
            name="patient_num"
            value={formData.patient_num}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="First Name"
            type="text"
            fullWidth
            name="first_name"
            value={formData.first_name}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Last Name"
            type="text"
            fullWidth
            name="last_name"
            value={formData.last_name}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Address"
            type="text"
            fullWidth
            name="address"
            value={formData.address}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Tel Num"
            type="text"
            fullWidth
            name="tel_num"
            value={formData.tel_num}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Date of Birth"
            type="date"
            fullWidth
            name="date_of_birth"
            value={formData.date_of_birth}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Sex"
            type="text"
            fullWidth
            name="sex"
            value={formData.sex}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Marital Status"
            type="text"
            fullWidth
            name="marital_status"
            value={formData.marital_status}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Registered Date"
            type="date"
            fullWidth
            name="registered_date"
            value={formData.registered_date}
            onChange={handleFormChange}
          />
          <TextField
            margin="dense"
            label="Clinic Num"
            type="text"
            fullWidth
            name="clinic_num"
            value={formData.clinic_num}
            onChange={handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmitPatient}>Submit</Button>
        </DialogActions>
      </Dialog>
      </Box>






      <Box sx={{
        maxHeight: '1000vh',
        width: '100%',
        backgroundColor: '#E7F3F5',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
      }}>
        {/* Next Of Kin Table */}
        <Box sx={{
          height: '45vh',
          width: '83%',
          backgroundColor: 'white',
          marginLeft: '12%',
          marginRight: '2%',
          marginTop: '2%',
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          border: '0px solid black'
        }}>
          <Typography variant='h4' sx={{
            fontFamily: 'Nunito Sans, Sans-serif',
            marginBottom: '1%',
            fontWeight: 'bold',
            backgroundColor: '#E7F3F5',
            width: '100%'
          }}>
            Next Of Kin Details
          </Typography>

          {/* Buttons & Input */}
          <Box sx={{
            height: '4vh',
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            paddingLeft: '2%'
          }}>
            <SearchIcon sx={{ color: 'action.active', mr: 0, my: 2.6 }} />
            <TextField
              size='medium'
              id="input-with-sx"
              label="Enter patient number"
              variant="standard"
              value={kinPatientNum}
              onChange={(e) => setKinPatientNum(e.target.value)}
            />

            <Button onClick={handleKinSearch} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '2%',
              marginTop: '0.5%',
              backgroundColor: '#26ABAA',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Search
            </Button>
            <Button onClick={() => handleOpenDialog('Add Next of Kin', {
              kin_id: '',
              patient_num: '',
              first_name: '',
              last_name: '',
              relationship: '',
              address: '',
              tel_num: ''
            })} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '54%',
              marginTop: '0.5%',
              backgroundColor: '#26ABAA',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Add
            </Button>
            <Button sx={{
              height: '70%',
              width: '7%',
              marginLeft: '2%',
              marginTop: '0.5%',
              backgroundColor: '#26ABAA',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Update
            </Button>
            <Button sx={{
              height: '70%',
              width: '7%',
              marginLeft: '2%',
              marginTop: '0.5%',
              backgroundColor: '#FC696A',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Delete
            </Button>
          </Box>

          {/* Display for Next Of Kin Table */}
          <Box sx={{
            backgroundColor: 'white',
            height: '37vh',
            width: '100%',
          }}>
            <table className="content-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Relationship</th>
                  <th>Tel Num</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {nextOfKin.map((kin) =>
                  <tr key={kin.next_of_kin_num}>
                    <td>{kin.first_name}</td>
                    <td>{kin.last_name}</td>
                    <td>{kin.relationship}</td>
                    <td>{kin.tel_num}</td>
                    <td>{kin.address}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
        </Box>
      </Box>










      <Box sx={{
        maxHeight: '1000vh',
        width: '100%',
        backgroundColor: '#E7F3F5',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
      }}>
        {/* Local Doctors Table */}
        <Box sx={{
          height: '45vh',
          width: '83%',
          backgroundColor: 'white',
          marginLeft: '12%',
          marginRight: '2%',
          marginTop: '2%',
          padding: 0,
          display: 'flex',
          flexWrap: 'wrap',
          alignContent: 'flex-start',
          border: '0px solid black'
        }}>
          <Typography variant='h4' sx={{
            fontFamily: 'Nunito Sans, Sans-serif',
            marginBottom: '1%',
            fontWeight: 'bold',
            backgroundColor: '#E7F3F5',
            width: '100%'
          }}>
            Local Doctor Details
          </Typography>

          {/* Buttons & Input */}
          <Box sx={{
            height: '4vh',
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            paddingLeft: '2%'
          }}>
            <SearchIcon sx={{ color: 'action.active', mr: 0, my: 2.6 }} />
            <TextField
              size='medium'
              id="input-with-sx"
              label="Enter patient number"
              variant="standard"
              value={doctorPatientNum}
              onChange={(e) => setDoctorPatientNum(e.target.value)}
            />

            <Button onClick={handleDoctorSearch} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '2%',
              marginTop: '0.5%',
              backgroundColor: '#26ABAA',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Search
            </Button>
            <Button onClick={() => handleOpenDialog('Add Local Doctor', {
              clinic_num: '',
              first_name: '',
              last_name: '',
              address: '',
              tel_num: ''
            })} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '54%',
              marginTop: '0.5%',
              backgroundColor: '#26ABAA',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Add
            </Button>
            <Button sx={{
              height: '70%',
              width: '7%',
              marginLeft: '2%',
              marginTop: '0.5%',
              backgroundColor: '#26ABAA',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Update
            </Button>
            <Button sx={{
              height: '70%',
              width: '7%',
              marginLeft: '2%',
              marginTop: '0.5%',
              backgroundColor: '#FC696A',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Delete
            </Button>
          </Box>

          {/* Display for Local Doctors Table */}
          <Box sx={{
            backgroundColor: 'white',
            height: '37vh',
            width: '100%',
          }}>
            {localDoctor ? (
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Clinic Number</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Tel Num</th>
                    <th>Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={localDoctor.clinic_num}>
                    <td>{localDoctor.clinic_num}</td>
                    <td>{localDoctor.first_name}</td>
                    <td>{localDoctor.last_name}</td>
                    <td>{localDoctor.tel_num}</td>
                    <td>{localDoctor.address}</td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <Typography variant='h6' sx={{
                fontFamily: 'Nunito Sans, Sans-serif',
                marginTop: '2%',
                width: '100%',
                textAlign: 'center'
              }}>
                No local doctor details found.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      {/* <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          {Object.keys(formData).map((key) => (
            <TextField
              key={key}
              margin="dense"
              label={key.replace(/_/g, ' ')}
              type="text"
              fullWidth
              name={key}
              value={formData[key]}
              onChange={handleFormChange}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleSubmit} color="primary">Submit</Button>
        </DialogActions>
      </Dialog> */}
    </>
  );
}

export default PatientTab;
