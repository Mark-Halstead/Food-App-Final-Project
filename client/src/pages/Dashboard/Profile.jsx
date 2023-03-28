import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {

  const Navigate = useNavigate()

  const handleClick = () => {
    Navigate("/user-signup-form")
  }

  return (
    <Wrapper>
      <h3>Update Preferences</h3>
      <button className='btn btn-block' onClick={() => handleClick()}>
        Update Preferences
      </button>
    </Wrapper>
  );
};
export default Profile;
