import React, { useState, useContext, useEffect } from 'react';
import Wrapper from "../../assets/wrappers/NavbarD"
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { SidebarContext } from '../../contexts/SidebarContext';
import { useNavigate } from 'react-router-dom';
import ButtonLogout from '../ButtonLogout/index';

const NavbarD = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { sidebar, toggleSidebar } = useContext(SidebarContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!sidebar) {
            setShowDropdown(false);
        }
    }, [sidebar]);

    const handleToggleSidebar = () => {
        toggleSidebar(!sidebar);
    };

    const handleLogout = () => {
        try {
            localStorage.removeItem('token')
            alert('You have successfully logged out!')
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <Wrapper>
            <div className='nav-center'>
                <div>
                    <button type='button' className='toggle-btn' onClick={handleToggleSidebar}>
                        <FaAlignLeft />
                    </button>
                </div>
                <div>
                    <h3 className='logo-text'>dashboard</h3>
                </div>
                <div className='btn-container'>
                    <button
                        type='button'
                        className='btn'
                        onClick={toggleDropdown}
                    >
                        <FaUserCircle />
                        Welcome
                        <FaCaretDown />
                    </button>
                    <div className={`dropdown ${showDropdown ? 'show-dropdown' : ''}`}>
                        <ButtonLogout handleLogout={handleLogout} />
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default NavbarD;



