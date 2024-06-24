import './PatientTab.css';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import DashboardNavigation from './Navigations/DashboardNavigation';
import SearchIcon from '@mui/icons-material/Search';

function PatientTab({ token }) {

  // State variables and filtered versions
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [nextOfKin, setNextOfKin] = useState([]);
  const [filteredNextOfKin, setFilteredNextOfKin] = useState([]);
  const [localDoctors, setLocalDoctors] = useState([]);
  const [filteredLocalDoctors, setFilteredLocalDoctors] = useState([]);

  // State variables for search input values
  const [patientNum, setPatientNum] = useState('');
  const [kinPatientNum, setKinPatientNum] = useState('');
  const [doctorClinicNum, setDoctorClinicNum] = useState('');
  
  // State variables for dialog management
  const [openDialogPatient, setOpenDialogPatient] = useState(false);
  const [dialogTitlePatient, setDialogTitlePatient] = useState('');
  const [formDataPatient, setFormDataPatient] = useState({});

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [medicationList, setMedicationList] = useState([]);
  const [openMedicationDialog, setOpenMedicationDialog] = useState(false);

  const [openDialogNextOfKin, setOpenDialogNextOfKin] = useState(false);
  const [dialogTitleNextOfKin, setDialogTitleNextOfKin] = useState('');
  const [formDataNextOfKin, setFormDataNextOfKin] = useState({});

  const [openDialogLocalDoctor, setOpenDialogLocalDoctor] = useState(false);
  const [dialogTitleLocalDoctor, setDialogTitleLocalDoctor] = useState('');
  const [formDataLocalDoctor, setFormDataLocalDoctor] = useState({});


  // Fetch data on component mount
  useEffect(() => {
    fetchPatients();
    fetchNextOfKin();
    fetchLocalDoctors();
  }, []);

  // Fetch data from supabase
  async function fetchPatients() {
    const { data } = await supabase.from('patients').select('*');
    setPatients(data);
    setFilteredPatients(data);
  }

  async function fetchNextOfKin() {
    const { data } = await supabase.from('next_of_kin').select('*');
    setNextOfKin(data);
    setFilteredNextOfKin(data);    
  }

  async function fetchLocalDoctors() {
    const { data } = await supabase.from('local_doctors').select('*');
    setLocalDoctors(data);
    setFilteredLocalDoctors(data);
  }

  const fetchMedicationList = async (patient_num) => {
    const { data, error } = await supabase
      .from('patient_medication')
      .select('*, patient_medication_list(drug_num)')
      .eq('patient_num', patient_num);

    if (error) {
      console.error('Error fetching medication data:', error);
      return [];
    }

    return data;
  };





  const handlePatientSearch = () => {
    if (patientNum) {
      const filtered = patients.filter(patient => patient.patient_num.toString() === patientNum.toString());
      console.log('Filtered Patients:', filtered); // Debugging statement
      setFilteredPatients(Array.isArray(filtered) ? filtered : []);
    } else {
      setFilteredPatients(patients); // Reset to full list if search is empty
    }
  };

  const handleKinSearch = () => {
    if (kinPatientNum) {
      const filtered = nextOfKin.filter(kin => kin.patient_num.toString() === kinPatientNum.toString());
      console.log('Filtered Next of Kin:', filtered); // Debugging statement
      setFilteredNextOfKin(Array.isArray(filtered) ? filtered : []);
    } else {
      setFilteredNextOfKin(nextOfKin); // Reset to full list if search is empty
    }
  };

  const handleDoctorSearch = () => {
    if (doctorClinicNum) {
      const filtered = localDoctors.filter(doctor => doctor.clinic_num.toString() === doctorClinicNum.toString());
      console.log('Filtered Local Doctors:', filtered); // Debugging statement
      setFilteredLocalDoctors(Array.isArray(filtered) ? filtered : []);
    } else {
      setFilteredLocalDoctors(localDoctors); // Reset to full list if search is empty
    }
  };






  const handleOpenDialogPatient = (title, initialData = {}) => {
    setDialogTitlePatient(title);
    setFormDataPatient({
      patient_num: '',
      first_name: '',
      last_name: '',
      address: '',
      tel_num: '',
      date_of_birth: '',
      sex: '',
      marital_status: '',
      registered_date: '',
      clinic_num: '',
      ...initialData,
    });
    setOpenDialogPatient(true);
    setOpenDialogNextOfKin(false);
  };

  const handleCloseDialogPatient = () => {
    setOpenDialogPatient(false);
    setFormDataPatient({});
  };

  const handleRowClick = async (patient) => {
    setSelectedPatient(patient);
    const medications = await fetchMedicationList(patient.patient_num);
    setMedicationList(medications);
    setOpenMedicationDialog(true);
  };

  const handleCloseMedicationDialog = () => {
    setOpenMedicationDialog(false);
    setSelectedPatient(null);
    setMedicationList([]);
  };




  const handleOpenDialogNextOfKin = (title, initialData = {}) => {
    setDialogTitleNextOfKin(title);
    setFormDataNextOfKin({
      kin_id: '',
      patient_num: '',
      first_name: '',
      last_name: '',
      relationship: '',
      tel_num: '',
      address: '',
      ...initialData,
    });
    setOpenDialogNextOfKin(true);
    setOpenDialogPatient(false);
  };

  const handleCloseDialogNextOfKin = () => {
    setOpenDialogNextOfKin(false);
    setFormDataNextOfKin({});
  };





  const handleOpenDialogLocalDoctor = (title, initialData = {}) => {
    setDialogTitleLocalDoctor(title);
    setFormDataLocalDoctor({
      clinic_num: '',
      first_name: '',
      last_name: '',
      address: '',
      tel_num: '',
      ...initialData,
    });
    setOpenDialogLocalDoctor(true);
    setOpenDialogPatient(false); 
  };

  const handleCloseDialogLocalDoctor = () => {
    setOpenDialogLocalDoctor(false);
    setFormDataLocalDoctor({});
  };





  const handleFormChange = (e) => {
    const { name, value } = e.target;

    if (openDialogPatient) {
      setFormDataPatient((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (openDialogNextOfKin) {
      setFormDataNextOfKin((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    } else if (openDialogLocalDoctor) {
      setFormDataLocalDoctor((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };









  const handleSubmitPatient = async () => {
    console.log("Form Data on Submit:", formDataPatient);

    if (dialogTitlePatient === 'Add Patient') {
      const { error } = await supabase.from('patients').insert([formDataPatient]);
      if (error) {
        console.error('Error inserting patient:', error);
      } else {
        handleCloseDialogPatient();
        fetchPatients(); // Add your logic to fetch patients and update the state
      }
    } else if (dialogTitlePatient === 'Update Patient') {
      const { error } = await supabase.from('patients').update(formDataPatient).eq('patient_num', formDataPatient.patient_num);
      if (error) {
        console.error('Error updating patient:', error);
      } else {
        handleCloseDialogPatient();
        fetchPatients(); // Add your logic to fetch patients and update the state
      }
    } else if (dialogTitlePatient === 'Delete Patient') {
      const { error } = await supabase.from('patients').delete().eq('patient_num', formDataPatient.patient_num);
      if (error) {
        console.error('Error deleting patient:', error);
      } else {
        handleCloseDialogPatient();
        fetchPatients(); // Add your logic to fetch patients and update the state
      }
    }
  };

  const handleSubmitNextOfKin = async () => {
    console.log("Form Data on Submit (Next of Kin):", formDataNextOfKin);

    if (dialogTitleNextOfKin === 'Add Next of Kin') {
      const { error } = await supabase.from('next_of_kin').insert([formDataNextOfKin]);
      if (error) {
        console.error('Error inserting next of kin:', error);
      } else {
        handleCloseDialogNextOfKin();
        fetchNextOfKin(); // Ensure fetchNextOfKin function works as intended
      }
    } else if (dialogTitleNextOfKin === 'Update Next of Kin') {
      const { error } = await supabase.from('next_of_kin').update(formDataNextOfKin).eq('kin_id', formDataNextOfKin.kin_id);
      if (error) {
        console.error('Error updating next of kin:', error);
      } else {
        handleCloseDialogNextOfKin();
        fetchNextOfKin(); // Ensure fetchNextOfKin function works as intended
      }
    } else if (dialogTitleNextOfKin === 'Delete Next of Kin') {
      const { error } = await supabase.from('next_of_kin').delete().eq('kin_id', formDataNextOfKin.kin_id);
      if (error) {
        console.error('Error deleting next of kin:', error);
      } else {
        handleCloseDialogNextOfKin();
        fetchNextOfKin(); // Ensure fetchNextOfKin function works as intended
      }
    }

  };

  const handleSubmitLocalDoctor = async () => {
    console.log("Form Data on Submit (Local Doctor):", formDataLocalDoctor);

    if (dialogTitleLocalDoctor === 'Add Local Doctor') {
      const { error } = await supabase.from('local_doctors').insert([formDataLocalDoctor]);
      if (error) {
        console.error('Error inserting local doctor:', error);
      } else {
        handleCloseDialogLocalDoctor();
        fetchLocalDoctors(); // Ensure fetchLocalDoctors function works as intended
      }
    } else if (dialogTitleLocalDoctor === 'Update Local Doctor') {
      const { error } = await supabase.from('local_doctors').update(formDataLocalDoctor).eq('clinic_num', formDataLocalDoctor.clinic_num);
      if (error) {
        console.error('Error updating local doctor:', error);
      } else {
        handleCloseDialogLocalDoctor();
        fetchLocalDoctors(); // Ensure fetchLocalDoctors function works as intended
      }
    } else if (dialogTitleLocalDoctor === 'Delete Local Doctor') {
      const { error } = await supabase.from('local_doctors').delete().eq('clinic_num', formDataLocalDoctor.clinic_num);
      if (error) {
        console.error('Error deleting local doctor:', error);
      } else {
        handleCloseDialogLocalDoctor();
        fetchLocalDoctors(); // Ensure fetchLocalDoctors function works as intended
      }
    }
  };





  return (
    <>
      <Box sx={{
        maxHeight: '100vh',
        width: '100vw',
        backgroundColor: '#E7F3F5',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
      }}>
        <DashboardNavigation />

        {/* Patient Table */}
        <Box sx={{
          height: '50vh',
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
            width: '100%',
            paddingBottom: '15px'
          }}>
            Patients
          </Typography>

          {/* Buttons & Input */}
          <Box sx={{
            height: '4vh',
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            paddingLeft: '2%',
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
            <Button onClick={() => handleOpenDialogPatient('Add Patient')} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '50%',
              marginTop: '0.5%',
              backgroundColor: '#26ABAA',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Add
            </Button>

            <Button onClick={() => handleOpenDialogPatient('Update Patient')} sx={{
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

            <Button onClick={() => handleOpenDialogPatient('Delete Patient')} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '2%',
              marginRight: '4%',
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
            overflow: 'auto'
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
                {filteredPatients.map((patient) =>
                  <tr key={patient.patient_num} onClick={() => handleRowClick(patient)}>
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
      

        {/* Dialog for Add/Update/Delete Patient */}
        <Dialog open={openDialogPatient} onClose={handleCloseDialogPatient}>
          <DialogTitle>{dialogTitlePatient}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Patient Number"
              type="text"
              fullWidth
              name="patient_num"
              value={formDataPatient.patient_num || ''}
              onChange={handleFormChange}
            />
            {dialogTitlePatient !== 'Delete Patient' && (
              <>
                <TextField
                  margin="dense"
                  label="First Name"
                  type="text"
                  fullWidth
                  name="first_name"
                  value={formDataPatient.first_name || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Last Name"
                  type="text"
                  fullWidth
                  name="last_name"
                  value={formDataPatient.last_name || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Address"
                  type="text"
                  fullWidth
                  name="address"
                  value={formDataPatient.address || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Tel Num"
                  type="text"
                  fullWidth
                  name="tel_num"
                  value={formDataPatient.tel_num || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  name="date_of_birth"
                  value={formDataPatient.date_of_birth || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Sex"
                  type="text"
                  fullWidth
                  name="sex"
                  value={formDataPatient.sex || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Marital Status"
                  type="text"
                  fullWidth
                  name="marital_status"
                  value={formDataPatient.marital_status || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Registered Date"
                  type="date"
                  fullWidth
                  name="registered_date"
                  value={formDataPatient.registered_date || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Clinic Num"
                  type="text"
                  fullWidth
                  name="clinic_num"
                  value={formDataPatient.clinic_num || ''}
                  onChange={handleFormChange}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={handleCloseDialogPatient}>Cancel</Button>
            <Button type='button' onClick={handleSubmitPatient}>Submit</Button>
          </DialogActions>
        </Dialog>

        {/* Medication List Dialog */}
        <Dialog open={openMedicationDialog} onClose={handleCloseMedicationDialog}>
          <DialogTitle>Medication List for {selectedPatient?.first_name} {selectedPatient?.last_name}</DialogTitle>
          <DialogContent>
            {medicationList.length > 0 ? (
              <div style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '20px' }}>
                {medicationList.map((medication) => (
                  <div key={medication.medical_num} style={{ marginBottom: '10px' }}>
                    <p style={{ margin: '0' }}>Drug Number: {medication.drug_num}</p>
                    <p style={{ margin: '0' }}>Units Per Day: {medication.units_per_day}</p>
                    <p style={{ margin: '0' }}>Start Date: {medication.start_date}</p>
                    <p style={{ margin: '0' }}>Finish Date: {medication.finish_date}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ fontFamily: 'Nunito Sans, sans-serif', fontSize: '20px' }}>No medications found.</p>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseMedicationDialog}>Close</Button>
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
            width: '100%',
            paddingBottom: '15px',
            paddingTop: '70px'
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
            <Button onClick={() => handleOpenDialogNextOfKin('Add Next of Kin')} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '50%',
              marginTop: '0.5%',
              backgroundColor: '#26ABAA',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Add
            </Button>
            <Button onClick={() => handleOpenDialogNextOfKin('Update Next of Kin')} sx={{
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
            <Button onClick={() => handleOpenDialogNextOfKin('Delete Next of Kin')} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '2%',
              marginTop: '0.5%',
              marginRight: '4%',
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
            overflow: 'auto'
          }}>
            <table className="content-table">
              <thead>
                <tr>
                  <th>Kin Id</th>
                  <th>Patient Number</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Relationship</th>
                  <th>Tel Num</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {filteredNextOfKin.map((kin) =>
                  <tr key={kin.kin_id}>
                    <td>{kin.kin_id}</td>
                    <td>{kin.patient_num}</td>
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

        {/* Dialog for Add/Update/Delete Next of Kin */}
        <Dialog open={openDialogNextOfKin} onClose={handleCloseDialogNextOfKin}>
          <DialogTitle>{dialogTitleNextOfKin}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Next of Kin ID"
              type="text"
              fullWidth
              name="kin_id"
              value={formDataNextOfKin.kin_id || ''}
              onChange={handleFormChange}
            />
            {dialogTitleNextOfKin !== 'Delete Next of Kin' && (
              <>
                <TextField
                  margin="dense"
                  label="Patient Number"
                  type="text"
                  fullWidth
                  name="patient_num"
                  value={formDataNextOfKin.patient_num || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="First Name"
                  type="text"
                  fullWidth
                  name="first_name"
                  value={formDataNextOfKin.first_name || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Last Name"
                  type="text"
                  fullWidth
                  name="last_name"
                  value={formDataNextOfKin.last_name || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Relationship"
                  type="text"
                  fullWidth
                  name="relationship"
                  value={formDataNextOfKin.relationship || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Tel Num"
                  type="text"
                  fullWidth
                  name="tel_num"
                  value={formDataNextOfKin.tel_num || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Address"
                  type="text"
                  fullWidth
                  name="address"
                  value={formDataNextOfKin.address || ''}
                  onChange={handleFormChange}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={handleCloseDialogNextOfKin}>Cancel</Button>
            <Button type='button' onClick={handleSubmitNextOfKin}>Submit</Button>
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
        {/* Local Doctor Table */}
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
            width: '100%',
            paddingBottom: '15px',
            paddingTop: '100px'
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
              label="Enter clinic number"
              variant="standard"
              value={doctorClinicNum}
              onChange={(e) => setDoctorClinicNum(e.target.value)}
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
            <Button onClick={() => handleOpenDialogLocalDoctor('Add Local Doctor')} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '50%',
              marginTop: '0.5%',
              backgroundColor: '#26ABAA',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Add
            </Button>
            <Button onClick={() => handleOpenDialogLocalDoctor('Update Local Doctor')} sx={{
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
            <Button onClick={() => handleOpenDialogLocalDoctor('Delete Local Doctor')} sx={{
              height: '70%',
              width: '7%',
              marginLeft: '2%',
              marginTop: '0.5%',
              marginRight: '4%',
              backgroundColor: '#FC696A',
              fontFamily: 'Nunito Sans, Sans-serif',
              color: 'white'
            }}>
              Delete
            </Button>
          </Box>

          {/* Display for Local Doctor Table */}
          <Box sx={{
            backgroundColor: 'white',
            height: '37vh',
            width: '100%',
            overflow: 'auto'
          }}>
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
                {filteredLocalDoctors.map((doctor) =>
                  <tr key={doctor.clinic_num}>
                    <td>{doctor.clinic_num}</td>
                    <td>{doctor.first_name}</td>
                    <td>{doctor.last_name}</td>
                    <td>{doctor.tel_num}</td>
                    <td>{doctor.address}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </Box>
        </Box>

        {/* Dialog for Add/Update/Delete Local Doctor */}
        <Dialog open={openDialogLocalDoctor} onClose={handleCloseDialogLocalDoctor}>
          <DialogTitle>{dialogTitleLocalDoctor}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Clinic Number"
              type="text"
              fullWidth
              name="clinic_num"
              value={formDataLocalDoctor.clinic_num || ''}
              onChange={handleFormChange}
            />
            {dialogTitleLocalDoctor !== 'Delete Local Doctor' && (
              <>
                <TextField
                  margin="dense"
                  label="First Name"
                  type="text"
                  fullWidth
                  name="first_name"
                  value={formDataLocalDoctor.first_name || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Last Name"
                  type="text"
                  fullWidth
                  name="last_name"
                  value={formDataLocalDoctor.last_name || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Tel Num"
                  type="text"
                  fullWidth
                  name="tel_num"
                  value={formDataLocalDoctor.tel_num || ''}
                  onChange={handleFormChange}
                />
                <TextField
                  margin="dense"
                  label="Address"
                  type="text"
                  fullWidth
                  name="address"
                  value={formDataLocalDoctor.address || ''}
                  onChange={handleFormChange}
                />
              </>
            )}
          </DialogContent>
          <DialogActions>
            <Button type='button' onClick={handleCloseDialogLocalDoctor}>Cancel</Button>
            <Button type='button' onClick={handleSubmitLocalDoctor}>Submit</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </>
  );
}

export default PatientTab;
