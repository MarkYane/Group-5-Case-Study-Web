//template lng ni

import React from 'react';
import './PatientTab.css';

const PatientTab = () => {
  return (
    <div className="patient-tab">
      <h2 className="patient-tab-title">Patient Information</h2>
      <div className="patient-info">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Age:</strong> 30</p>
        <p><strong>Condition:</strong> Healthy</p>
      </div>
    </div>
  );
};

export default PatientTab;
