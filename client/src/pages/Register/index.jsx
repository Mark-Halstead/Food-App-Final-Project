import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/RegisterPage';

function Register() {

    const Navigate = useNavigate()

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/users/signup', {
                username: username,
                password: password,
                role: role,
            });

            console.log(response.data);
            alert("Thanks for registering!")
            Navigate("/login")
            // redirect to login page or display success message
        } catch (error) {
            console.log(error.response.data);
            // display error message
        }
    };

    return (
        <Wrapper>
            <div className='register-background'>
                <div className="register-container">
                    <form onSubmit={handleSubmit}>
                        <label>
                            Username:
                            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
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
