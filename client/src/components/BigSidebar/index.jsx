import React, { useContext } from 'react'
import Wrapper from "../../assets/wrappers/BigSidebar"
import DashNavLinks from '../DashNavLinks';
import { SidebarContext } from '../../contexts/SidebarContext';
import vegetable from "../../assets/images/vegetable.png"

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
            <img src={vegetable} alt="vegetable" style={{width: "40%", height: "90%", marginLeft: "2.5rem", marginTop: "0.5rem"}}></img>
            </header>
            <DashNavLinks />
          </div>
        </div>
      </Wrapper>
    );
  };
  export default BigSidebar;
