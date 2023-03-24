import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import { ButtonLogout } from '../../components';
import Wrapper from '../../assets/wrappers/LoginPage';
import { AuthContext } from '../../contexts/AuthContext';

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);

    async function handleLogin(event) {
        event.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/users/login', { username, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);
            console.log(response.data.token);
            setIsLoggedIn(true);
            setUsername(username);
            alert('You have successfully logged in!');
            navigate('/quizzes');
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <Wrapper>
            <div className='login-background'>
                <div className='login-container'>
                    <form onSubmit={handleLogin}>
                        <label>
                            Username:
                            <input type="text" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </label>
                        <label>
                            Password:
                            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </label>
                        <button type="submit">Login</button>
                        {/* <ButtonLogout /> */}
                    </form>
                </div>
            </div>
        </Wrapper>
    );
}

export default Login;
