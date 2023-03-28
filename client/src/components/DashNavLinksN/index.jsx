import React from 'react'
import { NavLink } from 'react-router-dom';
import nlinks from './nlinks'

const DashNavLinksN = () => {
    return (
        <div className='nav-links'>
            {nlinks.map((link) => {
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

export default DashNavLinksN
