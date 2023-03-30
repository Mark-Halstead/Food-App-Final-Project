import React from 'react';
import { useNavigate } from 'react-router-dom'

const ButtonLogout = () => {

    const Navigate = useNavigate()

    function handleLogout() {
        try {
            Navigate("/")
            console.log(localStorage.getItem('token'));
            localStorage.removeItem('token');
            console.log("Successfully removed token!");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handleLogout} style={{border: "none", backgroundColor: "transparent", color: "green", cursor: "pointer"}}>Logout</button>
    );
}

export default ButtonLogout
