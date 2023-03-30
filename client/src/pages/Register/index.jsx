import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/RegisterPage';

function Register() {

    const Navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/users/signup', {
                email: email,
                password: password
            });

            console.log(response.data);
            const { token } = response.data;
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'));
            alert("Thanks for registering!")
            Navigate("/user-signup-form")
        } catch (error) {
            console.log(error.response.data);
        }
    };

    return (
        <Wrapper>
            <div className='register-background'>
                <div className="register-container">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Email:
                            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </label>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </label>
                        <button type="submit">Register</button>
                        <button onClick={() => Navigate("/register-nutritionist")}>Register as a Nutritionist</button>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
}

export default Register;
