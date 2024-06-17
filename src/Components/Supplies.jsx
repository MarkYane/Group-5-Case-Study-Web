import './Supplies.css'
import { Box, Button, InputAdornment, TextField, Typography} from '@mui/material';
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';
import DashboardNavigation from './Navigations/DashboardNavigation';
import SearchIcon from '@mui/icons-material/Search';
function Supplies({token}){
  
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
            
                {/* Pharmaceutical Supplies Container */}
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
                        Pharmaceutical Supplies
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
                         <TextField size='medium' id="input-with-sx" label="Enter drug number" variant="standard" />

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
                    
                    {/* Display for Pharmaceutical stable */}

                    <Box className='scrollable-container' sx={{
                        height: '37vh',
                        width: '100%',
                    }}>
                     <table className="content-table">
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
                           <tr>
                              <td>123</td>
                              <td>Jan Ru</td>
                              <td>Nac</td>
                              <td>Kambing</td>
                              <td>00-00-2004</td>
                              <td>091234567</td>
                              <td>MAO1239412</td>
                              <td>Taga asa ko Street lmasdasdaasjasdkjasbdkasjdbsdao xd</td>
                           </tr>

                        </tbody>
                     </table>
                    </Box>
                </Box>
                




                {/* Surgical and Non-Surgical Supplies Contaner */}
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
                        Surgical and Non-Surgical Supplies
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
                         <TextField size='medium' id="input-with-sx" label="Enter item number" variant="standard" />

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
                    
                    {/* Display for Surgical and Non Surgical Supplies stable */}

                    <Box sx={{
                        backgroundColor: 'white',
                        height: '37vh',
                        width: '100%', 
                    }}>
                     <table className="content-table">
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
                           <tr>
                              <td>123</td>
                              <td>Jan Ru</td>
                              <td>Nac</td>
                              <td>Kambing</td>
                              <td>00-00-2004</td>
                              <td>091234567</td>
                              <td>Taga asa ko Street lmasdasdaasjasdkjasbdkasjdbsdao xd</td>
                           </tr>

                           
                        </tbody>
                     </table>
                    </Box>
                </Box>





                {/* Suppliers Container */}
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
                        Suppliers
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
                         <TextField size='medium' id="input-with-sx" label="Enter supplier number" variant="standard" />

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
                     <table className="content-table">
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
                           <tr>
                              <td>123</td>
                              <td>Jan Ru</td>
                              <td>Nac</td>
                              <td>Kambing</td>
                           </tr>

                        </tbody>
                     </table>
                    </Box>
                </Box>

            </Box>
        </>
    );
}

export default Supplies;