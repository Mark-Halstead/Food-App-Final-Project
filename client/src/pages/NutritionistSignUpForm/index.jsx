import React, { useState } from 'react';
import axios from 'axios';
import { NutritionistInfo } from '../../components';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/SignUpForm';
import { CSSTransition } from 'react-transition-group';

const NutritionistSignUpForm = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [credentials, setCredentials] = useState('');
  const [areaOfExpertise, setAreaOfExpertise] = useState('');
  const [educationTraining, setEducationTraining] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      first_name: firstName,
      last_name: lastName,
      credentials: credentials,
      area_of_expertise: areaOfExpertise,
      education_training: educationTraining
    };

    try {
      const token = localStorage.getItem('token')
      const response = await axios.put(`http://127.0.0.1:5000/nutritionists/`, userData, {
        headers: {
          Authorization: `${token}`
        },
      });

      console.log(response.data);
      navigate("/nutritionist-dashboard")
      // redirect to dashboard or display success message
    } catch (error) {
      console.log(error.response.data);
      // display error message
    }
  };


  const handleExpertiseInfoSubmit = (e) => {
    e.preventDefault();
    nextPage();
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  const prevPage = () => {
    setPage(page - 1);
  };

  return (
    <Wrapper>
      <form className="form page-transition" onSubmit={handleSubmit}>
        <CSSTransition
          in={page === 1}
          classNames="fade"
          timeout={300}
          unmountOnExit
        >
          <NutritionistInfo
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            credentials={credentials}
            setCredentials={setCredentials}
            areaOfExpertise={areaOfExpertise}
            setAreaOfExpertise={setAreaOfExpertise}
            educationTraining={educationTraining}
            setEducationTraining={setEducationTraining}
            page={page}
            nextPage={handleExpertiseInfoSubmit}
          />
        </CSSTransition>
        <div className="btn-container">
          <button type="submit" className="submit-button">Submit</button>
        </div>
      </form>
    </Wrapper>
  );
};

export default NutritionistSignUpForm;

