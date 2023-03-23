import React, { useContext, useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { SidebarContext } from '../../contexts/SidebarContext';
import DashNavLinks from '../DashNavLinks';
import Wrapper from '../../assets/wrappers/SmallSidebar';
import DashNavLinks from '../DashNavLinks';

const SmallSideBar = () => {
  const { sidebar, toggleSidebar } = useContext(SidebarContext);
  const [initialState, setInitialState] = useState(sidebar);

  useEffect(() => {
    setInitialState(sidebar);
  }, [sidebar]);

  const handleToggleSidebar = () => {
    if (sidebar === false) {
      toggleSidebar(true);
    } else {
      toggleSidebar(!sidebar);
    }
  }
  console.log(sidebar)

  return (
    <Wrapper>
      <div className={sidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
        <div className="content">
          <button className='close-btn' onClick={handleToggleSidebar}>
            <FaTimes />
          </button>
          <header>
            {/* Our Team logo here */}
          </header>
          <DashNavLinks />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSideBar;


