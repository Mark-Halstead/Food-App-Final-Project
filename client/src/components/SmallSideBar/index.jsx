import React from 'react'
import Wrapper from "../../assets/wrappers/SmallSidebar"
import { FaTimes } from 'react-icons/fa';

const SmallSideBar = () => {
    return (
        <Wrapper>
            <div className="sidebar-container show-sidebar" >
                <div className="content" >
                    <button className='close-btn' onClick={() => console.log('toggle')} >
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
