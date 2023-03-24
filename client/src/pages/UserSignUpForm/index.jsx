import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/SignUpForm';
import { FormFormat } from '../../components';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const UserSignUpForm = () => {

  const Navigate = useNavigate()
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  const handleSubmit = (e) => {
    Navigate("/goals-form")
  };

  const handleChange = (e, setAge, setWeight, setGender, setActivityLevel) => {
    e.preventDefault();
    setAge(e.target.value);
    setWeight(e.target.value);
    setGender(e.target.value);
    setActivityLevel(e.target.value);
  };

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Your details</h3>
        <div className='form-center'>
          <FormFormat
            type='text'
            name='Age'
            value={age}
            handleChange={(e) => handleChange(e, setAge)}
          />
          <FormFormat
            type='text'
            name='Weight'
            value={weight}
            handleChange={(e) => handleChange(e, setWeight)}
          />
          <FormFormat
            type='text'
            name='Gender'
            value={gender}
            handleChange={(e) => handleChange(e, setGender)}
          />
          <FormFormat
            type='text'
            name='Activity Level'
            value={activityLevel}
            handleChange={(e) => handleChange(e, setActivityLevel)}
          />
          <button type='submit' className='btn btn-block'>
            Next <RiArrowRightSLine style={{ fontSize: '10px' }} size={10} />
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default UserSignUpForm;

