import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom';
import links from "../SmallSideBar/links"
import { SidebarContext } from '../../contexts/SidebarContext';


const DashNavLinks = () => {
    const { sidebar, toggleSidebar } = useContext(SidebarContext);
    const handleToggleSidebar = () => {
      if (sidebar === false) {
        toggleSidebar(true);
      } else {
        toggleSidebar(!sidebar);
      }
    }
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
                        onClick={handleToggleSidebar}
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

