import React from 'react'
import { NavLink } from 'react-router-dom';
import links from '../SmallSideBar/links'

const DashNavLinks = () => {
    return (
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
    )
}

export default DashNavLinks
