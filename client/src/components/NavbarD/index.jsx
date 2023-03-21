import React, { useState, useContext } from 'react';
import Wrapper from "../../assets/wrappers/Navbar"
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
// Import own logo (maybe from adobe?)
import { SidebarContext } from '../../contexts/SidebarContext';


const NavbarD = () => {

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    }

    const { sidebar, toggleSidebar } = useContext(SidebarContext);


    return (
        <Wrapper>
            <div className='nav-center'>
                <button type='button' className='toggle-btn' onClick={() => toggleSidebar()}>
                {console.log(sidebar)}
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
                        <FaCaretDown />
                    </button>
                    <div className={`dropdown ${showDropdown ? 'show-dropdown' : ''}`}>
                        {/* Logout needs to be toggled */}
                        <button
                            type='button'
                            className='dropdown-btn'
                            onClick={toggleDropdown}
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

