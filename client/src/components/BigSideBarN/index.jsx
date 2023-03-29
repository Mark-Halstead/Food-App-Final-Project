import React, { useContext } from 'react'
import Wrapper from "../../assets/wrappers/BigSidebar"
import DashNavLinksN from '../DashNavLinksN';
import { SidebarContext } from '../../contexts/SidebarContext';
import vegetable from "../../assets/images/vegetable.png"

const BigSideBarN = () => {

    const { sidebar } = useContext(SidebarContext);

    return (
        <Wrapper>
            <div
                className={
                    !sidebar
                        ? 'sidebar-container'
                        : 'sidebar-container show-sidebar'
                }
            >
                <div className='content'>
                    <header>
                    <img src={vegetable} alt="vegetable" style={{width: "40%", height: "90%", marginLeft: "2.5rem", marginTop: "0.5rem"}}></img>
                    </header>
                    <DashNavLinksN />
                </div>
            </div>
        </Wrapper>
    );
}

export default BigSideBarN
