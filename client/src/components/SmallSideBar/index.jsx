import React, { useState } from 'react'
import Wrapper from "../../assets/wrappers/SmallSidebar"
import { FaTimes } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import links from './links';

const SmallSideBar = () => {
    const [sidebar, setSidebar] = useState(true)

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }
    return (
        <Wrapper>
            <div className={sidebar ? "sidebar-container show-sidebar" : "sidebar-container"} >
                <div className="content" >
                    <button className='close-btn' onClick={() => toggleSidebar()} >
                        <FaTimes />
                    </button>
                    <header>
                        {/* Our Team logo here */}
                    </header>
                    <div className='nav-links'>
                        {links.map((link) => {
                            const { text, path, id } = link;
                            return (
                                <NavLink
                                    to={path}
                                    className={({ isActive }) => {
                                        return isActive ? 'nav-link active' : 'nav-link';
                                    }}
                                    key={id}
                                    onClick={() => toggleSidebar()}
                                    end
                                >
                                    {text}
                                </NavLink>
                            );
                        })}
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSideBar
