import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/RegisterPage';

function Register() {

    const Navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/users/signup', {
                email: email,
                password: password,
                role: role,
            });

            console.log(response.data);
            const { token_id } = response.data;
            localStorage.setItem('token_id', token_id);
            console.log(localStorage.getItem('token_id'));
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
                            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </label>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </label>
                        <label>
                            Role:
                            <input type="text" value={role} onChange={(event) => setRole(event.target.value)} />
                        </label>
                        <button type="submit">Register</button>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
}

export default Register;
