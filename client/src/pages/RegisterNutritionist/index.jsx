import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/RegisterPage';

function RegisterNutritionist() {

    const Navigate = useNavigate()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsRegistering(true);

        try {
            const response = await axios.post('https://plate-perfect-server.onrender.com/nutritionists/signup', {
                email: email,
                password: password
            });
            console.log(response.data);
            const { token } = response.data;
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'));
            setIsRegistering(false);
            Navigate("/nutritionist-signup-form")
        } catch (error) {
            console.log(error.response.data);
            setIsRegistering(false);
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
                    </form>
                </div>
            </div>
        </Wrapper>
    );
}

export default RegisterNutritionist;
