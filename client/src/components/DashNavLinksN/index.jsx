import React from 'react'
import { NavLink } from 'react-router-dom';
import nlinks from './nlinks'

const DashNavLinksN = () => {
    return (
        <div className='nav-links'>
            {nlinks.map((link) => {
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

export default DashNavLinksN
