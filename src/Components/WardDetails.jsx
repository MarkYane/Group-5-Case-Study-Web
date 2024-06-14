import React, { useState } from 'react';
import './WardDetails.css'; // CSS file for styling
import { FaUser, FaHome, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

const WardDetails = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const wardData = [
      { number: 'WARD - 1', name: 'Cardiology', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 2', name: 'Pediatrics', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 3', name: 'Orthopedics', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 4', name: 'Neurology', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 5', name: 'Oncology', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 6', name: 'Intensive Care Unit (ICU)', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 7', name: 'Surgical', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 8', name: 'Maternity', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 9', name: 'Gynecology', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 10', name: 'Neonatal Intensive Care Unit', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 11', name: 'Psychiatry', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 12', name: 'Geriatrics', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 13', name: 'Respiratory', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 14', name: 'Infectious Diseases', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 15', name: 'Rehabilitation', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 16', name: 'Endocrinology', location: 'Block A', beds: 20, tel: 1 },
      { number: 'WARD - 17', name: 'Hematology', location: 'Block A', beds: 20, tel: 1 },
    ];
  

  const filteredWards = wardData.filter(ward => 
    ward.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ height: '100vh', width: '100%', display: 'flex' }}>
      <Box sx={{ width: '80px', background: 'linear-gradient(to bottom, #2CAFA4, #0194D3)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', paddingBottom: '20px' }}>
        <Box>
          <Button component={Link} to="/profile" sx={{ marginTop: '30px', color: 'white', fontSize: '30px' }}>
            <FaUser />
          </Button>
          <Button component={Link} to="/dashboard" sx={{ marginTop: '30px', color: 'white', fontSize: '30px' }}>
            <FaHome />
          </Button>
        </Box>
        <Box>
          <Button component={Link} to="/settings" sx={{ marginTop: '30px', color: 'white', fontSize: '30px' }}>
            <FaCog />
          </Button>
          <Button component={Link} to="/" sx={{ marginTop: '30px', color: 'white', fontSize: '30px' }}>
            <FaSignOutAlt />
          </Button>
        </Box>
      </Box>
      <Box sx={{ flex: 1, padding: '40px', backgroundColor: '#E7F3F5', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: 'white', padding: '10px 0', borderRadius: '8px' }}>
          <Button component={Link} to="/patients" sx={{ flexGrow: 1, fontFamily: 'Nunito Sans, Sans-serif', fontSize: '1.5rem', color: 'black', textAlign: 'center' }}>
            Patients
          </Button>
          <Button component={Link} to="/staff" sx={{ flexGrow: 1, fontFamily: 'Nunito Sans, Sans-serif', fontSize: '1.5rem', color: 'black', textAlign: 'center' }}>
            Staff
          </Button>
          <Button component={Link} to="/dashboard/ward" sx={{ flexGrow: 1, fontFamily: 'Nunito Sans, Sans-serif', fontSize: '1.5rem', color: 'black', textAlign: 'center' }}>
            Ward
          </Button>
          <Button component={Link} to="/supplies" sx={{ flexGrow: 1, fontFamily: 'Nunito Sans, Sans-serif', fontSize: '1.5rem', color: 'black', textAlign: 'center' }}>
            Supplies
          </Button>
        </Box>
        <Box sx={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', flex: 1 }}>
          <Typography variant="h4" sx={{ fontFamily: 'Nunito Sans, Sans-Serif', fontWeight: 'bold', marginBottom: '2%' }}>WARD DETAILS</Typography>
          <Box className="search-container" sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <input 
              type="text" 
              placeholder="Enter ward number" 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', flex: 1, maxWidth: '300px' }}
            />
            <Button sx={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', borderRadius: '4px' }}>Search</Button>
            <Button sx={{ marginLeft: '10px', padding: '10px 20px', backgroundColor: '#28a745', color: 'white', borderRadius: '4px' }}>Ward Supplies</Button>
          </Box>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#007bff', color: 'white' }}>Ward Number</th>
                <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#007bff', color: 'white' }}>Ward Name</th>
                <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#007bff', color: 'white' }}>Ward Location</th>
                <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#007bff', color: 'white' }}>Total Bed Number</th>
                <th style={{ padding: '10px', border: '1px solid #ccc', backgroundColor: '#007bff', color: 'white' }}>Tel Number</th>
              </tr>
            </thead>
            <tbody>
              {filteredWards.map(ward => (
                <tr key={ward.number}>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{ward.number}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{ward.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{ward.location}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{ward.beds}</td>
                  <td style={{ padding: '10px', border: '1px solid #ccc' }}>{ward.tel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Box>
  );
}

export default WardDetails;
