import React from 'react';

const FormFormat = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      {type === 'radio' ? (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className='form-input'
          style={{ transform: 'scale(0.6)' }}
        />
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={handleChange}
          className='form-input'
        />
      )}
    </div>
  );
};

export default FormFormat;

