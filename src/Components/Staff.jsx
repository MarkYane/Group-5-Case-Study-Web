import './Staff.css';
import { Box, Button, TextField, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import DashboardNavigation from './Navigations/DashboardNavigation';
import { supabase } from '../client';

function Staff({ token }) {
  const [staffs, setStaffs] = useState([]);
  const [qualifications, setQualifications] = useState([]);
  const [contracts, setContracts] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [activeTable, setActiveTable] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState('');
  const [dialogData, setDialogData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchStaffs();
    fetchQualifications();
    fetchContracts();
    fetchExperiences();
    fetchAllocations();
  }, []);

  async function fetchStaffs() {
    const { data } = await supabase.from('staff').select('*');
    setStaffs(data);
  }

  async function fetchQualifications() {
    const { data } = await supabase.rpc('get_staff_qualifications');
    setQualifications(data);
  }

  async function fetchContracts() {
    const { data } = await supabase.rpc('get_staff_employment_contracts');
    setContracts(data);
  }

  async function fetchExperiences() {
    const { data } = await supabase.rpc('get_staff_work_experience');
    setExperiences(data);
  }

  async function fetchAllocations() {
    const { data } = await supabase.from('staff_allocation').select('*');
    setAllocations(data);
  }

  async function handleAdd() {
    try {
      switch (activeTable) {
        case 'staff':
          await supabase.from('staff').insert([dialogData]);
          break;
        case 'qualification':
          await supabase.from('qualification').insert([dialogData]);
          break;
        case 'work_experience':
          await supabase.from('work_experience').insert([dialogData]);
          break;
        case 'employment_contract':
          await supabase.from('employment_contract').insert([dialogData]);
          break;
        case 'staff_allocation':
          await supabase.from('staff_allocation').insert([dialogData]);
          break;
        default:
          throw new Error('Invalid active table');
      }
      window.location.reload();
    } catch (error) {
      console.error('Error adding data:', error);
    }
  }

  async function handleUpdate() {
    try {
      switch (activeTable) {
        case 'staff':
          await supabase.from('staff').update(dialogData).eq('staff_num', dialogData.staff_num);
          break;
        case 'qualification':
          await supabase.from('qualification').update(dialogData).eq('staff_num', dialogData.staff_num);
          break;
        case 'work_experience':
          await supabase.from('work_experience').update(dialogData).eq('staff_num', dialogData.staff_num);
          break;
        case 'employment_contract':
          await supabase.from('employment_contract').update(dialogData).eq('staff_num', dialogData.staff_num);
          break;
        case 'staff_allocation':
          await supabase.from('staff_allocation').update(dialogData).eq('staff_num', dialogData.staff_num);
          break;
        default:
          throw new Error('Invalid active table');
      }
      window.location.reload();
    } catch (error) {
      console.error('Error updating data:', error);
    }
  }

  async function handleDelete() {
    try {
      await supabase.from(activeTable).delete().eq('staff_num', dialogData.staff_num);
      window.location.reload();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  }

  function openDialog(type, table) {
    setDialogType(type);
    setActiveTable(table);
    setDialogOpen(true);
    if (type === 'delete') {
      setDialogData({ staff_num: '' });
    }
  }

  function closeDialog() {
    setDialogOpen(false);
    setDialogData({});
  }

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  const filteredData = {
    staff: staffs.filter(staff => staff.staff_num.toString().includes(searchQuery)),
    qualification: qualifications.filter(q => q.staff_num.toString().includes(searchQuery)),
    work_experience: experiences.filter(e => e.staff_num.toString().includes(searchQuery)),
    employment_contract: contracts.filter(c => c.staff_num.toString().includes(searchQuery)),
    staff_allocation: allocations.filter(a => a.staff_num.toString().includes(searchQuery))
  };

  return (
    <>
      <Box sx={{ maxHeight: '1000vh', width: '100%', backgroundColor: '#E7F3F5', display: 'flex', flexWrap: 'wrap', alignContent: 'flex-start' }}>
        <DashboardNavigation />

        <Section title="Staff" data={filteredData.staff} fetchFunction={fetchStaffs} openDialog={openDialog} handleSearch={handleSearch} />
        <Section title="Qualification" data={filteredData.qualification} fetchFunction={fetchQualifications} openDialog={openDialog} handleSearch={handleSearch} />
        <Section title="Work Experience" data={filteredData.work_experience} fetchFunction={fetchExperiences} openDialog={openDialog} handleSearch={handleSearch} />
        <Section title="Employment Contract" data={filteredData.employment_contract} fetchFunction={fetchContracts} openDialog={openDialog} handleSearch={handleSearch} />
        <Section title="Staff Allocation" data={filteredData.staff_allocation} fetchFunction={fetchAllocations} openDialog={openDialog} handleSearch={handleSearch} />
      </Box>

      <Dialog open={dialogOpen} onClose={closeDialog}>
        <DialogTitle>{dialogType.charAt(0).toUpperCase() + dialogType.slice(1)} {activeTable.replace('_', ' ').charAt(0).toUpperCase() + activeTable.replace('_', ' ').slice(1)}</DialogTitle>
        <DialogContent>
          {renderDialogContent(dialogType, activeTable, dialogData, setDialogData)}
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog} color="primary">Cancel</Button>
          <Button onClick={() => handleDialogSubmit(dialogType, activeTable, dialogData)} color="primary">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function Section({ title, data, fetchFunction, openDialog, handleSearch }) {
  useEffect(() => {
    fetchFunction();
  }, [fetchFunction]);

  const tableKey = title.toLowerCase().replace(' ', '_');

  return (
    <Box
      sx={{
        height: 'auto',
        width: '83%',
        backgroundColor: 'white',
        margin: '2% 2% 2% 12%',
        padding: 0,
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        border: '0px solid black'
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontFamily: 'Nunito Sans, Sans-serif',
          marginBottom: '1%',
          fontWeight: 'bold',
          backgroundColor: '#E7F3F5',
          width: '100%'
        }}
      >
        {title}
      </Typography>
      <Box sx={{ height: '4vh', width: '100%', backgroundColor: 'white', display: 'flex', paddingLeft: '2%' }}>
        <SearchIcon sx={{ color: 'action.active', mr: 0, my: 2.6 }} />
        <TextField size="medium" id="input-with-sx" label={`Enter ${title === "Staff" ? "staff" : "staff"} number`} variant="standard" onChange={handleSearch} />
      </Box>
      <Box sx={{ backgroundColor: 'white', width: '100%' }}>
        <table className="staff-content-table">
          <thead>
            <tr>
              {Object.keys(data[0] || {}).map((key) => (
                <th key={key}>{key.replace('_', ' ').toUpperCase()}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((value, idx) => (
                  <td key={idx}>{value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '2%' }}>
        <Button onClick={() => openDialog('add', tableKey)} sx={{ margin: '0 1%', backgroundColor: '#26ABAA', color: 'white' }}>Add</Button>
        <Button onClick={() => openDialog('update', tableKey)} sx={{ margin: '0 1%', backgroundColor: '#26ABAA', color: 'white' }}>Update</Button>
        <Button onClick={() => openDialog('delete', tableKey)} sx={{ margin: '0 1%', backgroundColor: '#FC696A', color: 'white' }}>Delete</Button>
      </Box>
    </Box>
  );
}

function renderDialogContent(type, table, data, setData) {
   const fields = type === 'delete' ? ['staff_num'] : getTableFields(table);
 
   return fields.map((field) => (
     <TextField
       key={field}
       margin="dense"
       label={field.replace('_', ' ').toUpperCase()}
       type="text"
       fullWidth
       value={data[field] || ''}
       onChange={(e) => setData({ ...data, [field]: e.target.value })}
     />
   ));
}

function getTableFields(table) {
  switch (table) {
    case 'staff':
      return ['staff_num', 'first_name', 'last_name', 'sex', 'date_of_birth', 'telephone_number', 'nin', 'address'];
    case 'qualification':
      return ['staff_num', 'date_of_qualification', 'type', 'name_of_institution'];
    case 'work_experience':
      return ['staff_num', 'start_date', 'finish_date', 'position', 'name_of_org'];
    case 'employment_contract':
      return ['staff_num', 'work_hours', 'type_of_contract', 'type_of_salary_payment'];
    case 'staff_allocation':
      return ['staff_num', 'ward_num', 'ward_name', 'shift'];
    default:
      return [];
  }
}

async function handleDialogSubmit(type, table, data) {
  try {
    switch (type) {
      case 'add':
        await supabase.from(table).insert([data]);
        break;
      case 'update':
        await supabase.from(table).update(data).eq('staff_num', data.staff_num);
        break;
      case 'delete':
        await supabase.from(table).delete().eq('staff_num', data.staff_num);
        break;
      default:
        throw new Error('Invalid dialog type');
    }
    window.location.reload();
  } catch (error) {
    console.error('Error performing database operation:', error);
  }
}

export default Staff;
