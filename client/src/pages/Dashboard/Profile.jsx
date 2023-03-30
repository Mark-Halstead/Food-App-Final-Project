import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { UserContext } from '../../contexts/UserContext';
import ClientProfileItem from '../../components/MyClients/ClientProfileItem';

const Profile = () => {

  const Navigate = useNavigate()

  const { userData } = useContext(UserContext);

  const getBudgetIcons = (budget) => {
    return [...Array(parseInt(budget))].map((x, i) => (
        <i key={i} className="fa-solid fa-dollar-sign"></i>
    ))
  }



  const handleClick = () => {
    Navigate("/user-signup-form")
  }

  return (
    <Wrapper>
      <h3>Update Preferences</h3>
      {
        userData ? 
        <div className={`popup-left`}>
          {userData.first_name && userData.last_name && <ClientProfileItem label="Name" value={`${userData.first_name} ${userData.last_name}`} />}
          {userData.age && <ClientProfileItem label="Age" value={userData.age} />}
          {userData.height && <ClientProfileItem label="Height" value={`${parseFloat(userData).height.toFixed(1)} cm`} icon="fa-solid fa-ruler-vertical" />}
          {userData.weight && <ClientProfileItem label="Weight" value={`${parseFloat(userData.weight).toFixed(1)} kg`} icon="fa-solid fa-weight" />}
          {userData.meal_complexity && <ClientProfileItem label="Meal Complexity" value={userData.meal_complexity} icon="fa-solid fa-utensils" />}
          {userData.food_preferences && <ClientProfileItem label="Food Preferences" value={userData.food_preferences} icon="fa-solid fa-tree" />}
          {userData.budget && <ClientProfileItem label="Budget" value={getBudgetIcons(userData.budget)} icon="fa-solid fa-dollar-sign" />}
          {userData.goal && <ClientProfileItem label="Goal" value={userData.goal} icon="fa-solid fa-tree" />}
          {userData.activity_level && <ClientProfileItem label="Activity Level" value={userData.activity_level} icon="fa-solid fa-shoe-prints" />}
          {userData.daily_calorie_target && <ClientProfileItem label="Daily Calorie Target" value={userData.daily_calorie_target.toFixed()} />}
        </div>
        : null
      }
      <button className='btn btn-block' onClick={() => handleClick()}>
        Update Preferences
      </button>
    </Wrapper>
  );
};
export default Profile;
