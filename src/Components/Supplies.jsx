import './Supplies.css';
import { Box, Button, TextField, Typography, Modal } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import DashboardNavigation from './Navigations/DashboardNavigation';
import { supabase } from '../client';

function Supplies() {
  const [pharmaceuticalSupplies, setPharmaceuticalSupplies] = useState([]);
  const [surgicalSupplies, setSurgicalSupplies] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [newSupply, setNewSupply] = useState({
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (e) => setNewSupply({ ...newSupply, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase
        .from('pharmaceutical_supplies')
        .insert([newSupply]);
      if (error) throw error;
      fetchSupplies();
      handleClose();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
   <>
   
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
            onClick={handleOpen}
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
        open={open}
        onClose={handleClose}
        aria-labelledby='add-supply-modal'
        aria-describedby='modal-to-add-new-supply'
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
          <Typography id='add-supply-modal' variant='h6' component='h2'>
            Add New Supply
          </Typography>
          <TextField
            label='Drug Number'
            variant='outlined'
            fullWidth
            name='drug_num'
            value={newSupply.drug_num}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label='Name'
            variant='outlined'
            fullWidth
            name='name'
            value={newSupply.name}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label='Description'
            variant='outlined'
            fullWidth
            name='drug_description'
            value={newSupply.drug_description}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label='Dosage'
            variant='outlined'
            fullWidth
            name='dosage'
            value={newSupply.dosage}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label='Method of Admin.'
            variant='outlined'
            fullWidth
            name='method_of_admin'
            value={newSupply.method_of_admin}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label='Stock'
            variant='outlined'
            fullWidth
            name='quantity_in_stock'
            value={newSupply.quantity_in_stock}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label='Reorder Level'
            variant='outlined'
            fullWidth
            name='reorder_level'
            value={newSupply.reorder_level}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label='Cost Per Unit'
            variant='outlined'
            fullWidth
            name='cost_per_unit'
            value={newSupply.cost_per_unit}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label='Supplier Number'
            variant='outlined'
            fullWidth
            name='supplier_number'
            value={newSupply.supplier_number}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Button
            variant='contained'
            color='primary'
            fullWidth
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </Box>
      </Modal>

      {/* Repeat the similar structure for surgical and non-surgical supplies and suppliers sections */}
      {/* Surgical and Non-Surgical Supplies Container */}
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
          Surgical and Non-Surgical Supplies
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
            onClick={handleOpen}
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

        <Box className='scrollable-container'
          sx={{
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
            onClick={handleOpen}
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

        <Box className='scrollable-container'
          sx={{
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
    </Box>
    </>
  );
}

export default Supplies;