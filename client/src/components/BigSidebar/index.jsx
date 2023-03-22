import React from 'react'
import Wrapper from "../../assets/wrappers/BigSideBar"
import DashNavLinks from '../DashNavLinks';


const BigSidebar = () => {

    const isSidebarOpen = false
    return (
        <Wrapper>
            <div
                className={
                    isSidebarOpen
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
