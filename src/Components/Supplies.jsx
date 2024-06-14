import React from 'react';
import { Box, Button, Typography, TextField, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaUser, FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Supplies.css'; // CSS file for styling

const Supplies = () => {
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
          {/* Supplies (active page) */}
          <Button component={Link} to="/supplies" sx={{ flexGrow: 1, fontFamily: 'Nunito Sans, Sans-serif', fontSize: '1.5rem', color: 'black', textAlign: 'center', borderBottom: '2px solid #007bff' }}>
            Supplies
          </Button>
        </Box>

        {/* Main Content Sections */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Pharmaceutical Supplies */}
          <Box className="supplies-section">
            <Typography variant="h6">Pharmaceutical Supplies</Typography>
            <Box className="search-container">
              <TextField placeholder="Enter drug number" variant="outlined" size="small" />
              <Button variant="contained" color="primary" size="small" sx={{ marginLeft: '10px' }}>Search</Button>
              <Button component={Link} to="/supplies/ward-requisition" variant="outlined" className="ward-requisition-button" sx={{ backgroundColor: '#2CAFA4', color: 'white' }}>
                Ward Requisition Form
              </Button>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Drug Number</TableCell>
                  <TableCell>Drug Name</TableCell>
                  <TableCell>Drug Description</TableCell>
                  <TableCell>Dosage</TableCell>
                  <TableCell>Method of Administration</TableCell>
                  <TableCell>Quality In Stock</TableCell>
                  <TableCell>Reorder Level</TableCell>
                  <TableCell>Cost Per Unit</TableCell>
                  <TableCell>Supplier Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Populate with data */}
              </TableBody>
            </Table>
          </Box>

          {/* Surgical & Non-Surgical Supplies */}
          <Box className="supplies-section">
            <Typography variant="h6">Surgical & Non-Surgical Supplies</Typography>
            <Box className="search-container">
              <TextField placeholder="Enter item number" variant="outlined" size="small" />
              <Button variant="contained" color="primary" size="small">Search</Button>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item Number</TableCell>
                  <TableCell>Item Name</TableCell>
                  <TableCell>Item Description</TableCell>
                  <TableCell>Quality In Stock</TableCell>
                  <TableCell>Reorder Level</TableCell>
                  <TableCell>Cost Per Unit</TableCell>
                  <TableCell>Supplier Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Populate with data */}
              </TableBody>
            </Table>
          </Box>

          {/* Suppliers */}
          <Box className="supplies-section">
            <Typography variant="h6">Suppliers</Typography>
            <Box className="search-container">
              <TextField placeholder="Enter supplier number" variant="outlined" size="small" />
              <Button variant="contained" color="primary" size="small">Search</Button>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Supplier Number</TableCell>
                  <TableCell>Supplier Name</TableCell>
                  <TableCell>Supplier Address</TableCell>
                  <TableCell>Telephone Number</TableCell>
                  <TableCell>Fax Number</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Populate with data */}
              </TableBody>
            </Table>
          </Box>
        </Box>
        <Button onClick={() => window.history.back()} sx={{ alignSelf: 'flex-end', marginBottom: '20px' }}>BACK</Button>
      </Box>
    </Box>
  );
}

export default Supplies;
