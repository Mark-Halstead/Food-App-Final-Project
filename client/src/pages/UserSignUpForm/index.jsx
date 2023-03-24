import React, { useState } from 'react';
import Wrapper from '../../assets/wrappers/UserSignUpForm';
import { FormFormat } from '../../components';
import { RiArrowRightSLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

const UserSignUpForm = () => {
  const Navigate = useNavigate();
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [activityLevel, setActivityLevel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Navigate('/goals-form');
  };

  const handleChange = (e, setState) => {
    setState(e.target.value);
  };

  const activityLevels = [
    { label: 'Low', value: 'low' },
    { label: 'Lightly Active', value: 'lightly-active' },
    { label: 'Moderately Active', value: 'moderately-active' },
  ];

  const genderOptions = [
    { label: 'Select Gender', value: '' },
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ];

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>Your details</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <FormFormat
            type='number'
            name='Age'
            value={age}
            handleChange={(e) => handleChange(e, setAge)}
            style={{ width: '20%', margin: '0 auto' }}
          />
          <FormFormat
            type='number'
            name='Weight'
            value={weight}
            handleChange={(e) => handleChange(e, setWeight)}
            style={{ width: '20%', margin: '0 auto' }}
          />
          <div style={{ margin: '0 auto' }}>
            <FormFormat
              type='select'
              name='Gender'
              value={gender}
              handleChange={(e) => handleChange(e, setGender)}
              options={genderOptions}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label htmlFor='Activity Level'>Activity Level</label>
            {activityLevels.map((option) => (
              <FormFormat
                key={option.value}
                type='radio'
                name={option.label}
                value={option.value}
                label={option.label}
                checked={activityLevel === option.value}
                handleChange={(e) => handleChange(e, setActivityLevel)}
                style={{ transform: 'scale(0.8)', margin: '0 auto' }}
              />
            ))}
          </div>
          <button type='submit' className='btn btn-block'>
            Next <RiArrowRightSLine style={{ fontSize: '10px' }} size={10} />
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default UserSignUpForm;
