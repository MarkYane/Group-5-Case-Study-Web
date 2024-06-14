import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Login.jsx';
import RegisterPage from './Components/Register.jsx';
import Dashboard from './Components/Dashboard.jsx';
import WardDetails from './Components/WardDetails.jsx';
import Supplies from './Components/Supplies.jsx';
import WardRequisitionForm from './Components/WardRequisitionForm.jsx';
import ViewRequisitions from './Components/ViewRequisitions.jsx'; // Import the new component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/ward" element={<WardDetails />} />
        <Route path="/supplies" element={<Supplies />} />
        <Route path="/supplies/ward-requisition" element={<WardRequisitionForm />} />
        <Route path="/view-requisitions" element={<ViewRequisitions />} /> {/* Add the new route */}
      </Routes>
    </Router>
  );
}

export default App;
