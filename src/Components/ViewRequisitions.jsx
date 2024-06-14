import React from 'react';
import { Box, Button, TextField, Typography, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { FaUser, FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './Supplies.css'; // reuse the CSS file for styling

const ViewRequisitions = () => {
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
          <Button component={Link} to="/dashboard/ward" sx={{ flexGrow: 1, fontFamily: 'Nunito Sans, Sans-serif', fontSize: '1.5rem', color: 'black', textAlign: 'center', borderBottom: '2px solid #007bff' }}>
            Ward
          </Button>
          {/* Supplies */}
          <Button component={Link} to="/supplies" sx={{ flexGrow: 1, fontFamily: 'Nunito Sans, Sans-serif', fontSize: '1.5rem', color: 'black', textAlign: 'center' }}>
            Supplies
          </Button>
        </Box>

        {/* Main Content Sections */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Pharmaceutical Requisition */}
          <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6">Pharmaceutical Requisition</Typography>
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <TextField placeholder="Enter req number" variant="outlined" size="small" />
              <Button variant="contained" color="primary" size="small">Search</Button>
              <Button component={Link} to="/supplies/ward-requisition" variant="contained" color="success" size="small">Ward Requisition Form</Button>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Requisition Number</TableCell>
                  <TableCell>Requisition Name</TableCell>
                  <TableCell>Ward Number</TableCell>
                  <TableCell>Drug Number</TableCell>
                  <TableCell>Date Ordered</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Populate with data */}
              </TableBody>
            </Table>
          </Box>

          {/* Surgical & Non-Surgical Requisition */}
          <Box sx={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
            <Typography variant="h6">Surgical & Non-Surgical Requisition</Typography>
            <Box sx={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
              <TextField placeholder="Enter req number" variant="outlined" size="small" />
              <Button variant="contained" color="primary" size="small">Search</Button>
            </Box>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Requisition Number</TableCell>
                  <TableCell>Requisition Name</TableCell>
                  <TableCell>Ward Number</TableCell>
                  <TableCell>Item Number</TableCell>
                  <TableCell>Date Ordered</TableCell>
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

export default ViewRequisitions;
