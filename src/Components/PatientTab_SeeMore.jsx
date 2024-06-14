import React, { useState } from 'react';
import './PatientTab_SeeMore.css';

const PatientTab_SeeMore = () => {
  const [showMore, setShowMore] = useState(false);

  const handleToggle = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="patient-tab-seemore">
      <h2 className="patient-tab-title">Patient Information</h2>
      <div className="patient-info">
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Age:</strong> 30</p>
        <p><strong>Condition:</strong> Healthy</p>
        {showMore && (
          <div className="additional-info">
            <p><strong>Address:</strong> 123 Main St, Anytown, USA</p>
            <p><strong>Contact:</strong> (123) 456-7890</p>
          </div>
        )}
      </div>
      <button className="see-more-button" onClick={handleToggle}>
        {showMore ? 'See Less' : 'See More'}
      </button>
    </div>
  );
};

export default PatientTab_SeeMore;
