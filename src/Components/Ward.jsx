import './Ward.css'
import { Box, Button, InputAdornment, TextField, Typography} from '@mui/material';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import DashboardNavigation from './Navigations/DashboardNavigation';
import SearchIcon from '@mui/icons-material/Search';

function Ward({token}){
  
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
                     <table className="ward-content-table">
                        <thead>
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

export default Ward;