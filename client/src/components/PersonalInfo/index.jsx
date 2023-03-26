import React from 'react';
import Wrapper from "../../assets/wrappers/PersonalInfo";
import { CSSTransition } from 'react-transition-group';


const PersonalInfo = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  age,
  setAge,
  weight,
  setWeight,
  gender,
  setGender,
  nextPage,
}) => {
  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
  };

  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <Wrapper>
    <div className="form-center">
      <h2>Personal Information</h2>
      <div className="form-group">
        <label htmlFor="first-name">First Name:</label>
        <input
          type="text"
          id="first-name"
          value={firstName}
          onChange={handleFirstNameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="last-name">Last Name:</label>
        <input
          type="text"
          id="last-name"
          value={lastName}
          onChange={handleLastNameChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="age">Age:</label>
        <input type="number" id="age" value={age} onChange={handleAgeChange} />
      </div>
      <div className="form-group">
        <label htmlFor="weight">Weight (in kg):</label>
        <input
          type="number"
          id="weight"
          value={weight}
          onChange={handleWeightChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="gender">Gender:</label>
        <select id="gender" value={gender} onChange={handleGenderChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="btn-container">
        <button onClick={nextPage}>Next</button>
      </div>
    </div>
    </Wrapper>
  );
};

export default PersonalInfo;

