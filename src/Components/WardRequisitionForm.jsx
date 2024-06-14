import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaUser, FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Supplies.css'; // reuse the CSS file for styling

const WardRequisitionForm = () => {
  return (
    <Box sx={{ height: '100vh', width: '100%', display: 'flex' }}>
      {/* Sidebar Navigation */}
      <Box sx={{ width: '80px', background: 'linear-gradient(to bottom, #2CAFA4, #0194D3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
        <Box>
          {/* Profile */}
          <Button component={Link} to="/profile" sx={{ marginTop: '30px', color: 'white', fontSize: '30px' }}>
            <FaUser />
          </Button>
          {/* Home */}
          <Button component={Link} to="/dashboard" sx={{ marginTop: '30px', color: 'white', fontSize: '30px' }}>
            <FaHome />
          </Button>
        </Box>
        <Box>
          {/* Settings */}
          <Button component={Link} to="/settings" sx={{ marginTop: '30px', color: 'white', fontSize: '30px' }}>
            <FaCog />
          </Button>
          {/* Logout */}
          <Button component={Link} to="/" sx={{ marginTop: '30px', color: 'white', fontSize: '30px' }}>
            <FaSignOutAlt />
          </Button>
        </Box>
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, padding: '40px', backgroundColor: '#E7F3F5', display: 'flex', flexDirection: 'column', gap: '30px', overflowY: 'auto' }}>
        {/* Navigation Buttons */}
        <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: '10px 0', borderRadius: '8px' }}>
          {/* Patients */}
          <Button component={Link} to="/patients" sx={{ flexGrow: 1, fontFamily: 'Nunito Sans, Sans-serif', fontSize: '1.5rem', color: 'black', textAlign: 'center' }}>
            Patients
          </Button>
          {/* Staff */}
          <Button component={Link} to="/staff" sx={{ flexGrow: 1, fontFamily: 'Nunito Sans, Sans-serif', fontSize: '1.5rem', color: 'black', textAlign: 'center' }}>
            Staff
          </Button>
          {/* Ward */}
          <Button component={Link} to="/dashboard/ward" sx={{ flexGrow: 1, fontFamily: 'Nunito Sans, Sans-serif', fontSize: '1.5rem', color: 'black', textAlign: 'center' }}>
            Ward
          </Button>
          {/* Supplies */}
          <Button component={Link} to="/supplies" sx={{ flexGrow: 1, fontFamily: 'Nunito Sans, Sans-serif', fontSize: '1.5rem', color: 'black', textAlign: 'center' }}>
            Supplies
          </Button>
        </Box>

        {/* Forms Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Supplier Form */}
          <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6">Supplier Form</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <Box sx={{ flex: 1 }}>
                <TextField label="Supplier Number" variant="outlined" fullWidth size="small" />
                <TextField label="Telephone Number" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
                <TextField label="Fax Number" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField label="Name" variant="outlined" fullWidth size="small" />
                <TextField label="Address" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <Button variant="contained" color="primary">Submit</Button>
              <Button variant="contained" color="error">Delete</Button>
            </Box>
          </Box>

          {/* Pharmaceutical Supplies Form */}
          <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6">Pharmaceutical Supplies Form</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <Box sx={{ flex: 1 }}>
                <TextField label="Drug Number" variant="outlined" fullWidth size="small" />
                <TextField label="Drug Name" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
                <TextField label="Dosage" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
                <TextField label="Supplier Number" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
                <TextField label="Drug Description" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField label="Method of Administration" variant="outlined" fullWidth size="small" />
                <TextField label="Quality In Stock" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
                <TextField label="Reorder Level" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
                <TextField label="Cost Per Unit" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <Button variant="contained" color="primary">Submit</Button>
              <Button variant="contained" color="error">Delete</Button>
            </Box>
          </Box>

          {/* Surgical Requisition Supplies Form */}
          <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6">Surgical Requisition Supplies Form</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
              <Box sx={{ flex: 1 }}>
                <TextField label="Item Number" variant="outlined" fullWidth size="small" />
                <TextField label="Item Name" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
                <TextField label="Supplier Number" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
                <TextField label="Item Description" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <TextField label="Quality In Stock" variant="outlined" fullWidth size="small" />
                <TextField label="Reorder Level" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
                <TextField label="Cost Per Unit" variant="outlined" fullWidth size="small" sx={{ marginTop: '10px' }} />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
              <Button variant="contained" color="primary">Submit</Button>
              <Button variant="contained" color="error">Delete</Button>
            </Box>
          </Box>

          {/* View Requested Requisitions Button */}
          <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button component={Link} to="/view-requisitions" variant="contained" color="success">View Requested Requisitions</Button>
          </Box>
        </Box>
        <Button onClick={() => window.history.back()} sx={{ alignSelf: 'flex-end', marginBottom: '20px' }}>BACK</Button>
      </Box>
    </Box>
    
  );
}

export default WardRequisitionForm;
