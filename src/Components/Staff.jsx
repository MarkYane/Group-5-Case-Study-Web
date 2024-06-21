import './Staff.css'
import { Box, Button, TextField, Typography, Modal } from '@mui/material';

import DashboardNavigation from './Navigations/DashboardNavigation';
import SearchIcon from '@mui/icons-material/Search';
import { supabase } from '../client';
import { useState, useEffect } from 'react';


function staff({token}){
   const [staff, setstaff] = useState([]);
   const [qualification, setqualification] = useState([]);
   const [WorkExperience, setWorkExperience] = useState([]);
   const [EmploymentContract, setEmploymentContract] = useState([]);
   const [staffAllocation, setstaffAllocation] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [open, setOpen] = useState({
      staff: false,
      qualification: false,
      WorkExperience: false,
      EmploymentContract: false,
      staffAllocation: false,
      deletestaff: false,
      deletequalification: false,
      deleteWorkExperience: false,
      deleteEmploymentContract: false,
      deletestaffAllocation: false,
      updatestaff: false,
      updatequalification: false,
      updateWorkExperience: false,
      updateEmploymentContract: false,
      updatestaffAllocation: false,
   });
   const [newstaff, setNewstaff] = useState({
      staff_num: '',
      first_name: '',
      last_name: '',
      address: '',
      telephone_number: '',
      date_of_birth: '',
      sex: '',
      nin: '',
   });
   const [newqualification, setNewqualification] = useState({
      staff_num: '',
      date_of_qualification: '',
      type: '',
      name_of_institution: '',
      
   });
   const [newWorkExperience, setNewWorkExperience] = useState({
      staff_num: '',
      start_date: '',
      finish_date: '',
      position: '',
      name_of_org: '',
   });
   const [newEmploymentContract, setNewEmploymentContract] = useState({
      staff_num: '',
      work_hours: '',
      type_of_contract: '',
      type_of_salary_payment: '',
      
   });
   const [newstaffAllocation, setNewstaffAllocation] = useState({
      staff_num: '',
      ward_num: '',
      shift: '',
     
   });




   const [deleteIdentifier, setDeleteIdentifier] = useState('');
   const [updatestaff, setUpdatestaff] = useState({
      staff_num: '',
      first_name: '',
      last_name: '',
      address: '',
      telephone_number: '',
      date_of_birth: '',
      sex: '',
      nin: '',
   });
   const [updatequalification, setUpdatequalification] = useState({
      staff_num: '',
      date_of_qualification: '',
      type: '',
      name_of_institution: '',
   });
   const [updateWorkExperience, setUpdateWorkExperience] = useState({
      staff_num: '',
      start_date: '',
      finish_date: '',
      position: '',
      name_of_org: '',
   });
   const [updateEmploymentContract, setUpdateEmploymentContract] = useState({
      staff_num: '',
      work_hours: '',
      type_of_contract: '',
      type_of_salary_payment: '',
      
   });
   const [updatestaffAllocation, setUpdatestaffAllocation] = useState({
      staff_num: '',
      ward_num: '',
      shift: '',
   });
   const [searchInput, setSearchInput] = useState({
      staff: '',
      qualification: '',
      WorkExperience: '',
      EmploymentContract: '',
      staffAllocation: '',  
   });

 
  
   useEffect(() => {
     fetchstaff()
   }, []);

   async function fetchstaff() {
      setLoading(true);
      try {
         const { data: staffData, error: staffError } = await supabase
            .from('staff')
            .select('*');
         if (staffError) throw staffError;

         const { data: qualificationData, error: qualificationError } = await supabase
            .from('qualification')
            .select('*');
         if (qualificationError) throw qualificationError;

         const { data: WorkExperienceData, error: WorkExperienceError } = await supabase
            .from('work_experience')
            .select('*');
         if (WorkExperienceError) throw WorkExperienceError;
         
         const { data: EmploymentContractData, error: EmploymentContractError } = await supabase
            .from('employment_contract')
            .select('*');
         if (EmploymentContractError) throw EmploymentContractError;

         const { data: staffAllocationData, error: staffAllocationError } = await supabase
            .from('staff_allocation')
            .select('*');
         if (staffAllocationError) throw staffAllocationError;

         setstaff(staffData);
         setqualification(qualificationData);
         setWorkExperience(WorkExperienceData);
         setEmploymentContract(EmploymentContractData);
         setstaffAllocation(staffAllocationData);
      } catch (error) {
         setError(error.message);
      } finally {
         setLoading(false);
      }
   }

   const handleOpen = (type) => setOpen({ ...open, [type]: true });
   const handleClose = (type) => setOpen({ ...open, [type]: false });
   

   const handleSubmitstaff = async () => {
      try {
         const { data, error } = await supabase
            .from('staff')
            .insert([newstaff]);
         if (error) throw error;
         fetchstaff();
         handleClose('staff');
      } catch (error) {
         setError(error.message);
      }
   };

   const handleSubmitqualification = async () => {
      try {
         const { data, error } = await supabase
            .from('qualification')
            .insert([newqualification]);
         if (error) throw error;
         fetchstaff();
         handleClose('qualification');
      } catch (error) {
         setError(error.message);
      }
   };

   const handleSubmitWorkExperience = async () => {
      try {
         const { data, error } = await supabase
            .from('work_experience')
            .insert([newWorkExperience]);
         if (error) throw error;
         fetchstaff();
         handleClose('WorkExperience');
      } catch (error) {
         setError(error.message);
      }
   };
   const handleSubmitEmploymentContract= async () => {
      try {
         const { data, error } = await supabase
            .from('employment_contract')
            .insert([newEmploymentContract]);
         if (error) throw error;
         fetchstaff();
         handleClose('EmploymentContract');
      } catch (error) {
         setError(error.message);
      }
   };
   const handleSubmitstaffAllocation = async () => {
      try {
         const { data, error } = await supabase
            .from('staff_allocation')
            .insert([newStaffAllocation]);
         if (error) throw error;
         fetchstaff();
         handleClose('StaffAllocation');
      } catch (error) {
         setError(error.message);
      }
   };
   const handleDelete = async (type) => {
      try {
         let table;
         let identifier;

         switch (type) {
            case 'staff':
               table = 'staff';
               identifier = 'staff_num';
               break;
            case 'qualification':
               table = 'qualification';
               identifier = 'staff_num';
               break;
            case 'WorkExperience':
               table = 'work_experience';
               identifier = 'staff_num';
               break;
            case 'EmploymentContract':
               table = 'employment_contract';
               identifier = 'staff_num';
               break;
            case 'StaffAllocation':
               table = 'staff_allocation';
               identifier = 'staff_num';
               break;
            default:
               throw new Error('Invalid type');
         }

         const { error } = await supabase
            .from(table)
            .delete()
            .eq(identifier, deleteIdentifier);

         if (error) throw error;

         fetchstaff();
         handleClose(`delete${type.charAt(0).toUpperCase() + type.slice(1)}`);
      } catch (error) {
         setError(error.message);
      }
   };

   const handleSubmitUpdatestaff = async () => {
      try {
         const { error } = await supabase
            .from('staff')
            .update(updatestaff)
            .eq('staff_num', updatestaff.staff_num);

         if (error) throw error;

         fetchstaff();
         handleClose('updatestaff');
      } catch (error) {
         setError(error.message);
      }
   };

   const handleSubmitUpdatequalification = async () => {
      try {
         const { error } = await supabase
            .from('qualification')
            .update(updatequalification)
            .eq('staff_num', updatequalification.staff_num);

         if (error) throw error;

         fetchstaff();
         handleClose('updatequalification');
      } catch (error) {
         setError(error.message);
      }
   };

   const handleSubmitUpdateWorkExperience = async () => {
      try {
         const { error } = await supabase
            .from('work_experience')
            .update(updateWorkExperience)
            .eq('staff_num', updateWorkExperience.staff_num);

         if (error) throw error;

         fetchstaff();
         handleClose('updateWorkExperience');
      } catch (error) {
         setError(error.message);
      }
   };

   const handleSubmitUpdateEmploymentContract = async () => {
      try {
         const { error } = await supabase
            .from('employment_contract')
            .update(updateEmploymentContract)
            .eq('staff_num', updateEmploymentContract.staff_num);

         if (error) throw error;

         fetchstaff();
         handleClose('updateEmploymentContract');
      } catch (error) {
         setError(error.message);
      }
   };

   const handleSubmitUpdatestaffAllocation = async () => {
      try {
         const { error } = await supabase
            .from('staff_allocation')
            .update(updatestaffAllocation)
            .eq('staff_num', updatestaffAllocation.staff_num);

         if (error) throw error;

         fetchstaff();
         handleClose('updatestaffAllocation');
      } catch (error) {
         setError(error.message);
      }
   };







    return(
        <>
            <Box sx={{
                maxHeight: '1000vh',
                width: '100%',
                backgroundColor: '#E7F3F5',
                display: 'flex',
                flexWrap: 'wrap',
                alignContent: 'flex-start'
            }}>

                <DashboardNavigation/>
            
                {/* staff Table */}
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
                    <Typography variant='h4'sx={{
                        fontFamily: 'Nunito Sans, Sans-serif',
                        marginBottom: '1%',
                        fontWeight: 'bold',
                        backgroundColor: '#E7F3F5',
                        width: '100%'
                    }}>
                        staff
                    </Typography>
                    {/* Buttons & Input */}
                    <Box sx={{
                        height: '4vh',
                        width: '100%',
                        backgroundColor: 'white',
                        display: 'flex',
                        paddingLeft: '2%'
                    }}>
                         <SearchIcon sx={{ color: 'action.active', mr: 0, my: 2.6}} />
                         <TextField size='medium' id="input-with-sx" label="Enter staff number" variant="standard" />

                         <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#26ABAA',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Search
                         </Button>
                         <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '54%',
                            marginTop: '0.5%',
                            backgroundColor:'#26ABAA',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Add
                         </Button>
                         <Button
                           onClick={() => handleOpen('updatestaff')}
                           sx={{
                              height: '70%',
                              width: '7%',
                              marginLeft: '2%',
                              marginTop: '0.5%',
                              backgroundColor:'#26ABAA',
                              fontFamily: 'Nunito Sans, Sans-serif',
                              color: 'white'
                         }}>
                            Update
                         </Button>
                         <Button 
                           onClick={() => handleOpen('deletestaff')}
                           sx={{
                              height: '70%',
                              width: '7%',
                              marginLeft: '2%',
                              marginTop: '0.5%',
                              backgroundColor:'#FC696A',
                              fontFamily: 'Nunito Sans, Sans-serif',
                              color: 'white'
                           }}
                        >
                            Delete
                        </Button>
                    </Box>
                    
                    {/* Display for staff stable */}

                    <Box sx={{
                        backgroundColor: 'white',
                        height: '37vh',
                        width: '100%',  
                     }}
                     >
                        {loading ? (
                           <Typography variant='h6'>Loading...</Typography>
                        ) : error ? (
                           <Typography variant='h6' color='error'>
                              {error}
                           </Typography>
                        ) : (
                         <table className="staff-content-table">
                        <thead>
                           <tr>
                              <th>staff Number</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Sex</th>
                              <th>Date of Birth</th>
                              <th>Tel Num</th>
                              <th>Nin</th>
                              <th>Address</th>
                           </tr>
                        </thead>

                        <tbody>
                           {staff.map((staff) => (
                           <tr key={staff.staff_num}>
                              <td>{staff.staff_num}</td>
                              <td>{staff.first_name}</td>
                              <td>{staff.last_name}</td>
                              <td>{staff.sex}</td>
                              <td>{staff.date_of_birth}</td>
                              <td>{staff.telephone_number}</td>
                              <td>{staff.nin}</td>
                              <td>{staff.address}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               )}
            </Box>
         </Box>
         
         <Modal
            open={open.staff}
            onClose={() => handleClose('staff')}
            aria-labelledby='add-staff-modal'
            aria-describedby='modal-to-add-new-staff'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography id='add-staff-modal' variant='h6' component='h2'>
                  Add New Staff
               </Typography>
               <TextField
                  label='Staff Number'
                  variant='outlined'
                  fullWidth
                  name='staff_num'
                  value={newstaff.staff_num}
                  onChange={(e) => handleChange(e, setNewstaff)}
                  margin='normal'
               />
               <TextField
                  label='First Name'
                  variant='outlined'
                  fullWidth
                  name='first_name'
                  value={newstaff.first_name}
                  onChange={(e) => handleChange(e, setNewstaff)}
                  margin='normal'
               />
               <TextField
                  label='Last Name'
                  variant='outlined'
                  fullWidth
                  name='last_name'
                  value={newstaff.last_name}
                  onChange={(e) => handleChange(e, setNewstaff)}
                  margin='normal'
               />
               <TextField
                  label='Address'
                  variant='outlined'
                  fullWidth
                  name='address'
                  value={newstaff.address}
                  onChange={(e) => handleChange(e, setNewstaff)}
                  margin='normal'
               />
               <TextField
                  label='Tel No.'
                  variant='outlined'
                  fullWidth
                  name='telephone_number'
                  value={newstaff.telephone_number}
                  onChange={(e) => handleChange(e, setNewstaff)}
                  margin='normal'
               />
               <TextField
                  label='Birthdate '
                  variant='outlined'
                  fullWidth
                  name='date_of_birth'
                  value={newstaff.date_of_birth}
                  onChange={(e) => handleChange(e, setNewstaff)}
                  margin='normal'
               />
               <TextField
                  label='Sex'
                  variant='outlined'
                  fullWidth
                  name='sex'
                  value={newstaff.sex}
                  onChange={(e) => handleChange(e, setNewstaff)}
                  margin='normal'
               />
                <TextField
                  label='NIN '
                  variant='outlined'
                  fullWidth
                  name='nin'
                  value={updatestaff.nin}
                  onChange={(e) => handleChange(e, setUpdatestaff)}
                  margin='normal'
               />
              
               <Button
                  onClick={handleSubmitstaff}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Add
               </Button>
            </Box>
         </Modal>

         <Modal
            open={open.deletestaff}
            onClose={() => handleClose('deletestaff')}
            aria-labelledby='delete-staff-modal'
            aria-describedby='modal-to-delete-staff'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography id='delete-staff-modal' variant='h6' component='h2'>
                  Delete staff 
               </Typography>
               <TextField
                  label='Staff Number'
                  variant='outlined'
                  fullWidth
                  name='staff_num'
                  value={deleteIdentifier}
                  onChange={(e) => setDeleteIdentifier(e.target.value)}
                  margin='normal'
               />
               <Button
                  onClick={() => handleDelete('staff')}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Delete
               </Button>
            </Box>
         </Modal>

         <Modal
            open={open.updatestaff}
            onClose={() => handleClose('updatestaff')}
            aria-labelledby='update-staff-modal'
            aria-describedby='modal-to-update-staff'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography id='update-staff-modal' variant='h6' component='h2'>
                  Update staff 
               </Typography>
               <TextField
                  label='Staff Number'
                  variant='outlined'
                  fullWidth
                  name='staff_num'
                  value={updatestaff.staff_num}
                  onChange={(e) => handleChange(e, setUpdatestaff)}
                  margin='normal'
               />
               <TextField
                  label='First Name'
                  variant='outlined'
                  fullWidth
                  name='first_name'
                  value={updatestaff.first_name}
                  onChange={(e) => handleChange(e, setUpdatestaff)}
                  margin='normal'
               />
               <TextField
                  label='Last Name'
                  variant='outlined'
                  fullWidth
                  name='last_name'
                  value={updatestaff.last_name}
                  onChange={(e) => handleChange(e, setUpdatestaff)}
                  margin='normal'
               />
               <TextField
                  label='Address'
                  variant='outlined'
                  fullWidth
                  name='address'
                  value={updatestaff.address}
                  onChange={(e) => handleChange(e, setUpdatestaff)}
                  margin='normal'
               />
               <TextField
                  label='Tel No.'
                  variant='outlined'
                  fullWidth
                  name='telephone_number'
                  value={updatestaff.telephone_number}
                  onChange={(e) => handleChange(e, setUpdatestaff)}
                  margin='normal'
               />
               <TextField
                  label='Birthdate'
                  variant='outlined'
                  fullWidth
                  name='date_of_birth'
                  value={updatestaff.date_of_birth}
                  onChange={(e) => handleChange(e, setUpdatestaff)}
                  margin='normal'
               />
               <TextField
                  label='Sex '
                  variant='outlined'
                  fullWidth
                  name='sex'
                  value={updatestaff.sex}
                  onChange={(e) => handleChange(e, setUpdatestaff)}
                  margin='normal'
               />
               <TextField
                  label='NIN '
                  variant='outlined'
                  fullWidth
                  name='nin'
                  value={updatestaff.nin}
                  onChange={(e) => handleChange(e, setUpdatestaff)}
                  margin='normal'
               />
               
               <Button
                  onClick={handleSubmitUpdatestaff}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Update
               </Button>
            </Box>
         </Modal>




                {/* qualification Table */}
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
                    <Typography variant='h4'sx={{
                        fontFamily: 'Nunito Sans, Sans-serif',
                        marginBottom: '1%',
                        fontWeight: 'bold',
                        backgroundColor: '#E7F3F5',
                        width: '100%'
                    }}>
                        qualification
                    </Typography>
                    {/* Buttons & Input */}
                    <Box sx={{
                        height: '4vh',
                        width: '100%',
                        backgroundColor: 'white',
                        display: 'flex',
                        paddingLeft: '2%'
                    }}>
                         <SearchIcon sx={{ color: 'action.active', mr: 0, my: 2.6}} />
                         <TextField size='medium' id="input-with-sx" label="Enter staff number" variant="standard" />

                         <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#26ABAA',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Search
                         </Button>
                         <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '54%',
                            marginTop: '0.5%',
                            backgroundColor:'#26ABAA',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Add
                        </Button>
                        <Button 
                           onClick={() => handleOpen('updatequalification')}
                           sx={{
                              height: '70%',
                              width: '7%',
                              marginLeft: '2%',
                              marginTop: '0.5%',
                              backgroundColor:'#26ABAA',
                              fontFamily: 'Nunito Sans, Sans-serif',
                              color: 'white'
                           }}
                        >
                            Update
                           </Button>
                           <Button 
                              onClick={() => handleOpen('deletequalification')} 
                              sx={{
                                 height: '70%',
                                 width: '7%',
                                 marginLeft: '2%',
                                 marginTop: '0.5%',
                                 backgroundColor:'#FC696A',
                                 fontFamily: 'Nunito Sans, Sans-serif',
                                 color: 'white'
                           }}
                        >

                           Delete
                        </Button>
                    </Box>
                    
                    {/* Display for qualification stable */}

                    <Box
                     className='scrollable-container'
                     sx={{
                        height: '37vh',
                        width: '100%',
                     }}
                  >
                  {loading ? (
                     <Typography variant='h6'>Loading...</Typography>
                  ) : error ? (
                     <Typography variant='h6' color='error'>
                        {error}
                     </Typography>
                  ) : (
                     <table className='content-table'>
                        <thead>
                           <tr>
                           <th>staff Number</th>
                              <th>qualification Date</th>
                              <th>Type</th>
                              <th>Institution Name</th>
                           </tr>
                        </thead>
                        <tbody>
                           {qualification.map((item) => (
                              <tr key={item.staff_num}>
                                 <td>{item.staff_num}</td>
                                 <td>{item.date_of_qualification}</td>
                                 <td>{item.type}</td>
                                 <td>{item.name_of_institution}</td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  )}
               </Box>
            </Box>

            <Modal
            open={open.qualification}
            onClose={() => handleClose('qualification')}
            aria-labelledby='add-qualification-modal'
            aria-describedby='modal-to-add-new-qualification'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography id='add-qualification-modal' variant='h6' component='h2'>
                  Add New qualification 
               </Typography>
               <TextField
                  label='Staff Number'
                  variant='outlined'
                  fullWidth
                  name='staff_num'
                  value={newqualification.staff_num}
                  onChange={(e) => handleChange(e, setNewqualification)}
                  margin='normal'
               />
               <TextField
                  label='Date of Qualification'
                  variant='outlined'
                  fullWidth
                  name='date_of_qualification'
                  value={newqualification.date_of_qualification}
                  onChange={(e) => handleChange(e, setNewqualification)}
                  margin='normal'
               />
               <TextField
                  label='Type'
                  variant='outlined'
                  fullWidth
                  name='type'
                  value={newqualification.type}
                  onChange={(e) => handleChange(e, setNewqualification)}
                  margin='normal'
               />
               <TextField
                  label='Name of Institution'
                  variant='outlined'
                  fullWidth
                  name='name_of_institution'
                  value={newqualification.name_of_institution}
                  onChange={(e) => handleChange(e, setNewqualification)}
                  margin='normal'
               />
               
               <Button
                  onClick={handleSubmitqualification}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Add
               </Button>
               </Box>
         </Modal>

         <Modal
            open={open.deletequalification}
            onClose={() => handleClose('deletequalification')}
            aria-labelledby='delete-qualification-modal'
            aria-describedby='modal-to-delete-qualification'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography id='delete-qualification-modal' variant='h6' component='h2'>
                  Delete Qualification 
               </Typography>
               <TextField
                  label='Staff Number'
                  variant='outlined'
                  fullWidth
                  name='staff_num'
                  value={deleteIdentifier}
                  onChange={(e) => setDeleteIdentifier(e.target.value)}
                  margin='normal'
               />
               <Button
                  onClick={() => handleDelete('qualification')}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Delete
               </Button>
            </Box>
         </Modal>

         <Modal
            open={open.updatequalification}
            onClose={() => handleClose('updatequalification')}
            aria-labelledby='update-qualification-modal'
            aria-describedby='modal-to-update-qualification'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography id='update-qualification-modal' variant='h6' component='h2'>
                  Update Qualification 
               </Typography>
               <TextField
                  label='Staff Number'
                  variant='outlined'
                  fullWidth
                  name='staff_num'
                  value={updatequalification.staff_num}
                  onChange={(e) => handleChange(e, setUpdatequalification)}
                  margin='normal'
               />
               <TextField
                  label='Date of Qualification'
                  variant='outlined'
                  fullWidth
                  name='date_of_qualification'
                  value={updatequalification.date_of_qualification}
                  onChange={(e) => handleChange(e, setUpdatequalification)}
                  margin='normal'
               />
               <TextField
                  label='Type'
                  variant='outlined'
                  fullWidth
                  name='type'
                  value={updatequalification.type}
                  onChange={(e) => handleChange(e, setUpdatequalification)}
                  margin='normal'
               />
               <TextField
                  label='Name of Institution'
                  variant='outlined'
                  fullWidth
                  name='name_of_institution'
                  value={updatequalification.name_of_institution}
                  onChange={(e) => handleChange(e, setUpdatequalification)}
                  margin='normal'
               />
               
               <Button
                  onClick={handleSubmitUpdatequalification}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Update
               </Button>
            </Box>
         </Modal>





                {/* Work Experience Container */}
                <Box 
                  sx={{ 
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
                  }}
               >
                  <Typography 
                     variant='h4'
                     sx={{
                        fontFamily: 'Nunito Sans, Sans-serif',
                        marginBottom: '1%',
                        fontWeight: 'bold',
                        backgroundColor: '#E7F3F5',
                        width: '100%'
                     }}
                  >
                        Work Experience
                  </Typography>
                    {/* Buttons & Input */}
                    <Box sx={{
                        height: '4vh',
                        width: '100%',
                        backgroundColor: 'white',
                        display: 'flex',
                        paddingLeft: '2%'
                    }}>
                         <SearchIcon sx={{ color: 'action.active', mr: 0, my: 2.6}} />
                         <TextField size='medium' id="input-with-sx" label="Enter staff number" variant="standard" />

                         <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#26ABAA',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Search
                         </Button>
                         <Button
                           onClick={() => handleOpen('WorkExperience')} 
                           sx={{
                              height: '70%',
                              width: '7%',
                              marginLeft: '54%',
                              marginTop: '0.5%',
                              backgroundColor:'#26ABAA',
                              fontFamily: 'Nunito Sans, Sans-serif',
                              color: 'white'
                           }}
                        >
                            Add
                         </Button>
                         <Button 
                           onClick={() => handleOpen('updateWorkExperience')}
                           sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#26ABAA',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Update
                         </Button>
                         <Button 
                           onClick={() => handleOpen('deleteWorkExperience')}
                           sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#FC696A',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Delete
                         </Button>
                    </Box>
                    
                    <Box
                     className='scrollable-container'
                     sx={{
                        height: '37vh',
                        width: '100%',
                     }}
                  >
                     {loading ? (
                        <Typography variant='h6'>Loading...</Typography>
                     ) : error ? (
                        <Typography variant='h6' color='error'>
                           {error}
                        </Typography>
                     ) : (
                        <table className='content-table'>
                           <thead>
                              <tr>
                                 <th>Staff Number</th>
                                 <th>Start Date</th>
                                 <th>Finish Date</th>
                                 <th>Position</th>
                                 <th>Name of Organization</th>
                              </tr>
                           </thead>
                           <tbody>
                              {WorkExperience.map((WorkExperience) => (
                                 <tr key={WorkExperience.staff_num}>
                                    <td>{WorkExperience.staff_num}</td>
                                    <td>{WorkExperience.start_date}</td>
                                    <td>{WorkExperience.finish_date}</td>
                                    <td>{WorkExperience.position}</td>
                                    <td>{WorkExperience.name_of_org}</td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     )}
                  </Box>
               </Box>

               <Modal
            open={open.WorkExperience}
            onClose={() => handleClose('WorkExperience')}
            aria-labelledby='add-WorkExperience-modal'
            aria-describedby='modal-to-add-new-WorkExperience'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography id='add-WorkExperience-modal' variant='h6' component='h2'>
                  Add New WorkExperience 
               </Typography>
               <TextField
                  label='Staff Number'
                  variant='outlined'
                  fullWidth
                  name='staff_num'
                  value={newWorkExperience.staff_num}
                  onChange={(e) => handleChange(e, setNewWorkExperience)}
                  margin='normal'
               />
               <TextField
                  label='Start Date'
                  variant='outlined'
                  fullWidth
                  name='start_date'
                  value={newWorkExperience.start_date}
                  onChange={(e) => handleChange(e, setNewWorkExperience)}
                  margin='normal'
               />
               <TextField
                  label='Finish Date'
                  variant='outlined'
                  fullWidth
                  name='finish_date'
                  value={newWorkExperience.finish_date}
                  onChange={(e) => handleChange(e, setNewWorkExperience)}
                  margin='normal'
               />
               <TextField
                  label='Position'
                  variant='outlined'
                  fullWidth
                  name='position'
                  value={newWorkExperience.position}
                  onChange={(e) => handleChange(e, setNewWorkExperience)}
                  margin='normal'
               />
               <TextField
                  label='Name of Organization '
                  variant='outlined'
                  fullWidth
                  name='name_of_org'
                  value={newWorkExperience.name_of_org}
                  onChange={(e) => handleChange(e, setNewWorkExperience)}
                  margin='normal'
               />
               
               <Button
                  onClick={handleSubmitWorkExperience}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Add
               </Button>
               </Box>
         </Modal>

         <Modal
            open={open.deleteWorkExperience}
            onClose={() => handleClose('deleteWorkExperience')}
            aria-labelledby='delete-WorkExperience-modal'
            aria-describedby='modal-to-delete-WorkExperience'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography id='delete-WorkExperience-modal' variant='h6' component='h2'>
                  Delete Work Experience 
               </Typography>
               <TextField
                  label='Staff Number'
                  variant='outlined'
                  fullWidth
                  name='staff_num'
                  value={deleteIdentifier}
                  onChange={(e) => setDeleteIdentifier(e.target.value)}
                  margin='normal'
               />
               <Button
                  onClick={() => handleDelete('WorkExperience')}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Delete
               </Button>
            </Box>
         </Modal>

         <Modal
            open={open.updateWorkExperience}
            onClose={() => handleClose('updateWorkExperience')}
            aria-labelledby='update-WorkExperience-modal'
            aria-describedby='modal-to-update-WorkExperience'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 400,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography id='update-WorkExperience-modal' variant='h6' component='h2'>
                  Update Work Experience 
               </Typography>
               <TextField
                  label='Staff Number'
                  variant='outlined'
                  fullWidth
                  name='staff_num'
                  value={updateWorkExperience.staff_num}
                  onChange={(e) => handleChange(e, setUpdateWorkExperience)}
                  margin='normal'
               />
               <TextField
                  label='Start Date'
                  variant='outlined'
                  fullWidth
                  name='start_date'
                  value={updateWorkExperience.start_date}
                  onChange={(e) => handleChange(e, setUpdateWorkExperience)}
                  margin='normal'
               />
               <TextField
                  label='Finish Date'
                  variant='outlined'
                  fullWidth
                  name='finish_date'
                  value={updateWorkExperience.finish_date}
                  onChange={(e) => handleChange(e, setUpdateWorkExperience)}
                  margin='normal'
               />
               <TextField
                  label='Position'
                  variant='outlined'
                  fullWidth
                  name='position'
                  value={updateWorkExperience.position}
                  onChange={(e) => handleChange(e, setUpdateWorkExperience)}
                  margin='normal'
               />
               <TextField
                  label='Name of Organization '
                  variant='outlined'
                  fullWidth
                  name='name_of_org'
                  value={updateWorkExperience.name_of_org}
                  onChange={(e) => handleChange(e, setUpdateWorkExperience)}
                  margin='normal'
               />
               
               <Button
                  onClick={handleSubmitUpdateWorkExperience}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Update
               </Button>
            </Box>
         </Modal>






                {/* Employment Contract Container */}
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
                  }}
               >
                    <Typography variant='h4'sx={{
                        fontFamily: 'Nunito Sans, Sans-serif',
                        marginBottom: '1%',
                        fontWeight: 'bold',
                        backgroundColor: '#E7F3F5',
                        width: '100%'
                    }}>
                        Employment Contract
                    </Typography>
                    
                    <Box sx={{
                        height: '4vh',
                        width: '100%',
                        backgroundColor: 'white',
                        display: 'flex',
                        paddingLeft: '2%'
                    }}>
                         <SearchIcon sx={{ color: 'action.active', mr: 0, my: 2.6}} />
                         <TextField size='medium' id="input-with-sx" label="Enter staff number" variant="standard" />

                         <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#26ABAA',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Search
                         </Button>
                         <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '54%',
                            marginTop: '0.5%',
                            backgroundColor:'#26ABAA',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Add
                         </Button>
                         <Button 
                           onClick={() => handleOpen('EmploymentContract')}
                           sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#26ABAA',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Update
                         </Button>
                         <Button 
                           onClick={() => handleOpen('deleteEmploymentContract')} 
                           sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#FC696A',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Delete
                         </Button>
                    </Box>
                    
                   

                    <Box
                        className='scrollable-container'
                        sx={{
                           height: '37vh',
                           width: '100%',
                        }}
                     >
                        {loading ? (
                           <Typography variant='h6'>Loading...</Typography>
                        ) : error ? (
                           <Typography variant='h6' color='error'>
                              {error}
                           </Typography>
                        ) : (
                           <table className='content-table'>
                              <thead>
                                 <tr>
                                 <th>Staff Number</th>
                                 <th>Work hours</th>
                                 <th>Type of Contract</th>
                                 <th>Type of Salary</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {EmploymentContract.map((EmploymentContract) => (
                                    <tr key={EmploymentContract.staff_num}>
                                       <td>{EmploymentContract.staff_num}</td>
                                       <td>{EmploymentContract.name}</td>
                                       <td>{EmploymentContract.work_hours}</td>
                                       <td>{EmploymentContract.type_of_contract}</td>
                                       <td>{EmploymentContract.type_of_salary_payment}</td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        )}
                     </Box>
                  </Box>

                  <Modal
                     open={open.EmploymentContract}
                     onClose={() => handleClose('EmploymentContract')}
                     aria-labelledby='add-EmploymentContract-modal'
                     aria-describedby='modal-to-add-new-EmploymentContract'
                  >
                     <Box
                        sx={{
                           position: 'absolute',
                           top: '50%',
                           left: '50%',
                           transform: 'translate(-50%, -50%)',
                           width: 400,
                           bgcolor: 'background.paper',
                           border: '2px solid #000',
                           boxShadow: 24,
                           p: 4,
                        }}
                     >
                        <Typography id='add-EmploymentContract-modal' variant='h6' component='h2'>
                           Add New Employment Contract 
                        </Typography>
                        <TextField
                           label='Staff Number'
                           variant='outlined'
                           fullWidth
                           name='staff_num'
                           value={newEmploymentContract.staff_num}
                           onChange={(e) => handleChange(e, setNewEmploymentContract)}
                           margin='normal'
                        />
                        <TextField
                           label='Work Hours'
                           variant='outlined'
                           fullWidth
                           name='work_hours'
                           value={newEmploymentContract.work_hours}
                           onChange={(e) => handleChange(e, setNewEmploymentContract)}
                           margin='normal'
                        />
                        <TextField
                           label='Type of Contract'
                           variant='outlined'
                           fullWidth
                           name='type_of_contract'
                           value={newEmploymentContract.type_of_contract}
                           onChange={(e) => handleChange(e, setNewEmploymentContract)}
                           margin='normal'
                        />
                        <TextField
                           label='Type of Salary'
                           variant='outlined'
                           fullWidth
                           name='type_of_salary_payment'
                           value={newEmploymentContract.type_of_salary_payment}
                           onChange={(e) => handleChange(e, setNewEmploymentContract)}
                           margin='normal'
                        />
                        
                        <Button
                           onClick={handleSubmitEmploymentContract}
                           variant='contained'
                           color='primary'
                           sx={{ mt: 2 }}
                        >
                           Add
                        </Button>
                        </Box>
                  </Modal>

                  <Modal
                     open={open.deleteEmploymentContract}
                     onClose={() => handleClose('deleteEmploymentContract')}
                     aria-labelledby='delete-EmploymentContract-modal'
                     aria-describedby='modal-to-delete-EmploymentContract'
                  >
                     <Box
                        sx={{
                           position: 'absolute',
                           top: '50%',
                           left: '50%',
                           transform: 'translate(-50%, -50%)',
                           width: 400,
                           bgcolor: 'background.paper',
                           border: '2px solid #000',
                           boxShadow: 24,
                           p: 4,
                        }}
                     >
                        <Typography id='delete-EmploymentContract-modal' variant='h6' component='h2'>
                           Delete Employment Contract
                        </Typography>
                        <TextField
                           label='Staff Number'
                           variant='outlined'
                           fullWidth
                           name='staff_num'
                           value={deleteIdentifier}
                           onChange={(e) => setDeleteIdentifier(e.target.value)}
                           margin='normal'
                        />
                        <Button
                           onClick={() => handleDelete('EmploymentContract')}
                           variant='contained'
                           color='primary'
                           sx={{ mt: 2 }}
                        >
                           Delete
                        </Button>
                     </Box>
                  </Modal>

                  <Modal
                     open={open.updateEmploymentContract}
                     onClose={() => handleClose('updateEmploymentContract')}
                     aria-labelledby='update-EmploymentContract-modal'
                     aria-describedby='modal-to-update-EmploymentContract'
                  >
                     <Box
                        sx={{
                           position: 'absolute',
                           top: '50%',
                           left: '50%',
                           transform: 'translate(-50%, -50%)',
                           width: 400,
                           bgcolor: 'background.paper',
                           border: '2px solid #000',
                           boxShadow: 24,
                           p: 4,
                        }}
                     >
                        <Typography id='update-EmploymentContract-modal' variant='h6' component='h2'>
                           Update Employment Contract 
                        </Typography>
                        <TextField
                           label='Staff Number'
                           variant='outlined'
                           fullWidth
                           name='staff_num'
                           value={updateEmploymentContract.staff_num}
                           onChange={(e) => handleChange(e, setUpdateEmploymentContract)}
                           margin='normal'
                        />
                        <TextField
                           label='Work Hours'
                           variant='outlined'
                           fullWidth
                           name='work_hours'
                           value={updateEmploymentContract.work_hours}
                           onChange={(e) => handleChange(e, setUpdateEmploymentContract)}
                           margin='normal'
                        />
                        <TextField
                           label='Type of Contract'
                           variant='outlined'
                           fullWidth
                           name='type_of_contract'
                           value={updateEmploymentContract.type_of_contract}
                           onChange={(e) => handleChange(e, setUpdateEmploymentContract)}
                           margin='normal'
                        />
                        <TextField
                           label='Type of Salary'
                           variant='outlined'
                           fullWidth
                           name='type_of_salary_payment'
                           value={updateEmploymentContract.type_of_salary_payment}
                           onChange={(e) => handleChange(e, setUpdateEmploymentContract)}
                           margin='normal'
                        />
                        
                        <Button
                           onClick={handleSubmitUpdateEmploymentContract}
                           variant='contained'
                           color='primary'
                           sx={{ mt: 2 }}
                        >
                           Update
                        </Button>
                     </Box>
                  </Modal>

                 {/* staff Allocation Table */}
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
                    <Typography variant='h4'sx={{
                        fontFamily: 'Nunito Sans, Sans-serif',
                        marginBottom: '1%',
                        fontWeight: 'bold',
                        backgroundColor: '#E7F3F5',
                        width: '100%'
                    }}>
                        staff Allocation
                    </Typography>
                    {/* Buttons & Input */}
                    <Box sx={{
                        height: '4vh',
                        width: '100%',
                        backgroundColor: 'white',
                        display: 'flex',
                        paddingLeft: '2%'
                    }}>
                         <SearchIcon sx={{ color: 'action.active', mr: 0, my: 2.6}} />
                         <TextField size='medium' id="input-with-sx" label="Enter ward number" variant="standard" />

                         <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#26ABAA',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Search
                         </Button>
                         <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '54%',
                            marginTop: '0.5%',
                            backgroundColor:'#26ABAA',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Add
                         </Button>
                         <Button 
                           onClick={() => handleOpen('updatestaffAllocation')}
                           sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#26ABAA',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Update
                         </Button>
                         <Button 
                           onClick={() => handleOpen('deletestaffAllocation')} 
                           sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#FC696A',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}>
                            Delete
                         </Button>
                    </Box>
                    
                    <Box
                        className='scrollable-container'
                        sx={{
                           height: '37vh',
                           width: '100%',
                        }}
                     >
                        {loading ? (
                           <Typography variant='h6'>Loading...</Typography>
                        ) : error ? (
                           <Typography variant='h6' color='error'>
                              {error}
                           </Typography>
                        ) : (
                           <table className='content-table'>
                              <thead>
                                 <tr>
                                    <th>Staff Number</th>
                                    <th>Ward Number</th>
                                    <th>Shift</th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {staffAllocation.map((StaffAllocation) => (
                                    <tr key={StaffAllocation.staff_num}>
                                       <td>{StaffAllocation.staff_num}</td>
                                       <td>{StaffAllocation.ward_num}</td>
                                       <td>{StaffAllocation.shift}</td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        )}
                     </Box>
                  </Box>

                  <Modal
                     open={open.staffAllocation}
                     onClose={() => handleClose('s')}
                     aria-labelledby='add-staffAllocation-modal'
                     aria-describedby='modal-to-add-new-staffAllocation'
                  >
                     <Box
                        sx={{
                           position: 'absolute',
                           top: '50%',
                           left: '50%',
                           transform: 'translate(-50%, -50%)',
                           width: 400,
                           bgcolor: 'background.paper',
                           border: '2px solid #000',
                           boxShadow: 24,
                           p: 4,
                        }}
                     >
                        <Typography id='add-staffAllocation-modal' variant='h6' component='h2'>
                           Add New Staff Allocation 
                        </Typography>
                        <TextField
                           label='Staff Number'
                           variant='outlined'
                           fullWidth
                           name='staff_num'
                           value={newstaffAllocation.staff_num}
                           onChange={(e) => handleChange(e, setNewstaffAllocation)}
                           margin='normal'
                        />
                        <TextField
                           label='Ward Number'
                           variant='outlined'
                           fullWidth
                           name='ward_num'
                           value={newstaffAllocation.ward_num}
                           onChange={(e) => handleChange(e, setNewstaffAllocation)}
                           margin='normal'
                        />
                        <TextField
                           label='Shift'
                           variant='outlined'
                           fullWidth
                           name='shift'
                           value={newstaffAllocation.shift}
                           onChange={(e) => handleChange(e, setNewstaffAllocation)}
                           margin='normal'
                        />
                        <Button
                           onClick={handleSubmitstaffAllocation}
                           variant='contained'
                           color='primary'
                           sx={{ mt: 2 }}
                        >
                           Add
                        </Button>
                        </Box>
                  </Modal>

                  <Modal
                     open={open.deletestaffAllocation}
                     onClose={() => handleClose('deletestaffAllocation')}
                     aria-labelledby='delete-staffAllocation-modal'
                     aria-describedby='modal-to-delete-staffAllocation'
                  >
                     <Box
                        sx={{
                           position: 'absolute',
                           top: '50%',
                           left: '50%',
                           transform: 'translate(-50%, -50%)',
                           width: 400,
                           bgcolor: 'background.paper',
                           border: '2px solid #000',
                           boxShadow: 24,
                           p: 4,
                        }}
                     >
                        <Typography id='delete-staffAllocation-modal' variant='h6' component='h2'>
                           Delete Staff Allocation 
                        </Typography>
                        <TextField
                           label='Staff Number'
                           variant='outlined'
                           fullWidth
                           name='staff_num'
                           value={deleteIdentifier}
                           onChange={(e) => setDeleteIdentifier(e.target.value)}
                           margin='normal'
                        />
                        <Button
                           onClick={() => handleDelete('staffAllocation')}
                           variant='contained'
                           color='primary'
                           sx={{ mt: 2 }}
                        >
                           Delete
                        </Button>
                     </Box>
                  </Modal>

                  <Modal
                     open={open.updatestaffAllocation}
                     onClose={() => handleClose('updatestaffAllocation')}
                     aria-labelledby='update-staffAllocation-modal'
                     aria-describedby='modal-to-update-staffAllocation'
                  >
                     <Box
                        sx={{
                           position: 'absolute',
                           top: '50%',
                           left: '50%',
                           transform: 'translate(-50%, -50%)',
                           width: 400,
                           bgcolor: 'background.paper',
                           border: '2px solid #000',
                           boxShadow: 24,
                           p: 4,
                        }}
                     >
                        <Typography id='update-staffAllocation-modal' variant='h6' component='h2'>
                           Update Staff Allocation 
                        </Typography>
                        <TextField
                           label='Staff Number'
                           variant='outlined'
                           fullWidth
                           name='staff_num'
                           value={updatestaffAllocation.staff_num}
                           onChange={(e) => handleChange(e, setUpdatestaffAllocation)}
                           margin='normal'
                        />
                        <TextField
                           label='Ward Number'
                           variant='outlined'
                           fullWidth
                           name='ward_num'
                           value={updatestaffAllocation.ward_num}
                           onChange={(e) => handleChange(e, setUpdatestaffAllocation)}
                           margin='normal'
                        />
                        <TextField
                           label='Shift'
                           variant='outlined'
                           fullWidth
                           name='shift'
                           value={updatestaffAllocation.shift}
                           onChange={(e) => handleChange(e, setUpdatestaffAllocation)}
                           margin='normal'
                        />
                        
                        <Button
                           onClick={handleSubmitUpdatestaffAllocation}
                           variant='contained'
                           color='primary'
                           sx={{ mt: 2 }}
                        >
                           Update
                        </Button>
                     </Box>
                  </Modal>
            </Box>
        </>
    );
}

export default staff;
