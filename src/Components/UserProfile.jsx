import React from 'react';
import './UserProfile.css';

const UserProfile = () => {
  return (
    <div className="user-profile">
      <img 
        className="profile-picture" 
        src="https://via.placeholder.com/150" 
        alt="Profile" 
      />
      <h2 className="user-name">Jane Doe</h2>
      <p className="user-email">jane.doe@example.com</p>
    </div>
  );
};

export default UserProfile;
