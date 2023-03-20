import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom'
import NavLinks from '../NavLinks'
import LandingLogo from '../LandingLogo';

const NavBar = () => {

    return (
        <>
            <nav className='navbar'>
                <LandingLogo title='plate' subTitle='pal' />
                <div className='nav-center'>
                    <NavLinks parentClass='nav-links' itemClass='nav-link' />
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default NavBar
