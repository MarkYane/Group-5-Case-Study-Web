import './Staff.css'
import { Box, Button, InputAdornment, TextField, Typography} from '@mui/material';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import DashboardNavigation from './Navigations/DashboardNavigation';
import SearchIcon from '@mui/icons-material/Search';
function Staff({token}){
  
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
            
                {/* Staff Table */}
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
                         <Button sx={{
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
                         <Button sx={{
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
                    
                    {/* Display for Staff stable */}

                    <Box sx={{
                        backgroundColor: 'white',
                        height: '37vh',
                        width: '100%',
                        
                    }}>
                         <table className="staff-content-table">
                        <thead>
                           <tr>
                              <th>Staff Number</th>
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
                           <tr>
                              <td>123</td>
                              <td>Jan Ru</td>
                              <td>Nac</td>
                              <td>Kambing</td>
                              <td>00-00-2004</td>
                              <td>091234567</td>
                              <td>MAO1239412</td>
                              <td>Taga asa ko Street lmasdasdaasdao xd</td>
                           </tr>

                        </tbody>
                     </table>
                    </Box>
                </Box>
                




                {/* Qualification Table */}
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
                        Qualification
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
                         <Button sx={{
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
                         <Button sx={{
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
                    
                    {/* Display for Qualification stable */}

                    <Box sx={{
                        backgroundColor: 'white',
                        height: '37vh',
                        width: '100%',
                        
                    }}>
                        <table className="staff-content-table">
                        <thead>
                           <tr>
                              <th>Staff Number</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Qualification Date</th>
                              <th>Type</th>
                              <th>Institution Name</th>
                             
                           </tr>
                        </thead>

                        <tbody>
                           <tr>
                              <td>123</td>
                              <td>Jan Ru</td>
                              <td>Nac</td>
                              <td>Kambing</td>
                              <td>00-00-2004</td>
                              <td>091234567</td>
                           </tr>

                        </tbody>
                     </table>
                    </Box>
                </Box>





                {/* Work Experience Container */}
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
                         <Button sx={{
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
                         <Button sx={{
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
                    
                    {/* Display for Staff stable */}

                    <Box sx={{
                        backgroundColor: 'white',
                        height: '37vh',
                        width: '100%',
                        
                    }}>
                     <table className="staff-content-table">
                        <thead>
                           <tr>
                              <th>Staff Number</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Start date</th>
                              <th>Start date</th>
                              <th>Finish date</th>
                              <th>Organization name</th>
                             
                           </tr>
                        </thead>

                        <tbody>
                           <tr>
                              <td>123</td>
                              <td>Jan Ru</td>
                              <td>Nac</td>
                              <td>Start date</td>
                              <td>Positoin</td>
                              <td>Organization name</td>
                           </tr>

                        </tbody>
                     </table>
                    </Box>
                </Box>






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
                         <Button sx={{
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
                         <Button sx={{
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
                    
                    {/* Display for Staff stable */}

                    <Box sx={{
                        backgroundColor: 'white',
                        height: '37vh',
                        width: '100%',
                    }}>
                    <table className="staff-content-table">
                        <thead>
                           <tr>
                              <th>Staff Number</th>
                              <th>First Name</th>
                              <th>Last Name</th>
                              <th>Work hours</th>
                              <th>Type of Contract</th>
                              <th>Type of Salary</th>
                              <th>Organization name</th>
                             
                           </tr>
                        </thead>

                        <tbody>
                           <tr>
                              <td>123</td>
                              <td>Jan Ru</td>
                              <td>Nac</td>
                              <td>Start date</td>
                              <td>Positoin</td>
                              <td>Organization name</td>
                           </tr>

                        </tbody>
                     </table>
                    </Box>
                </Box>

                 {/* Staff Allocation Table */}
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
                         <Button sx={{
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
                         <Button sx={{
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
                    
                    {/* Display for Staff stable */}

                    <Box sx={{
                        backgroundColor: 'white',
                        height: '37vh',
                        width: '100%',
                        
                    }}>
                     <table className="staff-content-table">
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
                           <tr>
                              <td>123</td>
                              <td>Jan Ru</td>
                              <td>Nac</td>
                              <td>Start date</td>
                              <td>Positoin</td>
                              <td>Organization name</td>
                           </tr>

                        </tbody>
                     </table>
                    </Box>
                </Box>
            </Box>
        </>
    );
}

export default Staff;