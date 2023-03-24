import React, { useState, useContext, useEffect } from 'react';
import Wrapper from "../../assets/wrappers/NavbarD"
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { SidebarContext } from '../../contexts/SidebarContext';
import { AuthContext } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const NavbarD = () => {
    const [showDropdown, setShowDropdown] = useState(false);
    const { sidebar, toggleSidebar } = useContext(SidebarContext);
    // const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    // const { username } = useContext(AuthContext);
    const navigate = useNavigate()

    useEffect(() => {
        if (!sidebar) {
            setShowDropdown(false);
        }
    }, [sidebar]);

    const handleToggleSidebar = () => {
        toggleSidebar(!sidebar);
    };
    console.log(sidebar)

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    // const handleLogout = () => {
    //     try {
    //         setIsLoggedIn(false)
    //         navigate('/')
    //         alert("Successfully logged out!")
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={handleToggleSidebar}>
                    <FaAlignLeft />
                </button>
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
                        Example User
                        <FaCaretDown />
                    </button>
                    <div className={`dropdown ${showDropdown ? 'show-dropdown' : ''}`}>
                        <button
                            type='button'
                            className='dropdown-btn'
                            // onClick={handleLogout}
                        >
                            logout
                        </button>
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default NavbarD;



