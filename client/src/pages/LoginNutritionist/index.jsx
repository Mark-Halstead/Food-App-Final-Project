import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Wrapper from '../../assets/wrappers/LoginPage';
// import { AuthContext } from '../../contexts/AuthContext';

function LoginNutritionist() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
// const { setIsLoggedIn } = useContext(AuthContext);

    async function handleLogin(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/nutritionists/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            console.log(localStorage.getItem('token'));
            alert('You have successfully logged in!');
            navigate('/nutritionist-dashboard');
        } catch (error) {
            console.error(error.response.data);
        }
    }

    return (
        <Wrapper>
            <div className='login-background'>
                <div className='login-container'>
                    <form onSubmit={handleLogin}>
                        <label>
                            Email:
                            <input type="text" value={email} onChange={(event) => setEmail(event.target.value)} />
                        </label>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </label>
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </Wrapper>
    );
}

export default LoginNutritionist;
