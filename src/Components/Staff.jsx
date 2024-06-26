import './Ward.css'
import { Box, Button, InputAdornment, Modal, TextField, Typography} from '@mui/material';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import DashboardNavigation from './Navigations/DashboardNavigation';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
function Staff({token}){
  

   const [input1, setInput1] = useState('');
   const [input2, setInput2] = useState('');
   const [input3, setInput3] = useState('');
   const [input4, setInput4] = useState('');
   const [input5, setInput5] = useState('');
   const [input6, setInput6] = useState('');
   const [input7, setInput7] = useState('');
   const [input8, setInput8] = useState('');
   const text1 = (event) => setInput1(event.target.value);
   const text2 = (event) => setInput2(event.target.value);
   const text3 = (event) => setInput3(event.target.value);
   const text4 = (event) => setInput4(event.target.value);
   const text5 = (event) => setInput5(event.target.value);
   const text6 = (event) => setInput6(event.target.value);
   const text7 = (event) => setInput7(event.target.value);
   const text8 = (event) => setInput8(event.target.value);

   useEffect(() =>{
      fetchStaff();
      fetchQualification();
      fetchWorkExperience();
      fetchEmploymentContract();
      fetchStaffAllocation();
   }, [])

   const [wardTable, setWardtable] = useState([])
   async function fetchStaff(){
      const {data} = await supabase
      .from('staff')
      .select('*')
      setWardtable(data)
   }

   const [wardSuppliesTable, setWardSuppliesTable] = useState([]);
   async function fetchQualification(){
      let { data, error } = await supabase
      .rpc('get_staff_qualifications')
      if (error) alert(error)
      else setWardSuppliesTable(data)
   }

   const [wardPharmaceuticalTable, setWardPharmaceuticalTable] = useState([]);
   async function fetchWorkExperience(){
      let { data, error } = await supabase
      .rpc('get_staff_work_experience')
      if (error) alert(error)
      else setWardPharmaceuticalTable(data)
   }

   const [wardPharmRequestTable, setwardPharmRequest] = useState([]);
   async function fetchEmploymentContract(){
      
      let { data, error } = await supabase
      .rpc('get_staff_employment_contract')
      if (error) alert(error)
      else setwardPharmRequest(data)

   }

   const [wardSurgRequestTable, setWardSurgRequestTable] = useState([]);
   async function fetchStaffAllocation(){
      
      let { data, error } = await supabase
      .rpc('get_staff_allocation')
      if (error) alert(error)
      else setWardSurgRequestTable(data)

   }
   //Modal for ward table
   const [wardModal, setWardModal] = useState(false);
   const [updateWardModal, setUpdateWardModal] = useState(false);
   const [deleteWardModal, setDeleteWardModal] = useState(false);
   //Add ward
   const openWardModal = () => setWardModal(true);
   const closeWardModal = () => setWardModal(false);
   //Update ward
   const openUpdateWard = () => setUpdateWardModal(true);
   const closeUpdateWard = () => setUpdateWardModal(false);
   //Delete ward
   const openDeleteWard = () => setDeleteWardModal(true);
   const closeDeleteWard = () => setDeleteWardModal(false);


   const handleAddWard = async() => {
      
      const { data, error } = await supabase
      .from('staff')
      .insert([
         {
      staff_num: input1,
      first_name: input2,
      last_name: input3,
      address: input4,
      telephone_number : input5,
      date_of_birth : input6,
      sex : input7,
      position_held : input8
      },
      ])
      .select()
      console.log(error)
        
      closeWardModal(); // Close modal 1 after saving
      window.location.reload();

    };

   const handleWardUpdate = async() => {

      const { data, error } = await supabase
        .from('staff')
        .update(
         [{
            staff_num: input1,
            first_name: input2,
            last_name: input3,
            address: input4,
            telephone_number : input5,
            date_of_birth : input6,
            sex : input7,
            position_held : input8
        }])
        .eq('staff_num', input1);
      closeUpdateWard()
      window.location.reload();

   }

   const handleWardDelete = async() => {
      
   const { error } = await supabase
   .from('staff')
   .delete()
   .eq('staff_num', input1)
   window.location.reload();

   }
    //Modal for Ward Surgical and Nonsurgical Supplies

   
   const [addSurgicalSuppliesModal, setAddSurgicalSuppliesModal] = useState(false);
   const [deleteSurgicalSuppliesModal, setDeleteSurgicalSuppliesModal] = useState(false);
   const [updateStaffQualModa, setUpdateStaffQualModal] = useState(false)
   //Add Surgical Modal
   const openSurgicalModal = () => setAddSurgicalSuppliesModal(true);
   const closeSurgicalModal = () => setAddSurgicalSuppliesModal(false);

   //Update Qualification
   const openStaffQual = () => setUpdateStaffQualModal(true);
   const closeStaffQual = () => setUpdateStaffQualModal(false);
   
   //Delete Surgical Modal
   const openDeleteSurgicalModal = () => setDeleteSurgicalSuppliesModal(true);
   const closeDeleteSurgicalModal = () => setDeleteSurgicalSuppliesModal(false);

   const handleAddSurgicalModal = async() =>{
      const { data, error } = await supabase
      .from('qualification')
      .insert([
        {
          staff_num: input1,
          date_of_qualification: input2,
          type: input3,
          name_of_institution: input4
        },
      ]); 
      closeSurgicalModal()
      window.location.reload()

   }

   const handleQualificationUpdate = async() =>{
      const { data, error } = await supabase
        .from('qualification')
        .update(
         [{
            staff_num: input1,
            date_of_qualification: input2,
            type: input3,
            name_of_institution: input4
        }])
        .eq('staff_num', input1);
      closeUpdateWard()
      window.location.reload();
   }

   const handleDeleteSurgicalModal = async() =>{
      const { data, error } = await supabase
        .from('qualification')
        .delete()
        .eq('staff_num', input1)

        closeDeleteSurgicalModal();
        window.location.reload()
   }

   //Modal for Ward Pharmaceutical Supplies

   const [addPharmaceuticalModal, setAddPharmaceuticalModal] = useState(false);
   const [deletePharmaceuticalModal, setDeletePharmaceuticalModal] = useState(false);
   const [updateWE, setUpdateWE] = useState(false)
   //Add Pharmaceutical Modal
   const openAddPharmaceuticalModal = () =>  setAddPharmaceuticalModal(true);
   const closeAddPharmaceuticalModal = () =>  setAddPharmaceuticalModal(false);
 
  //Update Work Experience
  const openWEModal = () =>  setUpdateWE(true);
  const closeWEModal = () => setUpdateWE(false)

   //Delete Pharmaceutical Modal
   const openDeletePharmaceuticalModal = () => setDeletePharmaceuticalModal(true);
   const closeDeletePharmaceuticalModal = () =>  setDeletePharmaceuticalModal(false);

   const handleAddPharmaceuticalModal = async() => {
      const { data, error } = await supabase
      .from('work_experience')
      .insert([
        {
          staff_num: input1,
          start_date: input2,
          finish_date: input3,
          position: input4,
          name_of_org: input5
        },
      ]); 
      closeAddPharmaceuticalModal()
      window.location.reload();

   }

   const handleWEupdate = async() =>{
      const { data, error } = await supabase
        .from('work_experience')
        .update(
         [{
         staff_num: input1,
          start_date: input2,
          finish_date: input3,
          position: input4,
          name_of_org: input5
        }])
        .eq('staff_num', input1);
        closeWEModal()
      window.location.reload();
   }

   
   const handleDeletePharmaceuticalModal = async() => {
      const { data, error } = await supabase
        .from('work_ecperience')
        .delete()
        .eq('staff_num', input1)
        closeDeletePharmaceuticalModal()
        window.location.reload();

   }

   //Modal for pharmaceutical Request 
   const [addPharmaRequestModal, setAddPharmaRequestModal] = useState(false);
   const [updatePharmaRequestModal, setUpdatePharmaRequestModal] = useState(false);
   const [deletePharmaRequestModal, setDeletePharmaRequestModal] = useState(false);

   //Add pharmaceutical Request
   const openAddPharmaRequestModal = () => setAddPharmaRequestModal(true);
   const closeAddPharmaRequestModal = () => setAddPharmaRequestModal(false);
   //Update pharmaceutical Request
   const openUpdatePharmaRequestModal = () => setUpdatePharmaRequestModal(true);
   const closeUpdatePharmaRequestModal = () => setUpdatePharmaRequestModal(false);
   //Deltee pharmaceutical Request
   const openDeletePharmaRequestModal = () => setDeletePharmaRequestModal(true);
   const closeDeletePharmaRequestModal = () => setDeletePharmaRequestModal(false);

   const handleAddPharmaRequest = async() => {
      const { data, error } = await supabase
      .from('employment_contract')
      .insert([
        {
         staff_num: input1,
         work_hours: input2,
         type_of_contract: input3,
         type_of_salary_payment: input4,
        },
      ]); 
      closeAddPharmaRequestModal()
      window.location.reload();

   }  

   const handleUpdatePharmaRequest = async() => {
      const { data, error } = await supabase
        .from('employment_contract')
        .update(
         [{
         staff_num: input1,
         work_hours: input2,
         type_of_contract: input3,
         type_of_salary_payment: input4,
        }])
        .eq('staff_num', input1);
      closeUpdatePharmaRequestModal()
      window.location.reload();

   }

   const handleDeletePharmaRequest = async() => {
      const { error } = await supabase
      .from('employment_contract')
      .delete()
      .eq('staff_num', input1)
      closeDeletePharmaRequestModal()
      window.location.reload();

   }


   //Modal for Surgical Request 
   const [addSurgicalRequestModal, setAddSurgicalRequestModal] = useState(false);
   const [updateSurgicalRequestModal, setUpdateSurgicalRequestModal] = useState(false);
   const [deleteSurgicalRequestModal, setDeleteSurgicalRequestModal] = useState(false);

   //Add Surgical Request
   const openAddSurgicalRequestModal = () => setAddSurgicalRequestModal(true);
   const closeAddSurgicalRequestModal = () => setAddSurgicalRequestModal(false);
   //Update Surgical Request
   const openUpdateSurgicalRequestModal = () => setUpdateSurgicalRequestModal(true);
   const closeUpdateSurgicalRequestModal = () => setUpdateSurgicalRequestModal(false);
   //Deltee Surgical Request
   const openDeleteSurgicalRequestModal = () => setDeleteSurgicalRequestModal(true);
   const closeDeleteSurgicalRequestModal = () => setDeleteSurgicalRequestModal(false);

   const handleAddSurgicalRequest = async() => {
      const { data, error } = await supabase
      .from('staff_allocation')
      .insert([
        {
          staff_num: input1,
          ward_num: input2,
          shift: input3,
        },
      ]); 
      console.log(error)
      closeAddSurgicalRequestModal()
      window.location.reload();

   }

   const handleUpdateSurgicalRequest = async() => {
      const { data, error } = await supabase
        .from('staff_allocation')
        .update(
         [{
          staff_num: input1,
          ward_num: input2,
          shift: input3,
        }])
        .eq('staff_num', input1);
        closeUpdateSurgicalRequestModal()
        window.location.reload();

   }

   const handleDeleteSurgicalRequest = async() => {
      const { error } = await supabase
      .from('staff_allocation')
      .delete()
      .eq('staff_num', input1)
      closeDeleteSurgicalRequestModal()
      window.location.reload();

   }
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
            
                {/* Ward Container */}
                <Box sx={{ 
                    height: '37vh',
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
                        Staff
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
                         <Button
                           sx={{
                              height: '70%',
                              width: '7%',
                              marginLeft: '54%',
                              marginTop: '0.5%',
                              backgroundColor: '#26ABAA',
                              fontFamily: 'Nunito Sans, Sans-serif',
                              color: 'white'
                           }}
                           onClick={openWardModal}
                           >
                           Add
                           </Button>
                           <Modal
                              open={wardModal}
                              onClose={closeWardModal}
                              aria-labelledby="modal1-modal-title"
                              aria-describedby="modal1-modal-description"
                              >
                              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                              <Typography textAlign={'center'}>Add Staff</Typography>
                                 <TextField
                                    label="Staff Number"
                                    value={input1}
                                    onChange={text1}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="First Name"
                                    value={input2}
                                    onChange={text2}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Last Name"
                                    value={input3}
                                    onChange={text3}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField
                                    label="Address"
                                    value={input4}
                                    onChange={text4}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField
                                    label="Telephone Number"
                                    value={input5}
                                    onChange={text5}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField type='date'
                                    label="Date of birth"
                                    value={input6}
                                    onChange={text6}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField
                                    label="Sex"
                                    value={input7}
                                    onChange={text7}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField
                                    label="Position Held"
                                    value={input8}
                                    onChange={text8}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <Button onClick={handleAddWard}>Submit</Button>
                              </Box>
                              </Modal>

                           <Button
                        sx={{
                           height: '70%',
                           width: '7%',
                           marginLeft: '2%',
                           marginTop: '0.5%',
                           backgroundColor: '#26ABAA',
                           fontFamily: 'Nunito Sans, Sans-serif',
                           color: 'white'
                        }}
                        onClick={() => openUpdateWard()}
                        >
                        Update
                        </Button>

                        <Modal
                              open={updateWardModal}
                              onClose={closeUpdateWard}
                              aria-labelledby="modal1-modal-title"
                              aria-describedby="modal1-modal-description"
                              >
                              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                                 <Typography textAlign={'center'}>Update Staff</Typography>
                                 <TextField
                                    label="Staff Number"
                                    value={input1}
                                    onChange={text1}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="First Name"
                                    value={input2}
                                    onChange={text2}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Last Name"
                                    value={input3}
                                    onChange={text3}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField
                                    label="Address"
                                    value={input4}
                                    onChange={text4}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField
                                    label="Telephone Number"
                                    value={input5}
                                    onChange={text5}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField type='date'
                                    label="Date of birth"
                                    value={input6}
                                    onChange={text6}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField
                                    label="Sex"
                                    value={input7}
                                    onChange={text7}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField
                                    label="Position Held"
                                    value={input8}
                                    onChange={text8}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <Button onClick={handleWardUpdate} >Update</Button>
                              </Box>
                              </Modal>
                         <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#FC696A',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}
                         onClick={() => openDeleteWard()}>
                            Delete
                         </Button>
                         
                        <Modal
                              open={deleteWardModal}
                              onClose={closeDeleteWard}
                              aria-labelledby="modal1-modal-title"
                              aria-describedby="modal1-modal-description"
                              >
                              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                                 <Typography textAlign={'center'}>Delete Staff</Typography>
                                 <TextField
                                    label="Staff Number"
                                    value={input1}
                                    onChange={text1}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <Button onClick={handleWardDelete} >Submit</Button>
                              </Box>
                              </Modal>
                         
                    </Box>
                    
                    {/* Display for Ward stable */}

                    <Box className='scrollable-container' sx={{
                        backgroundColor: 'white',
                        height: '37vh',
                        width: '100%',
                        
                    }}>
                     <table className="ward-content-table">
                        <thead>
                           <tr>
                              <th>Staff Number</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Address</th>
                              <th>Telephone Number</th>
                              <th>Date of Birth</th>
                              <th>Sex</th>
                              <th>Position Held</th>
                             
                           </tr>
                        </thead>

                        <tbody>  
                           { wardTable.map((attri) =>  
                              <tr key={attri.staff_num}>
                                 <td>{attri.staff_num}</td>
                                 <td>{attri.first_name}</td>
                                 <td>{attri.last_name}</td>
                                 <td>{attri.address}</td>
                                 <td>{attri.telephone_number}</td>
                                 <td>{attri.date_of_birth}</td>
                                 <td>{attri.sex}</td>
                                 <td>{attri.position_held}</td>
                              </tr>
                        )}
                              

                        </tbody>
                     </table>
                    </Box>
                </Box>
                




                {/* Ward Surgical and Non-Surgical Supplies Table */}
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
                        Qualifications
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
                         <Button
                           sx={{
                              height: '70%',
                              width: '7%',
                              marginLeft: '54%',
                              marginTop: '0.5%',
                              backgroundColor: '#26ABAA',
                              fontFamily: 'Nunito Sans, Sans-serif',
                              color: 'white'
                           }}
                           onClick={openSurgicalModal}
                           >
                           Add
                           </Button>   

                           <Modal
                           open={addSurgicalSuppliesModal}
                           onClose={closeSurgicalModal}
                           aria-labelledby="modal-modal-title"
                           aria-describedby="modal-modal-description"
                           >
                           <Box
                              sx={{
                                 position: 'absolute',
                                 top: '50%',
                                 left: '50%',
                                 transform: 'translate(-50%, -50%)',
                                 width: 400,
                                 bgcolor: 'background.paper',
                                 boxShadow: 24,
                                 p: 4,
                                 borderRadius: 8
                              }}
                           >
                              <Typography textAlign={'center'}>Add Staff Qualification</Typography>
                              <TextField
                              name="ward_number"
                              label="Staff Number"
                              value={input1}
                              onChange={text1}
                              fullWidth
                              margin="normal"
                           />
                           <TextField type='date'
                              name="item_number"
                              label="Date of Qualification"
                              value={input2}
                              onChange={text2}
                              fullWidth
                              margin="normal"
                           />
                           <TextField
                              name="ward_number"
                              label="Type"
                              value={input3}
                              onChange={text3}
                              fullWidth
                              margin="normal"
                           />
                           <TextField
                              name="item_number"
                              label="Name of Institution"
                              value={input4}
                              onChange={text4}
                              fullWidth
                              margin="normal"
                           />

                              <Button onClick={handleAddSurgicalModal} variant="contained" color="primary">
                                 Submit
                              </Button>
                           </Box>

                           </Modal>

                           <Button
                        sx={{
                           height: '70%',
                           width: '7%',
                           marginLeft: '2%',
                           marginTop: '0.5%',
                           backgroundColor: '#26ABAA',
                           fontFamily: 'Nunito Sans, Sans-serif',
                           color: 'white'
                        }}
                        onClick={() => openStaffQual()}
                        >
                        Update
                        </Button>

                        <Modal
                              open={updateStaffQualModa}
                              onClose={closeStaffQual}
                              aria-labelledby="modal1-modal-title"
                              aria-describedby="modal1-modal-description"
                              >
                              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                                 <Typography textAlign={'center'}>Update Staff Qualification</Typography>
                                 <TextField
                              name="ward_number"
                              label="Staff Number"
                              value={input1}
                              onChange={text1}
                              fullWidth
                              margin="normal"
                           />
                           <TextField type='date'
                              name="item_number"
                              label="Date of Qualification"
                              value={input2}
                              onChange={text2}
                              fullWidth
                              margin="normal"
                           />
                           <TextField
                              name="ward_number"
                              label="Type"
                              value={input3}
                              onChange={text3}
                              fullWidth
                              margin="normal"
                           />
                           <TextField
                              name="item_number"
                              label="Name of Institution"
                              value={input4}
                              onChange={text4}
                              fullWidth
                              margin="normal"
                           />
                                 <Button onClick={handleQualificationUpdate} >Update</Button>
                              </Box>
                              </Modal>
                           <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#FC696A',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}
                         onClick={openDeleteSurgicalModal}>
                            Delete
                         </Button>

                        <Modal
                        open={deleteSurgicalSuppliesModal}
                        onClose={closeDeleteSurgicalModal}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                        >
                        <Box
                           sx={{
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              transform: 'translate(-50%, -50%)',
                              width: 400,
                              bgcolor: 'background.paper',
                              boxShadow: 24,
                              p: 4,
                              borderRadius: 8
                           }}
                        >
                              <Typography textAlign={'center'}>Delete Staff Qualification</Typography>
                              <TextField
                              name="ward_number"
                              label="Staff Number"
                              value={input1}
                              onChange={text1}
                              fullWidth
                              margin="normal"
                           />
                           

                           <Button onClick={handleDeleteSurgicalModal} variant="contained" color="primary">
                              Delete
                           </Button>
                        </Box>
                        </Modal>
                    </Box>
                    
                    {/* Display for Surgical Supplies stable */}

                    <Box className='scrollable-container' sx={{
                        backgroundColor: 'white',
                        height: '37vh',
                        width: '100%',
                        
                    }}>
                     <table className="ward-content-table">
                        <thead>
                           <tr>
                              <th>Staff Number</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Date of Qualification</th>
                              <th>Type</th>
                              <th>Name of Institution</th>
                             
                           </tr>
                        </thead>

                        <tbody>
                          { wardSuppliesTable.map((staffQual) => 
                           <tr key={staffQual.staff_num}>
                              <td>{staffQual.staff_num}</td>
                              <td>{staffQual.first_name}</td>
                              <td>{staffQual.last_name}</td>
                              <td>{staffQual.date_of_qualification}</td>
                              <td>{staffQual.type}</td>
                              <td>{staffQual.name_of_institution}</td>
                           </tr>
                          ) }

                        </tbody>
                     </table>
                    </Box>
                </Box>





                {/* Ward Pharmaceutical Supplies Table */}
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
                         <Button
                           sx={{
                              height: '70%',
                              width: '7%',
                              marginLeft: '54%',
                              marginTop: '0.5%',
                              backgroundColor: '#26ABAA',
                              fontFamily: 'Nunito Sans, Sans-serif',
                              color: 'white'
                           }}
                           onClick={openAddPharmaceuticalModal}
                           >
                           Add
                           </Button>

                           <Modal
                           open={addPharmaceuticalModal}
                           onClose={closeAddPharmaceuticalModal}
                           aria-labelledby="modal-modal-title"
                           aria-describedby="modal-modal-description"
                           >
                           <Box
                              sx={{
                                 position: 'absolute',
                                 top: '50%',
                                 left: '50%',
                                 transform: 'translate(-50%, -50%)',
                                 width: 400,
                                 bgcolor: 'background.paper',
                                 boxShadow: 24,
                                 p: 4,
                                 borderRadius: 8
                              }}
                           >
                              <Typography textAlign={'center'}>Add Staff Work Experience</Typography>
                              <TextField
                                 name="ward_number"
                                 label="Staff Number"
                                 value={input1}
                                 onChange={text1}
                                 fullWidth
                                 margin="normal"
                              />
                              <TextField type='date'
                                 name="ward_name"
                                 label="Start Date"
                                 value={input2}
                                 onChange={text2}
                                 fullWidth
                                 margin="normal"
                              />
                               <TextField  type='date'
                                 name="ward_number"
                                 label="Finish Date"
                                 value={input3}
                                 onChange={text3}
                                 fullWidth
                                 margin="normal"
                              />
                              <TextField
                                 name="ward_name"
                                 label="Position"
                                 value={input4}
                                 onChange={text4}
                                 fullWidth
                                 margin="normal"
                              />
                               <TextField
                                 name="ward_name"
                                 label="Name of Organization"
                                 value={input5}
                                 onChange={text5}
                                 fullWidth
                                 margin="normal"
                              />

                              <Button onClick={handleAddPharmaceuticalModal} variant="contained" color="primary">
                                 Submit
                              </Button>
                           </Box>
                           </Modal>
                         
                           <Button
                        sx={{
                           height: '70%',
                           width: '7%',
                           marginLeft: '2%',
                           marginTop: '0.5%',
                           backgroundColor: '#26ABAA',
                           fontFamily: 'Nunito Sans, Sans-serif',
                           color: 'white'
                        }}
                        onClick={() => openWEModal()}
                        >
                        Update
                        </Button>

                        <Modal
                              open={updateWE}
                              onClose={closeWEModal}
                              aria-labelledby="modal1-modal-title"
                              aria-describedby="modal1-modal-description"
                              >
                              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                                 <Typography textAlign={'center'}>Update Staff Work Experience</Typography>
                                 <TextField
                                 name="ward_number"
                                 label="Staff Number"
                                 value={input1}
                                 onChange={text1}
                                 fullWidth
                                 margin="normal"
                              />
                              <TextField  type='date'
                                 name="ward_name"
                                 label="Start Date"
                                 value={input2}
                                 onChange={text2}
                                 fullWidth
                                 margin="normal"
                              />
                               <TextField  type='date'
                                 name="ward_number"
                                 label="Finish Date"
                                 value={input3}
                                 onChange={text3}
                                 fullWidth
                                 margin="normal"
                              />
                              <TextField
                                 name="ward_name"
                                 label="Position"
                                 value={input4}
                                 onChange={text4}
                                 fullWidth
                                 margin="normal"
                              />
                               <TextField
                                 name="ward_name"
                                 label="Name of Organization"
                                 value={input5}
                                 onChange={text5}
                                 fullWidth
                                 margin="normal"
                              />
                                 <Button onClick={handleWEupdate} >Update</Button>
                              </Box>
                              </Modal>
                         <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#FC696A',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}
                         onClick={openDeletePharmaceuticalModal}>
                            Delete
                         </Button>
                         <Modal
                           open={deletePharmaceuticalModal}
                           onClose={closeDeletePharmaceuticalModal}
                           aria-labelledby="modal-modal-title"
                           aria-describedby="modal-modal-description"
                           >
                           <Box
                              sx={{
                                 position: 'absolute',
                                 top: '50%',
                                 left: '50%',
                                 transform: 'translate(-50%, -50%)',
                                 width: 400,
                                 bgcolor: 'background.paper',
                                 boxShadow: 24,
                                 p: 4,
                                 borderRadius: 8
                              }}
                           >
                              <Typography textAlign={'center'}>Delete Staff Work Experience</Typography>
                              <TextField
                                 name="ward_number"
                                 label="Staff Number"
                                 value={input1}
                                 onChange={text1}
                                 fullWidth
                                 margin="normal"
                              />

                              <Button onClick={handleDeletePharmaceuticalModal} variant="contained" color="primary">
                                 Delete
                              </Button>
                           </Box>
                           </Modal>
                    </Box>
                    
                    {/* Display for Staff stable */}

                    <Box className='scrollable-container' sx={{
                        backgroundColor: 'white',
                        height: '37vh',
                        width: '100%',
                        
                    }}>
                     <table className="ward-content-table">
                        <thead>
                           {/* Destucture ang JSON */}
                           
                           <tr>
                              <th>Staff Number</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Start Date</th>
                              <th>Finish Date</th>
                              <th>Role</th>
                              <th>Name of Org.</th>
                             
                           </tr>
                        </thead>

                        <tbody>
                           {wardPharmaceuticalTable.map((wardphar) => 

                           <tr key={wardphar.staff_num}>
                              <td>{wardphar.staff_num}</td>
                              <td>{wardphar.first_name}</td>
                              <td>{wardphar.last_name}</td>
                              <td>{wardphar.start_date}</td>
                              <td>{wardphar.finish_date}</td>
                              <td>{wardphar.role}</td>
                              <td>{wardphar.name_of_org}</td>
                           </tr>
                           )}

                        </tbody>
                     </table>
                    </Box>
                </Box>
                
                 {/* Ward Pharmaceutical Supplies Requisition Container */}
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
                       Employment Contract
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
                         <Button
                           sx={{
                              height: '70%',
                              width: '7%',
                              marginLeft: '54%',
                              marginTop: '0.5%',
                              backgroundColor: '#26ABAA',
                              fontFamily: 'Nunito Sans, Sans-serif',
                              color: 'white'
                           }}
                           onClick={openAddPharmaRequestModal}
                           >
                           Add
                           </Button>
                           <Modal
                              open={addPharmaRequestModal}
                              onClose={closeAddPharmaRequestModal}
                              aria-labelledby="modal1-modal-title"
                              aria-describedby="modal1-modal-description"
                              >
                              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                              <Typography textAlign={'center'}>Add Employment Contract</Typography>
                                 <TextField
                                    label="Staff Number"
                                    value={input1}
                                    onChange={text1}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Work Hours"
                                    value={input2}
                                    onChange={text2}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Type of Contract"
                                    value={input3}
                                    onChange={text3}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField
                                    label="Type of Salary Payment"
                                    value={input4}
                                    onChange={text4}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <Button onClick={handleAddPharmaRequest}>Submit</Button>
                              </Box>
                              </Modal>
                           <Button
                        sx={{
                           height: '70%',
                           width: '7%',
                           marginLeft: '2%',
                           marginTop: '0.5%',
                           backgroundColor: '#26ABAA',
                           fontFamily: 'Nunito Sans, Sans-serif',
                           color: 'white'
                        }}
                        onClick={openUpdatePharmaRequestModal}
                        >
                        Update
                        </Button>
                        <Modal
                              open={updatePharmaRequestModal}
                              onClose={closeUpdatePharmaRequestModal}
                              aria-labelledby="modal1-modal-title"
                              aria-describedby="modal1-modal-description"
                              >
                              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                              <Typography textAlign={'center'}>Update Staff Employment Contract</Typography>
                                <TextField
                                    label="Staff Number"
                                    value={input1}
                                    onChange={text1}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Work Hours"
                                    value={input2}
                                    onChange={text2}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Type of Contract"
                                    value={input3}
                                    onChange={text3}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField
                                    label="Type of Salary Payment"
                                    value={input4}
                                    onChange={text4}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <Button onClick={handleUpdatePharmaRequest}>Update</Button>
                              </Box>
                              </Modal>
                         <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#FC696A',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}
                         onClick={openDeletePharmaRequestModal}>
                            Delete
                         </Button>
                         <Modal
                              open={deletePharmaRequestModal}
                              onClose={closeDeletePharmaRequestModal}
                              aria-labelledby="modal1-modal-title"
                              aria-describedby="modal1-modal-description"
                              >
                              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, maxHeight: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                              <Typography textAlign={'center'}>Delete Staff Employment Contract</Typography>                                 <TextField
                                    label="Staff Number"
                                    value={input1}
                                    onChange={text1}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <Button onClick={handleDeletePharmaRequest}>Delete</Button>
                              </Box>
                              </Modal>
                         
                    </Box>
                    
                    {/* Display for Staff stable */}

                    <Box className='scrollable-container' sx={{
                        backgroundColor: 'white',
                        height: '37vh',
                        width: '100%',  
                    }}>
                        <table className="ward-content-table">
                        <thead>
                           <tr>
                              <th>Staff Number</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Work Hours</th>
                              <th>Type of Contrcat</th>
                              <th>Type of Salary Payment</th>
                             
                           </tr>
                        </thead>

                        <tbody>
                           {
                              wardPharmRequestTable.map((staffEC) => 
                           <tr key={staffEC.staff_num}>
                              <td>{staffEC.staff_num}</td>
                              <td>{staffEC.first_name}</td>
                              <td>{staffEC.last_name}</td>
                              <td>{staffEC.work_hours}</td>
                              <td>{staffEC.type_of_contract}</td>
                              <td>{staffEC.type_of_salary_payment}</td>
                           </tr>
                           )}

                        </tbody>
                     </table>
                    </Box>
                </Box>


                 {/* Ward Surgical and Non-surgical Supplies Requisition Container */}
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
                       Staff Allocation
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
                         <Button
                           sx={{
                              height: '70%',
                              width: '7%',
                              marginLeft: '54%',
                              marginTop: '0.5%',
                              backgroundColor: '#26ABAA',
                              fontFamily: 'Nunito Sans, Sans-serif',
                              color: 'white'
                           }}
                           onClick={openAddSurgicalRequestModal}
                           >
                           Add
                           </Button>

                           
                           <Modal
                           open={addSurgicalRequestModal}
                           onClose={closeAddSurgicalRequestModal}
                           aria-labelledby="modal-modal-title"
                           aria-describedby="modal-modal-description"
                           >
                           <Box
                              sx={{
                                 position: 'absolute',
                                 top: '50%',
                                 left: '50%',
                                 transform: 'translate(-50%, -50%)',
                                 width: 400,
                                 bgcolor: 'background.paper',
                                 boxShadow: 24,
                                 p: 4,
                                 borderRadius: 8
                              }}
                           >
                              <Typography textAlign={'center'}>Add Staff Allocation</Typography>
                             <TextField
                                    label="Staff Number"
                                    value={input1}
                                    onChange={text1}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Ward Number"
                                    value={input2}
                                    onChange={text2}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Shift"
                                    value={input3}
                                    onChange={text3}
                                    fullWidth
                                    margin="normal"
                                 />

                              <Button onClick={handleAddSurgicalRequest} variant="contained" color="primary">
                                 Submit
                              </Button>
                           </Box>
                           </Modal>
                           <Button
                        sx={{
                           height: '70%',
                           width: '7%',
                           marginLeft: '2%',
                           marginTop: '0.5%',
                           backgroundColor: '#26ABAA',
                           fontFamily: 'Nunito Sans, Sans-serif',
                           color: 'white'
                        }}
                        onClick={openUpdateSurgicalRequestModal}>
                        Update
                        </Button>

                        {/* Modal for Updating Ward Surgical */}
                        <Modal
                              open={updateSurgicalRequestModal}
                              onClose={closeUpdateSurgicalRequestModal}
                              aria-labelledby="modal1-modal-title"
                              aria-describedby="modal1-modal-description"
                              >
                              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                              <Typography textAlign={'center'}>Update Staff Allocation</Typography>
                              <TextField
                                    label="Staff Number"
                                    value={input1}
                                    onChange={text1}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Ward Number"
                                    value={input2}
                                    onChange={text2}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Shift"
                                    value={input3}
                                    onChange={text3}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <Button onClick={handleUpdateSurgicalRequest}>Update</Button>
                              </Box>
                              </Modal>
                         <Button sx={{
                            height: '70%',
                            width: '7%',
                            marginLeft: '2%',
                            marginTop: '0.5%',
                            backgroundColor:'#FC696A',
                            fontFamily: 'Nunito Sans, Sans-serif',
                            color: 'white'
                         }}
                         onClick={openDeleteSurgicalRequestModal}>
                            Delete
                         </Button>

                         <Modal
                              open={deleteSurgicalRequestModal}
                              onClose={closeDeleteSurgicalRequestModal}
                              aria-labelledby="modal1-modal-title"
                              aria-describedby="modal1-modal-description"
                              >
                              <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, maxHeight: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
                              <Typography textAlign={'center'}>Delete Surgical/Nonsurgical Request</Typography>
                                 <TextField
                                    label="Staff Number"
                                    value={input1}
                                    onChange={text1}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <Button onClick={handleDeleteSurgicalRequest}>Delete</Button>
                              </Box>
                              </Modal>
                    </Box>
                    
                    {/* Display for Staff stable */}

                    <Box className='scrollable-container' sx={{
                        backgroundColor: 'white',
                        height: '37vh',
                        width: '100%',
                        
                    }}>
                     <table className="ward-content-table">
                        <thead>
                           <tr>
                              <th>Staff Number</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Ward Number</th>
                              <th>Ward Name</th>
                              <th>Shift</th>
                             
                           </tr>
                        </thead>

                        <tbody>
                           {
                              wardSurgRequestTable.map((staffAloc) => 
                           <tr key={staffAloc.staff_num}>
                              <td>{staffAloc.staff_num}</td>
                              <td>{staffAloc.first_name}</td>
                              <td>{staffAloc.last_name}</td>
                              <td>{staffAloc.ward_num}</td>
                              <td>{staffAloc.ward_name}</td>
                              <td>{staffAloc.shift}</td>
                           </tr>
                           )}

                        </tbody>
                     </table>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Staff;