import React from 'react';
import { Outlet } from 'react-router-dom'
import NavLinks from '../NavLinks'
import Landinglogo from '../Landinglogo';
import Wrapper from "../../assets/wrappers/Navbar"

const NavBar = () => {


    return (
        <Wrapper>
            <nav className='navbar'>
                <Landinglogo title='plate' subTitle='pal' />
                <div className='nav-center'>
                    <NavLinks parentClass='nav-links' itemClass='nav-link' />
                </div>
            </nav>
            <Outlet />
        </Wrapper>
    )
}

export default NavBar
