import React, { useState } from 'react';
import { FormFormat } from "../../components"
import Wrapper from '../../assets/wrappers/DashboardFormPage';

const Profile = () => {
  
  const handleSubmit = (e) => {
    e.preventDefault()
  };

  const handleChange = (e) => {
    e.preventDefault()
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        <div className='form-center'>
          <FormFormat
            type='text'
            name='Activity Level'
            value='High'
            handleChange={handleChange}
          />
          <FormFormat
            type='text'
            name='Goal'
            value='Goal'
            handleChange={handleChange}
          />
          <FormFormat
            type='text'
            name='Dietary Restrictions'
            value="None"
            handleChange={handleChange}
          />
          <FormFormat
            type='text'
            name='Allergies'
            value='None'
            handleChange={handleChange}
          />
          <FormFormat
            type='text'
            name='Food Preferences'
            value='None'
            handleChange={handleChange}
          />
          <FormFormat
            type="text"
            name='Meal Frequency'
            value='low'
            handleChange={handleChange}
          />
          <FormFormat
            type='text'
            name='Meal Complexity'
            value='Complex'
            handleChange={handleChange}
          />
          <FormFormat
            type='text'
            name='Budget'
            value='£1000000'
            handleChange={handleChange}
          />
          <FormFormat
            type='text'
            name='Allergies'
            value='other'
            handleChange={handleChange}
          />
          <FormFormat
            type='text'
            name='Food Preferences'
            value='other'
            handleChange={handleChange}
          />
          <FormFormat
            type='text'
            name='Meal Complexity'
            value='other'
            handleChange={handleChange}
          />
          <FormFormat
            type='text'
            name='Budget'
            value='other'
            handleChange={handleChange}
          />
          <FormFormat
            type='text'
            name='Subscription Type'
            value='other'
            handleChange={handleChange}
          />
          <button type='submit' className='btn btn-block'>
            Next 
          </button>
        </div>
      </form>
    </Wrapper>
  );
};
export default Profile;
