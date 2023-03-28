import React from 'react'
import { NavLink } from 'react-router-dom';
import links from "../SmallSideBar/links"

const DashNavLinks = () => {
    return (
        <div className='nav-links'>
            {links.map((link) => {
                const { text, path, id, icon: Icon } = link;
                return (
                    <NavLink
                        to={path}
                        className="nav-link"
                        activeClassName="active"
                        key={id}
                        end
                    >
                        <div className="icon-container">
                            <Icon className="icon" /> 
                        </div>
                        <span className="link-text">{text}</span> 
                    </NavLink>
                );
            })}
        </div>
    )
}

export default DashNavLinks

