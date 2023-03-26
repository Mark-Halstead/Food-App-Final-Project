import React from 'react';

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
    <>
      <h2>Personal Information</h2>
      <label htmlFor="first-name">First Name:</label>
      <input
        type="text"
        id="first-name"
        value={firstName}
        onChange={handleFirstNameChange}
      />
      <label htmlFor="last-name">Last Name:</label>
      <input
        type="text"
        id="last-name"
        value={lastName}
        onChange={handleLastNameChange}
      />
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={handleEmailChange}
      />
      <label htmlFor="age">Age:</label>
      <input type="number" id="age" value={age} onChange={handleAgeChange} />
      <label htmlFor="weight">Weight (in kg):</label>
      <input
        type="number"
        id="weight"
        value={weight}
        onChange={handleWeightChange}
      />
      <label htmlFor="gender">Gender:</label>
      <select id="gender" value={gender} onChange={handleGenderChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <button onClick={nextPage}>Next</button>
    </>
  );
};

export default PersonalInfo;
