import React, { useContext } from 'react'
import Wrapper from "../../assets/wrappers/BigSidebar"
import DashNavLinks from '../DashNavLinks';
import { SidebarContext } from '../../contexts/SidebarContext';

const BigSidebar = () => {
    
    const { sidebar } = useContext(SidebarContext);
  
    return (
      <Wrapper>
        <div
          className={
            !sidebar
              ? 'sidebar-container '
              : 'sidebar-container show-sidebar'
          }
        >
          <div className='content'>
            <header>
            </header>
            <DashNavLinks />
          </div>
        </div>
      </Wrapper>
    );
  };
  export default BigSidebar;
