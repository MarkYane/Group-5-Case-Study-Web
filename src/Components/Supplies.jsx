// File path: src/components/Supplies.js
import './Supplies.css';
import { Box, Button, TextField, Typography, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import DashboardNavigation from './Navigations/DashboardNavigation';
import { supabase } from '../client';
import { Link } from 'react-router-dom';

function Supplies() {
   const [pharmaceuticalSupplies, setPharmaceuticalSupplies] = useState([]);
   const [surgicalSupplies, setSurgicalSupplies] = useState([]);
   const [suppliers, setSuppliers] = useState([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
   const [open, setOpen] = useState({
      pharmaceutical: false,
      surgical: false,
      supplier: false,
      deletePharmaceutical: false,
      deleteSurgical: false,
      deleteSupplier: false,
      updatePharmaceutical: false,
      updateSurgical: false,
      updateSupplier: false,
   });
   const [newPharmaceuticalSupply, setNewPharmaceuticalSupply] = useState({
      drug_num: '',
      name: '',
      drug_description: '',
      dosage: '',
      method_of_admin: '',
      quantity_in_stock: '',
      reorder_level: '',
      cost_per_unit: '',
      supplier_number: '',
   });
   const [newSurgicalSupply, setNewSurgicalSupply] = useState({
      item_number: '',
      name: '',
      item_description: '',
      quantity_in_stock: '',
      reorder_level: '',
      cost_per_unit: '',
      supplier_number: '',
   });
   const [newSupplier, setNewSupplier] = useState({
      supplier_number: '',
      name: '',
      address: '',
      tel_num: '',
      fax_num: '',
   });
   const [deleteIdentifier, setDeleteIdentifier] = useState('');
   const [updatePharmaceuticalSupply, setUpdatePharmaceuticalSupply] = useState({
      drug_num: '',
      name: '',
      drug_description: '',
      dosage: '',
      method_of_admin: '',
      quantity_in_stock: '',
      reorder_level: '',
      cost_per_unit: '',
      supplier_number: '',
   });
   const [updateSurgicalSupply, setUpdateSurgicalSupply] = useState({
      item_number: '',
      name: '',
      item_description: '',
      quantity_in_stock: '',
      reorder_level: '',
      cost_per_unit: '',
      supplier_number: '',
   });
   const [updateSupplier, setUpdateSupplier] = useState({
      supplier_number: '',
      name: '',
      address: '',
      tel_num: '',
      fax_num: '',
   });

   useEffect(() => {
      fetchSupplies();
   }, []);

   async function fetchSupplies() {
      setLoading(true);
      try {
         const { data: pharmaceuticalData, error: pharmaceuticalError } = await supabase
            .from('pharmaceutical_supplies')
            .select('*');
         if (pharmaceuticalError) throw pharmaceuticalError;

         const { data: surgicalData, error: surgicalError } = await supabase
            .from('surgical_nonsurgical_supplies')
            .select('*');
         if (surgicalError) throw surgicalError;

         const { data: suppliersData, error: suppliersError } = await supabase
            .from('suppliers')
            .select('*');
         if (suppliersError) throw suppliersError;

         setPharmaceuticalSupplies(pharmaceuticalData);
         setSurgicalSupplies(surgicalData);
         setSuppliers(suppliersData);
      } catch (error) {
         setError(error.message);
      } finally {
         setLoading(false);
      }
   }

   const handleOpen = (type) => setOpen({ ...open, [type]: true });
   const handleClose = (type) => setOpen({ ...open, [type]: false });
   const handleChange = (e, setFunction) => setFunction((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));

   const handleSubmitPharmaceutical = async () => {
      try {
         const { data, error } = await supabase
            .from('pharmaceutical_supplies')
            .insert([newPharmaceuticalSupply]);
         if (error) throw error;
         fetchSupplies();
         handleClose('pharmaceutical');
      } catch (error) {
         setError(error.message);
      }
   };

   const handleSubmitSurgical = async () => {
      try {
         const { data, error } = await supabase
            .from('surgical_nonsurgical_supplies')
            .insert([newSurgicalSupply]);
         if (error) throw error;
         fetchSupplies();
         handleClose('surgical');
      } catch (error) {
         setError(error.message);
      }
   };

   const handleSubmitSupplier = async () => {
      try {
         const { data, error } = await supabase
            .from('suppliers')
            .insert([newSupplier]);
         if (error) throw error;
         fetchSupplies();
         handleClose('supplier');
      } catch (error) {
         setError(error.message);
      }
   };
   const handleDelete = async (type) => {
      try {
         let table;
         let identifier;

         switch (type) {
            case 'pharmaceutical':
               table = 'pharmaceutical_supplies';
               identifier = 'drug_num';
               break;
            case 'surgical':
               table = 'surgical_nonsurgical_supplies';
               identifier = 'item_number';
               break;
            case 'supplier':
               table = 'suppliers';
               identifier = 'supplier_number';
               break;
            default:
               throw new Error('Invalid type');
         }

         const { error } = await supabase
            .from(table)
            .delete()
            .eq(identifier, deleteIdentifier);

         if (error) throw error;

         fetchSupplies();
         handleClose(`delete${type.charAt(0).toUpperCase() + type.slice(1)}`);
      } catch (error) {
         setError(error.message);
      }
   };

   const handleSubmitUpdatePharmaceutical = async () => {
      try {
         const { error } = await supabase
            .from('pharmaceutical_supplies')
            .update(updatePharmaceuticalSupply)
            .eq('drug_num', updatePharmaceuticalSupply.drug_num);

         if (error) throw error;

         fetchSupplies();
         handleClose('updatePharmaceutical');
      } catch (error) {
         setError(error.message);
      }
   };

   const handleSubmitUpdateSurgical = async () => {
      try {
         const { error } = await supabase
            .from('surgical_nonsurgical_supplies')
            .update(updateSurgicalSupply)
            .eq('item_number', updateSurgicalSupply.item_number);

         if (error) throw error;

         fetchSupplies();
         handleClose('updateSurgical');
      } catch (error) {
         setError(error.message);
      }
   };

   const handleSubmitUpdateSupplier = async () => {
      try {
         const { error } = await supabase
            .from('suppliers')
            .update(updateSupplier)
            .eq('supplier_number', updateSupplier.supplier_number);

         if (error) throw error;

         fetchSupplies();
         handleClose('updateSupplier');
      } catch (error) {
         setError(error.message);
      }
   };

   return (
      <Box
         sx={{
            maxHeight: '1000vh',
            width: '100%',
            backgroundColor: '#E7F3F5',
            display: 'flex',
            flexWrap: 'wrap',
            alignContent: 'flex-start',
         }}
      >
         <DashboardNavigation />

         {/* Pharmaceutical Supplies Container */}
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
               border: '0px solid black',
            }}
         >
            <Typography
               variant='h4'
               sx={{
                  fontFamily: 'Nunito Sans, Sans-serif',
                  marginBottom: '1%',
                  fontWeight: 'bold',
                  backgroundColor: '#E7F3F5',
                  width: '100%',
               }}
            >
               Pharmaceutical Supplies
            </Typography>
            <Box
               sx={{
                  height: '4vh',
                  width: '100%',
                  backgroundColor: 'white',
                  display: 'flex',
                  paddingLeft: '2%',
               }}
            >
               <SearchIcon sx={{ color: 'action.active', mr: 0, my: 2.6 }} />
               <TextField size='medium' id='input-with-sx' label='Enter drug number' variant='standard' />
               <Button
                  sx={{
                     height: '70%',
                     width: '7%',
                     marginLeft: '2%',
                     marginTop: '0.5%',
                     backgroundColor: '#26ABAA',
                     fontFamily: 'Nunito Sans, Sans-serif',
                     color: 'white',
                  }}
               >
                  Search
               </Button>
               <Button
                  onClick={() => handleOpen('pharmaceutical')}
                  sx={{
                     height: '70%',
                     width: '7%',
                     marginLeft: '54%',
                     marginTop: '0.5%',
                     backgroundColor: '#26ABAA',
                     fontFamily: 'Nunito Sans, Sans-serif',
                     color: 'white',
                  }}
               >
                  Add
               </Button>
               <Button
                  onClick={() => handleOpen('updatePharmaceutical')}
                  sx={{
                     height: '70%',
                     width: '7%',
                     marginLeft: '2%',
                     marginTop: '0.5%',
                     backgroundColor: '#26ABAA',
                     fontFamily: 'Nunito Sans, Sans-serif',
                     color: 'white',
                  }}
               >
                  Update
               </Button>
               <Button
                  onClick={() => handleOpen('deletePharmaceutical')}
                  sx={{
                     height: '70%',
                     width: '7%',
                     marginLeft: '2%',
                     marginTop: '0.5%',
                     backgroundColor: '#FC696A',
                     fontFamily: 'Nunito Sans, Sans-serif',
                     color: 'white',
                  }}
               >
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
                           <th>Drug Number</th>
                           <th>Name</th>
                           <th>Description</th>
                           <th>Dosage</th>
                           <th>Method of Admin.</th>
                           <th>Stock</th>
                           <th>Reorder Level</th>
                           <th>Cost Per Unit</th>
                           <th>Supplier Number</th>
                        </tr>
                     </thead>
                     <tbody>
                        {pharmaceuticalSupplies.map((drug) => (
                           <tr key={drug.drug_num}>
                              <td>{drug.drug_num}</td>
                              <td>{drug.name}</td>
                              <td>{drug.drug_description}</td>
                              <td>{drug.dosage}</td>
                              <td>{drug.method_of_admin}</td>
                              <td>{drug.quantity_in_stock}</td>
                              <td>{drug.reorder_level}</td>
                              <td>{drug.cost_per_unit}</td>
                              <td>{drug.supplier_number}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               )}
            </Box>
         </Box>

         <Modal
            open={open.pharmaceutical}
            onClose={() => handleClose('pharmaceutical')}
            aria-labelledby='add-pharmaceutical-modal'
            aria-describedby='modal-to-add-new-pharmaceutical-supply'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 800,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography textAlign='center' id='add-pharmaceutical-modal' variant='h6' component='h2'>
                  Add New Pharmaceutical Supply
               </Typography>
               <TextField
                  label='Drug Number'
                  variant='outlined'
                  fullWidth
                  name='drug_num'
                  value={newPharmaceuticalSupply.drug_num}
                  onChange={(e) => handleChange(e, setNewPharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Name'
                  variant='outlined'
                  fullWidth
                  name='name'
                  value={newPharmaceuticalSupply.name}
                  onChange={(e) => handleChange(e, setNewPharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Description'
                  variant='outlined'
                  fullWidth
                  name='drug_description'
                  value={newPharmaceuticalSupply.drug_description}
                  onChange={(e) => handleChange(e, setNewPharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Dosage'
                  variant='outlined'
                  fullWidth
                  name='dosage'
                  value={newPharmaceuticalSupply.dosage}
                  onChange={(e) => handleChange(e, setNewPharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Method of Administration'
                  variant='outlined'
                  fullWidth
                  name='method_of_admin'
                  value={newPharmaceuticalSupply.method_of_admin}
                  onChange={(e) => handleChange(e, setNewPharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Quantity in Stock'
                  variant='outlined'
                  fullWidth
                  name='quantity_in_stock'
                  value={newPharmaceuticalSupply.quantity_in_stock}
                  onChange={(e) => handleChange(e, setNewPharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Reorder Level'
                  variant='outlined'
                  fullWidth
                  name='reorder_level'
                  value={newPharmaceuticalSupply.reorder_level}
                  onChange={(e) => handleChange(e, setNewPharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Cost Per Unit'
                  variant='outlined'
                  fullWidth
                  name='cost_per_unit'
                  value={newPharmaceuticalSupply.cost_per_unit}
                  onChange={(e) => handleChange(e, setNewPharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Supplier Number'
                  variant='outlined'
                  fullWidth
                  name='supplier_number'
                  value={newPharmaceuticalSupply.supplier_number}
                  onChange={(e) => handleChange(e, setNewPharmaceuticalSupply)}
                  margin='normal'
               />
               <Button
                  onClick={handleSubmitPharmaceutical}
                  variant='contained'
                 
                  sx={{ mt: 2, backgroundColor:'#2CAFA4', marginLeft: '0%' }}
               >
                  Add
               </Button>
               <Button
                  onClick={handleSubmitPharmaceutical}
                  variant='contained'
                 
                  sx={{ mt: 2, backgroundColor:'#2CAFA4', marginLeft: '0%' }}
               >
                  Closed
               </Button>

               <Button
                  component={Link}
                  to='/supplies'
                  variant='contained'
                 
                  sx={{ mt: 2, backgroundColor:'#FC696A', marginLeft: '2%'  }}
               >
                  Cancel
               </Button>
            </Box>
         </Modal>

         <Modal
            open={open.deletePharmaceutical}
            onClose={() => handleClose('deletePharmaceutical')}
            aria-labelledby='delete-pharmaceutical-modal'
            aria-describedby='modal-to-delete-pharmaceutical-supply'
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
               <Typography id='delete-pharmaceutical-modal' variant='h6' component='h2'>
                  Delete Pharmaceutical Supply
               </Typography>
               <TextField
                  label='Drug Number'
                  variant='outlined'
                  fullWidth
                  name='drug_num'
                  value={deleteIdentifier}
                  onChange={(e) => setDeleteIdentifier(e.target.value)}
                  margin='normal'
               />
               <Button
                  onClick={() => handleDelete('pharmaceutical')}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Delete
               </Button>
            </Box>
         </Modal>

         <Modal
            open={open.updatePharmaceutical}
            onClose={() => handleClose('updatePharmaceutical')}
            aria-labelledby='update-pharmaceutical-modal'
            aria-describedby='modal-to-update-pharmaceutical-supply'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 800,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography textAlign="center"id='update-pharmaceutical-modal' variant='h6' component='h2'>
                  Update Pharmaceutical Supply
               </Typography>
               <TextField
                  label='Drug Number'
                  variant='outlined'
                  fullWidth
                  name='drug_num'
                  value={updatePharmaceuticalSupply.drug_num}
                  onChange={(e) => handleChange(e, setUpdatePharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Name'
                  variant='outlined'
                  fullWidth
                  name='name'
                  value={updatePharmaceuticalSupply.name}
                  onChange={(e) => handleChange(e, setUpdatePharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Description'
                  variant='outlined'
                  fullWidth
                  name='drug_description'
                  value={updatePharmaceuticalSupply.drug_description}
                  onChange={(e) => handleChange(e, setUpdatePharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Dosage'
                  variant='outlined'
                  fullWidth
                  name='dosage'
                  value={updatePharmaceuticalSupply.dosage}
                  onChange={(e) => handleChange(e, setUpdatePharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Method of Administration'
                  variant='outlined'
                  fullWidth
                  name='method_of_admin'
                  value={updatePharmaceuticalSupply.method_of_admin}
                  onChange={(e) => handleChange(e, setUpdatePharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Quantity in Stock'
                  variant='outlined'
                  fullWidth
                  name='quantity_in_stock'
                  value={updatePharmaceuticalSupply.quantity_in_stock}
                  onChange={(e) => handleChange(e, setUpdatePharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Reorder Level'
                  variant='outlined'
                  fullWidth
                  name='reorder_level'
                  value={updatePharmaceuticalSupply.reorder_level}
                  onChange={(e) => handleChange(e, setUpdatePharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Cost Per Unit'
                  variant='outlined'
                  fullWidth
                  name='cost_per_unit'
                  value={updatePharmaceuticalSupply.cost_per_unit}
                  onChange={(e) => handleChange(e, setUpdatePharmaceuticalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Supplier Number'
                  variant='outlined'
                  fullWidth
                  name='supplier_number'
                  value={updatePharmaceuticalSupply.supplier_number}
                  onChange={(e) => handleChange(e, setUpdatePharmaceuticalSupply)}
                  margin='normal'
               />
               <Button
                  onClick={handleSubmitUpdatePharmaceutical}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Update
               </Button>
            </Box>
         </Modal>

         {/* Surgical Supplies Container */}
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
               border: '0px solid black',
            }}
         >
            <Typography
               variant='h4'
               sx={{
                  fontFamily: 'Nunito Sans, Sans-serif',
                  marginBottom: '1%',
                  fontWeight: 'bold',
                  backgroundColor: '#E7F3F5',
                  width: '100%',
               }}
            >
               Surgical Supplies
            </Typography>
            <Box
               sx={{
                  height: '4vh',
                  width: '100%',
                  backgroundColor: 'white',
                  display: 'flex',
                  paddingLeft: '2%',
               }}
            >
               <SearchIcon sx={{ color: 'action.active', mr: 0, my: 2.6 }} />
               <TextField size='medium' id='input-with-sx' label='Enter item number' variant='standard' />
               <Button
                  sx={{
                     height: '70%',
                     width: '7%',
                     marginLeft: '2%',
                     marginTop: '0.5%',
                     backgroundColor: '#26ABAA',
                     fontFamily: 'Nunito Sans, Sans-serif',
                     color: 'white',
                  }}
               >
                  Search
               </Button>
               <Button
                  onClick={() => handleOpen('surgical')}
                  sx={{
                     height: '70%',
                     width: '7%',
                     marginLeft: '54%',
                     marginTop: '0.5%',
                     backgroundColor: '#26ABAA',
                     fontFamily: 'Nunito Sans, Sans-serif',
                     color: 'white',
                  }}
               >
                  Add
               </Button>
               <Button
                  onClick={() => handleOpen('updateSurgical')}
                  sx={{
                     height: '70%',
                     width: '7%',
                     marginLeft: '2%',
                     marginTop: '0.5%',
                     backgroundColor: '#26ABAA',
                     fontFamily: 'Nunito Sans, Sans-serif',
                     color: 'white',
                  }}
               >
                  Update
               </Button>
               <Button
                  onClick={() => handleOpen('deleteSurgical')} 
                  sx={{
                     height: '70%',
                     width: '7%',
                     marginLeft: '2%',
                     marginTop: '0.5%',
                     backgroundColor: '#FC696A',
                     fontFamily: 'Nunito Sans, Sans-serif',
                     color: 'white',
                  }}
               >
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
                           <th>Item Number</th>
                           <th>Name</th>
                           <th>Description</th>
                           <th>Stock</th>
                           <th>Reorder Level</th>
                           <th>Cost Per Unit</th>
                           <th>Supplier Number</th>
                        </tr>
                     </thead>
                     <tbody>
                        {surgicalSupplies.map((item) => (
                           <tr key={item.item_number}>
                              <td>{item.item_number}</td>
                              <td>{item.name}</td>
                              <td>{item.item_description}</td>
                              <td>{item.quantity_in_stock}</td>
                              <td>{item.reorder_level}</td>
                              <td>{item.cost_per_unit}</td>
                              <td>{item.supplier_number}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               )}
            </Box>
         </Box>

         <Modal
            open={open.surgical}
            onClose={() => handleClose('surgical')}
            aria-labelledby='add-surgical-modal'
            aria-describedby='modal-to-add-new-surgical-supply'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 800,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography textAlign='center' id='add-surgical-modal' variant='h6' component='h2'>
                  Add New Surgical Supply
               </Typography>
               <TextField
                  label='Item Number'
                  variant='outlined'
                  fullWidth
                  name='item_number'
                  value={newSurgicalSupply.item_number}
                  onChange={(e) => handleChange(e, setNewSurgicalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Name'
                  variant='outlined'
                  fullWidth
                  name='name'
                  value={newSurgicalSupply.name}
                  onChange={(e) => handleChange(e, setNewSurgicalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Description'
                  variant='outlined'
                  fullWidth
                  name='item_description'
                  value={newSurgicalSupply.item_description}
                  onChange={(e) => handleChange(e, setNewSurgicalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Quantity in Stock'
                  variant='outlined'
                  fullWidth
                  name='quantity_in_stock'
                  value={newSurgicalSupply.quantity_in_stock}
                  onChange={(e) => handleChange(e, setNewSurgicalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Reorder Level'
                  variant='outlined'
                  fullWidth
                  name='reorder_level'
                  value={newSurgicalSupply.reorder_level}
                  onChange={(e) => handleChange(e, setNewSurgicalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Cost Per Unit'
                  variant='outlined'
                  fullWidth
                  name='cost_per_unit'
                  value={newSurgicalSupply.cost_per_unit}
                  onChange={(e) => handleChange(e, setNewSurgicalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Supplier Number'
                  variant='outlined'
                  fullWidth
                  name='supplier_number'
                  value={newSurgicalSupply.supplier_number}
                  onChange={(e) => handleChange(e, setNewSurgicalSupply)}
                  margin='normal'
               />
               <Button
                  onClick={handleSubmitSurgical}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Add
               </Button>
               </Box>
         </Modal>

         <Modal
            open={open.deleteSurgical}
            onClose={() => handleClose('deleteSurgical')}
            aria-labelledby='delete-surgical-modal'
            aria-describedby='modal-to-delete-surgical-supply'
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
               <Typography id='delete-surgical-modal' variant='h6' component='h2'>
                  Delete Surgical Supply
               </Typography>
               <TextField
                  label='Item Number'
                  variant='outlined'
                  fullWidth
                  name='item_number'
                  value={deleteIdentifier}
                  onChange={(e) => setDeleteIdentifier(e.target.value)}
                  margin='normal'
               />
               <Button
                  onClick={() => handleDelete('surgical')}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Delete
               </Button>
            </Box>
         </Modal>

         <Modal
            open={open.updateSurgical}
            onClose={() => handleClose('updateSurgical')}
            aria-labelledby='update-surgical-modal'
            aria-describedby='modal-to-update-surgical-supply'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 800,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography textAlign="center"id='update-surgical-modal' variant='h6' component='h2'>
                  Update Surgical Supply
               </Typography>
               <TextField
                  label='Item Number'
                  variant='outlined'
                  fullWidth
                  name='item_number'
                  value={updateSurgicalSupply.item_number}
                  onChange={(e) => handleChange(e, setUpdateSurgicalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Name'
                  variant='outlined'
                  fullWidth
                  name='name'
                  value={updateSurgicalSupply.name}
                  onChange={(e) => handleChange(e, setUpdateSurgicalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Description'
                  variant='outlined'
                  fullWidth
                  name='item_description'
                  value={updateSurgicalSupply.item_description}
                  onChange={(e) => handleChange(e, setUpdateSurgicalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Quantity in Stock'
                  variant='outlined'
                  fullWidth
                  name='quantity_in_stock'
                  value={updateSurgicalSupply.quantity_in_stock}
                  onChange={(e) => handleChange(e, setUpdateSurgicalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Reorder Level'
                  variant='outlined'
                  fullWidth
                  name='reorder_level'
                  value={updateSurgicalSupply.reorder_level}
                  onChange={(e) => handleChange(e, setUpdateSurgicalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Cost Per Unit'
                  variant='outlined'
                  fullWidth
                  name='cost_per_unit'
                  value={updateSurgicalSupply.cost_per_unit}
                  onChange={(e) => handleChange(e, setUpdateSurgicalSupply)}
                  margin='normal'
               />
               <TextField
                  label='Supplier Number'
                  variant='outlined'
                  fullWidth
                  name='supplier_number'
                  value={updateSurgicalSupply.supplier_number}
                  onChange={(e) => handleChange(e, setUpdateSurgicalSupply)}
                  margin='normal'
               />
               <Button
                  onClick={handleSubmitUpdateSurgical}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Update
               </Button>
            </Box>
         </Modal>


         {/* Suppliers Container */}
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
               border: '0px solid black',
            }}
         >
            <Typography
               variant='h4'
               sx={{
                  fontFamily: 'Nunito Sans, Sans-serif',
                  marginBottom: '1%',
                  fontWeight: 'bold',
                  backgroundColor: '#E7F3F5',
                  width: '100%',
               }}
            >
               Suppliers
            </Typography>
            <Box
               sx={{
                  height: '4vh',
                  width: '100%',
                  backgroundColor: 'white',
                  display: 'flex',
                  paddingLeft: '2%',
               }}
            >
               <SearchIcon sx={{ color: 'action.active', mr: 0, my: 2.6 }} />
               <TextField size='medium' id='input-with-sx' label='Enter supplier number' variant='standard' />
               <Button
                  sx={{
                     height: '70%',
                     width: '7%',
                     marginLeft: '2%',
                     marginTop: '0.5%',
                     backgroundColor: '#26ABAA',
                     fontFamily: 'Nunito Sans, Sans-serif',
                     color: 'white',
                  }}
               >
                  Search
               </Button>
               <Button
                  onClick={() => handleOpen('supplier')}
                  sx={{
                     height: '70%',
                     width: '7%',
                     marginLeft: '54%',
                     marginTop: '0.5%',
                     backgroundColor: '#26ABAA',
                     fontFamily: 'Nunito Sans, Sans-serif',
                     color: 'white',
                  }}
               >
                  Add
               </Button>
               <Button
                  onClick={() => handleOpen('updateSupplier')}
                  sx={{
                     height: '70%',
                     width: '7%',
                     marginLeft: '2%',
                     marginTop: '0.5%',
                     backgroundColor: '#26ABAA',
                     fontFamily: 'Nunito Sans, Sans-serif',
                     color: 'white',
                  }}
               >
                  Update
               </Button>
               <Button
                  onClick={() => handleOpen('deleteSupplier')}
                  sx={{
                     height: '70%',
                     width: '7%',
                     marginLeft: '2%',
                     marginTop: '0.5%',
                     backgroundColor: '#FC696A',
                     fontFamily: 'Nunito Sans, Sans-serif',
                     color: 'white',
                  }}
               >
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
                           <th>Supplier Number</th>
                           <th>Name</th>
                           <th>Address</th>
                           <th>Telephone Number</th>
                           <th>Fax Number</th>
                        </tr>
                     </thead>
                     <tbody>
                        {suppliers.map((supplier) => (
                           <tr key={supplier.supplier_number}>
                              <td>{supplier.supplier_number}</td>
                              <td>{supplier.name}</td>
                              <td>{supplier.address}</td>
                              <td>{supplier.tel_num}</td>
                              <td>{supplier.fax_num}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               )}
            </Box>
         </Box>

         <Modal
            open={open.supplier}
            onClose={() => handleClose('supplier')}
            aria-labelledby='add-supplier-modal'
            aria-describedby='modal-to-add-new-supplier'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 800,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography textAlign='center' id='add-supplier-modal' variant='h6' component='h2'>
                  Add New Supplier
               </Typography>
               <TextField
                  label='Supplier Number'
                  variant='outlined'
                  fullWidth
                  name='supplier_number'
                  value={newSupplier.supplier_number}
                  onChange={(e) => handleChange(e, setNewSupplier)}
                  margin='normal'
               />
               <TextField
                  label='Name'
                  variant='outlined'
                  fullWidth
                  name='name'
                  value={newSupplier.name}
                  onChange={(e) => handleChange(e, setNewSupplier)}
                  margin='normal'
               />
               <TextField
                  label='Address'
                  variant='outlined'
                  fullWidth
                  name='address'
                  value={newSupplier.address}
                  onChange={(e) => handleChange(e, setNewSupplier)}
                  margin='normal'
               />
               <TextField
                  label='Telephone Number'
                  variant='outlined'
                  fullWidth
                  name='tel_num'
                  value={newSupplier.tel_num}
                  onChange={(e) => handleChange(e, setNewSupplier)}
                  margin='normal'
               />
               <TextField
                  label='Fax Number'
                  variant='outlined'
                  fullWidth
                  name='fax_num'
                  value={newSupplier.fax_num}
                  onChange={(e) => handleChange(e, setNewSupplier)}
                  margin='normal'
               />
               <Button
                  onClick={handleSubmitSupplier}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Add
               </Button>
            </Box>
         </Modal>

         <Modal
            open={open.deleteSupplier}
            onClose={() => handleClose('deleteSupplier')}
            aria-labelledby='delete-supplier-modal'
            aria-describedby='modal-to-delete-supplier'
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
               <Typography id='delete-supplier-modal' variant='h6' component='h2'>
                  Delete Supplier
               </Typography>
               <TextField
                  label='Supplier Number'
                  variant='outlined'
                  fullWidth
                  name='supplier_number'
                  value={deleteIdentifier}
                  onChange={(e) => setDeleteIdentifier(e.target.value)}
                  margin='normal'
               />
               <Button
                  onClick={() => handleDelete('supplier')}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Delete
               </Button>
            </Box>
         </Modal>

         <Modal
            open={open.updateSupplier}
            onClose={() => handleClose('updateSupplier')}
            aria-labelledby='update-supplier-modal'
            aria-describedby='modal-to-update-supplier'
         >
            <Box
               sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: 800,
                  bgcolor: 'background.paper',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
               }}
            >
               <Typography textAlign="center" id='update-supplier-modal' variant='h6' component='h2'>
                  Update Supplier
               </Typography>
               <TextField
                  label='Supplier Number'
                  variant='outlined'
                  fullWidth
                  name='supplier_number'
                  value={updateSupplier.supplier_number}
                  onChange={(e) => handleChange(e, setUpdateSupplier)}
                  margin='normal'
               />
               <TextField
                  label='Name'
                  variant='outlined'
                  fullWidth
                  name='name'
                  value={updateSupplier.name}
                  onChange={(e) => handleChange(e, setUpdateSupplier)}
                  margin='normal'
               />
               <TextField
                  label='Address'
                  variant='outlined'
                  fullWidth
                  name='address'
                  value={updateSupplier.address}
                  onChange={(e) => handleChange(e, setUpdateSupplier)}
                  margin='normal'
               />
               <TextField
                  label='Telephone Number'
                  variant='outlined'
                  fullWidth
                  name='tel_num'
                  value={updateSupplier.tel_num}
                  onChange={(e) => handleChange(e, setUpdateSupplier)}
                  margin='normal'
               />
               <TextField
                  label='Fax Number'
                  variant='outlined'
                  fullWidth
                  name='fax_num'
                  value={updateSupplier.fax_num}
                  onChange={(e) => handleChange(e, setUpdateSupplier)}
                  margin='normal'
               />
               <Button
                  onClick={handleSubmitUpdateSupplier}
                  variant='contained'
                  color='primary'
                  sx={{ mt: 2 }}
               >
                  Update
               </Button>
            </Box>
         </Modal>
      </Box>
   );
}

export default Supplies;