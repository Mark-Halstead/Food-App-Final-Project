import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/RegisterPage';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/users/signup', {
        name: name,
        email: email,
        password: password,
      });

      console.log(response.data);
      alert('Thanks for registering!');
      navigate('/login');
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <Wrapper>
      <div className="register-background">
        <div className="register-container">
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input type="text" value={name} onChange={(event) => setName(event.target.value)} required />
            </label>
            <label>
              Email:
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>
            <label>
              Password:
              <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </label>
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </Wrapper>
  );
}

export default Register;
