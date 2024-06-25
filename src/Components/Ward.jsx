import './Ward.css'
import { Box, Button, InputAdornment, Modal, TextField, Typography} from '@mui/material';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import DashboardNavigation from './Navigations/DashboardNavigation';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { supabase } from '../client';
function Ward({token}){
  

   const [input1, setInput1] = useState('');
   const [input2, setInput2] = useState('');
   const [input3, setInput3] = useState('');
   const [input4, setInput4] = useState('');
   const [input5, setInput5] = useState('');
   const [input6, setInput6] = useState('');
   const text1 = (event) => setInput1(event.target.value);
   const text2 = (event) => setInput2(event.target.value);
   const text3 = (event) => setInput3(event.target.value);
   const text4 = (event) => setInput4(event.target.value);
   const text5 = (event) => setInput5(event.target.value);
   const text6 = (event) => setInput6(event.target.value);

   useEffect(() =>{
      fetchWard();
      fetchWardSupplies(); 
      fetchWardPharmaceutical();
      fetchWardPharmRequesition();
      fetchWardSurgRequesition();
   }, [])

   const [wardTable, setWardtable] = useState([])
   async function fetchWard(){
      const {data} = await supabase
      .from('ward')
      .select('*')
      setWardtable(data)
   }

   const [wardSuppliesTable, setWardSuppliesTable] = useState([]);
   async function fetchWardSupplies(){
      let { data, error } = await supabase
      .rpc('get_ward_surgical_supplies')
      if (error) alert(error)
      else setWardSuppliesTable(data)
   }

   const [wardPharmaceuticalTable, setWardPharmaceuticalTable] = useState([]);
   async function fetchWardPharmaceutical(){
      let { data, error } = await supabase
      .rpc('get_pharmaceutical_supplies_by_ward')
      if (error) alert(error)
      else setWardPharmaceuticalTable(data)
   }

   const [wardPharmRequestTable, setwardPharmRequest] = useState([]);
   async function fetchWardPharmRequesition(){
      
      let { data, error } = await supabase
      .rpc('get_ward_pharmaceutical_requisitions')
      if (error) alert(error)
      else setwardPharmRequest(data)

   }

   const [wardSurgRequestTable, setWardSurgRequestTable] = useState([]);
   async function fetchWardSurgRequesition(){
      
      let { data, error } = await supabase
      .rpc('get_ward_surgical_requisitions')
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
      .from('ward')
      .insert([
         {
      ward_num: input1,
      ward_name: input2,
      ward_location: input3,
      total_number_of_beds: input4,
      tel_extension_num : input5,
      staff_num : input6

      },
      ])
      .select()
      alert(error)
        
      closeWardModal(); // Close modal 1 after saving
      window.location.reload();

    };

   const handleWardUpdate = async() => {

      const { data, error } = await supabase
        .from('ward')
        .update(
         [{
          ward_name: input2,
          ward_location: input3,
          total_number_of_beds: input4,
          tel_extension_num: input5,
          staff_num: input6,
        }])
        .eq('ward_num', input1);
      closeUpdateWard()
      window.location.reload();

   }

   const handleWardDelete = async() => {
      
   const { error } = await supabase
   .from('ward')
   .delete()
   .eq('ward_num', input1)
   window.location.reload();

   }
    //Modal for Ward Surgical and Nonsurgical Supplies

   
   const [addSurgicalSuppliesModal, setAddSurgicalSuppliesModal] = useState(false);
   const [deleteSurgicalSuppliesModal, setDeleteSurgicalSuppliesModal] = useState(false);

   //Add Surgical Modal
   const openSurgicalModal = () => setAddSurgicalSuppliesModal(true);
   const closeSurgicalModal = () => setAddSurgicalSuppliesModal(false);

   
   //Delete Surgical Modal
   const openDeleteSurgicalModal = () => setDeleteSurgicalSuppliesModal(true);
   const closeDeleteSurgicalModal = () => setDeleteSurgicalSuppliesModal(false);

   const handleAddSurgicalModal = async() =>{
      const { data, error } = await supabase
      .from('ward_surgical_supplies')
      .insert([
        {
          ward_num: input1,
          item_number: input2,
        },
      ]); 
      closeSurgicalModal()
   }

   const handleDeleteSurgicalModal = async() =>{
      const { data, error } = await supabase
        .from('ward_surgical_supplies')
        .delete()
        .eq('ward_num', input1)
        .eq('item_number', input2);

        closeDeleteSurgicalModal()
   }

   //Modal for Ward Pharmaceutical Supplies

   const [addPharmaceuticalModal, setAddPharmaceuticalModal] = useState(false);
   const [deletePharmaceuticalModal, setDeletePharmaceuticalModal] = useState(false);

   //Add Pharmaceutical Modal
   const openAddPharmaceuticalModal = () =>  setAddPharmaceuticalModal(true);
   const closeAddPharmaceuticalModal = () =>  setAddPharmaceuticalModal(false);
  //Delete Pharmaceutical Modal
   const openDeletePharmaceuticalModal = () => setDeletePharmaceuticalModal(true);
   const closeDeletePharmaceuticalModal = () =>  setDeletePharmaceuticalModal(false);

   const handleAddPharmaceuticalModal = async() => {
      const { data, error } = await supabase
      .from('ward_pharmaceutical_supplies')
      .insert([
        {
          ward_num: input1,
          drug_num: input2,
        },
      ]); 
      closeAddPharmaceuticalModal()
   }


   const handleDeletePharmaceuticalModal = async() => {
      const { data, error } = await supabase
        .from('ward_pharmaceutical_supplies')
        .delete()
        .eq('ward_num', input1)
        .eq('drug_num', input2);
        closeDeletePharmaceuticalModal()
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
      .from('ward_pharmaceutical_requisition')
      .insert([
        {
          requisition_name: input1,
          ward_num: input2,
          drug_num: input3,
          date_ordered: input4,
        },
      ]); 
      closeAddPharmaRequestModal()
   }

   const handleUpdatePharmaRequest = async() => {
      const { data, error } = await supabase
        .from('ward_pharmaceutical_requisition')
        .update(
         [{
            requisition_name: input1,
            ward_num: input2,
            drug_num: input3,
            date_ordered: input4,
        }])
        .eq('pharma_requisition_num', input5);
      closeUpdatePharmaRequestModal()
   }

   const handleDeletePharmaRequest = async() => {
      const { error } = await supabase
      .from('ward_pharmaceutical_requisition')
      .delete()
      .eq('pharma_requisition_num', input1)
      closeDeletePharmaRequestModal()
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
      .from('ward_surgical_requisition')
      .insert([
        {
          requisition_name: input1,
          ward_num: input2,
          item_number: input3,
          date_ordered: input4,
        },
      ]); 
      console.log(error)
      closeAddSurgicalRequestModal()
   }

   const handleUpdateSurgicalRequest = async() => {
      const { data, error } = await supabase
        .from('ward_surgical_requisition')
        .update(
         [{
            requisition_name: input1,
            ward_num: input2,
            item_number: input3,
            date_ordered: input4,
        }])
        .eq('surgical_requisition_num', input5);
        closeUpdateSurgicalRequestModal()
   }

   const handleDeleteSurgicalRequest = async() => {
      const { error } = await supabase
      .from('ward_surgical_requisition')
      .delete()
      .eq('surgical_requisition_num', input1)
      closeDeleteSurgicalRequestModal()
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
                        Ward
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
                              <Typography textAlign={'center'}>Add Ward</Typography>
                                 <TextField
                                    label="Ward Number"
                                    value={input1}
                                    onChange={text1}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Ward Name"
                                    value={input2}
                                    onChange={text2}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Ward Location"
                                    value={input3}
                                    onChange={text3}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField
                                    label="Number of Beds"
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
                                  <TextField
                                    label="Charge Nurse"
                                    value={input6}
                                    onChange={text6}
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
                                 <Typography textAlign={'center'}>Update Ward</Typography>
                                 <TextField
                                    label="Ward Number"
                                    value={input1}
                                    onChange={text1}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Ward Name"
                                    value={input2}
                                    onChange={text2}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Ward Location"
                                    value={input3}
                                    onChange={text3}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField
                                    label="Number of Beds"
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
                                  <TextField
                                    label="Charge Nurse"
                                    value={input6}
                                    onChange={text6}
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
                                 <Typography textAlign={'center'}>Delete Ward</Typography>
                                 <TextField
                                    label="Ward Number"
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
                              <th>Ward Number</th>
                              <th>Ward Name</th>
                              <th>Ward Location</th>
                              <th>Number of Beds</th>
                              <th>Telephone ext. Number</th>
                              <th>Charge Nurse</th>
                             
                           </tr>
                        </thead>

                        <tbody>  
                           { wardTable.map((attri) =>  
                              <tr key={attri.tel_extension_num}>
                                 <td>{attri.ward_num}</td>
                                 <td>{attri.ward_name}</td>
                                 <td>{attri.ward_location}</td>
                                 <td>{attri.total_number_of_beds}</td>
                                 <td>{attri.tel_extension_num}</td>
                                 <td>{attri.staff_num}</td>
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
                        Ward Surgical and Non-surgical Supplies
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
                              <Typography textAlign={'center'}>Add Ward Surgical/Nonsurgical Supplies</Typography>
                              <TextField
                              name="ward_number"
                              label="Ward Number"
                              value={input1}
                              onChange={text1}
                              fullWidth
                              margin="normal"
                           />
                           <TextField
                              name="item_number"
                              label="Item Number"
                              value={input2}
                              onChange={text2}
                              fullWidth
                              margin="normal"
                           />

                              <Button onClick={handleAddSurgicalModal} variant="contained" color="primary">
                                 Submit
                              </Button>
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
                              <Typography textAlign={'center'}>Delete Ward Surgical/Nonsurgical Supplies</Typography>
                              <TextField
                              name="ward_number"
                              label="Ward Number"
                              value={input1}
                              onChange={text1}
                              fullWidth
                              margin="normal"
                           />
                           <TextField
                              name="item_number"
                              label="Item Number"
                              value={input2}
                              onChange={text2}
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
                              <th>Ward Number</th>
                              <th>Ward Name</th>
                              <th>Item Number</th>
                              <th>Item Name</th>
                              <th>Item Description</th>
                              <th>Quantity in Stock</th>
                             
                           </tr>
                        </thead>

                        <tbody>
                          { wardSuppliesTable.map((wardsupp) => 
                           <tr key={wardsupp.ward_num}>
                              <td>{wardsupp.ward_num}</td>
                              <td>{wardsupp.ward_name}</td>
                              <td>{wardsupp.item_number}</td>
                              <td>{wardsupp.item_name}</td>
                              <td>{wardsupp.item_description}</td>
                              <td>{wardsupp.quantity_in_stock}</td>
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
                        Ward Pharmaceutical Supplies 
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
                              <Typography textAlign={'center'}>Add Ward Pharmaceutical Supplies</Typography>
                              <TextField
                                 name="ward_number"
                                 label="Ward Number"
                                 value={input1}
                                 onChange={text1}
                                 fullWidth
                                 margin="normal"
                              />
                              <TextField
                                 name="ward_name"
                                 label="Drug Number"
                                 value={input2}
                                 onChange={text2}
                                 fullWidth
                                 margin="normal"
                              />

                              <Button onClick={handleAddPharmaceuticalModal} variant="contained" color="primary">
                                 Submit
                              </Button>
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
                              <Typography textAlign={'center'}>Delete Ward Pharmaceutical Supplies</Typography>
                              <TextField
                                 name="ward_number"
                                 label="Ward Number"
                                 value={input1}
                                 onChange={text1}
                                 fullWidth
                                 margin="normal"
                              />
                              <TextField
                                 name="ward_name"
                                 label="Drug Number"
                                 value={input2}
                                 onChange={text2}
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
                              <th>Ward Number</th>
                              <th>Ward Name</th>
                              <th>Drug Number</th>
                              <th>Drug Name</th>
                              <th>Method of Administration</th>
                              <th>Quantity in Stock</th>
                             
                           </tr>
                        </thead>

                        <tbody>
                           {wardPharmaceuticalTable.map((wardphar) => 

                           <tr key={wardphar.ward_num}>
                              <td>{wardphar.ward_num}</td>
                              <td>{wardphar.ward_name}</td>
                              <td>{wardphar.drug_num}</td>
                              <td>{wardphar.drug_name}</td>
                              <td>{wardphar.method_of_admin}</td>
                              <td>{wardphar.quantity_in_stock}</td>
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
                       Ward Pharmaceutical Supplies Requisition
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
                              <Typography textAlign={'center'}>Add Ward Pharmaceutical Request</Typography>
                                 <TextField
                                    label="Requisition Name"
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
                                    label="Drug Number"
                                    value={input3}
                                    onChange={text3}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField type='date'
                                    label="Date Ordered"
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
                              <Typography textAlign={'center'}>Update Ward Pharmaceutical Request</Typography>                              <TextField
                                    label="Requisition Number"
                                    value={input5}
                                    onChange={text5}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Requisition Name"
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
                                    label="Drug Number"
                                    value={input3}
                                    onChange={text3}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField type='date'
                                    label="Date Ordered"
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
                              <Typography textAlign={'center'}>Delete Ward Pharmaceutical Request</Typography>                                 <TextField
                                    label="Requisition Number"
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
                              <th>Requisition Number</th>
                              <th>Requisition Name</th>
                              <th>Ward Number</th>
                              <th>Ward Name</th>
                              <th>Drug Number</th>
                              <th>Drug Name</th>
                              <th>Quantity</th>
                              <th>Date Ordered</th>
                             
                           </tr>
                        </thead>

                        <tbody>
                           {
                              wardPharmRequestTable.map((phareq) => 
                           <tr key={phareq.pharma_requisition_num}>
                              <td>{phareq.requisition_num}</td>
                              <td>{phareq.requisition_name}</td>
                              <td>{phareq.ward_num}</td>
                              <td>{phareq.ward_name}</td>
                              <td>{phareq.drug_num}</td>
                              <td>{phareq.drug_name}</td>
                              <td>{phareq.quantity}</td>
                              <td>{phareq.date_ordered}</td>
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
                       Ward Surgical and Non-surgical Supplies Requisition
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
                              <Typography textAlign={'center'}>Add Surgical/NonSurgical Supplies Request</Typography>
                             <TextField
                                    label="Requisition Name"
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
                                    label="Item Number"
                                    value={input3}
                                    onChange={text3}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField type='date'
                                    label="Date Ordered"
                                    value={input4}
                                    onChange={text4}
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
                              <Typography textAlign={'center'}>Update Surgical/NonSurgical Supplies Request</Typography>
                                 <TextField
                                    label="Requisition Number"
                                    value={input5}
                                    onChange={text5}
                                    fullWidth
                                    margin="normal"
                                 />
                                 <TextField
                                    label="Requisition Name"
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
                                    label="Item Number"
                                    value={input3}
                                    onChange={text3}
                                    fullWidth
                                    margin="normal"
                                 />
                                  <TextField type='date'
                                    label="Date Ordered"
                                    value={input4}
                                    onChange={text4}
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
                                    label="Requisition Number"
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
                              <th>Requisition Number</th>
                              <th>Requisition Name</th>
                              <th>Ward Number</th>
                              <th>Ward Name</th>
                              <th>Item Number</th>
                              <th>Item Name</th>
                              <th>Quantity</th>
                              <th>Date Ordered</th>
                             
                           </tr>
                        </thead>

                        <tbody>
                           {
                              wardSurgRequestTable.map((surgreq) => 
                           <tr key={surgreq.surgical_requisition_num}>
                              <td>{surgreq.surgical_requisition_num}</td>
                              <td>{surgreq.requisition_name}</td>
                              <td>{surgreq.ward_num}</td>
                              <td>{surgreq.ward_name}</td>
                              <td>{surgreq.item_number}</td>
                              <td>{surgreq.item_name}</td>
                              <td>{surgreq.quantity}</td>
                              <td>{surgreq.date_ordered}</td>
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

export default Ward;