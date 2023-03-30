import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { UserContext } from '../../contexts/UserContext';

const Profile = () => {

  const Navigate = useNavigate()

  const { userData } = useContext(UserContext);



  const handleClick = () => {
    Navigate("/user-signup-form")
  }

  return (
    <Wrapper>
      <h3>Update Preferences</h3>
      {
        userData ? 
          <h2>{userData.first_name}</h2>
          : null 
      }
      <button className='btn btn-block' onClick={() => handleClick()}>
        Update Preferences
      </button>
    </Wrapper>
  );
};
export default Profile;
