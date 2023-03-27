import React from 'react';
import { useNavigate } from 'react-router-dom'

const ButtonLogout = () => {

    const Navigate = useNavigate()

    function handleLogout() {
        try {
            alert("You have successfully logged out!")
            Navigate("/")
            console.log(localStorage.getItem('token_id'));
            localStorage.removeItem('token_id');
            console.log("Successfully removed token!");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <button onClick={handleLogout}>Logout</button>
    );
}

export default ButtonLogout
