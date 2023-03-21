import React, { useState } from 'react'
import Wrapper from "../../assets/wrappers/SmallSidebar"
import { FaTimes } from 'react-icons/fa';

const SmallSideBar = () => {
    const [sidebar, setSidebar] = useState(true)

    const toggleSidebar = () => {
        setSidebar(!sidebar);
    }
    return (
        <Wrapper>
            <div className={sidebar ? "sidebar-container show-sidebar" : "sidebar-container"} >
                <div className="content" >
                    <button className='close-btn' onClick={() => toggleSidebar()} >
                        <FaTimes/>
                    </button>
                    <header>
                        {/* Our Team logo here */}
                    </header>
                    <div className='nav-links'>nav links</div>
                </div>
            </div>
        </Wrapper>
    )
}

export default SmallSideBar
