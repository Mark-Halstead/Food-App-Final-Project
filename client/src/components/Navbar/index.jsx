import React from 'react';
import { Outlet } from 'react-router-dom'
import NavLinks from '../NavLinks'
import LandingLogo from '../LandingLogo';
import { useAuth0 } from '@auth0/auth0-react';

const NavBar = () => {
    const { isAuthenticated, loginWithRedirect, logout, user, isLoading} = useAuth0();
    console.log(isAuthenticated,user,isLoading);


    return (
        <>
            <nav className='navbar'>
                <LandingLogo title='plate' subTitle='pal' />
                <div className='nav-center'>
                    <NavLinks parentClass='nav-links' itemClass='nav-link' />
                        <button onClick={loginWithRedirect}>login</button>
                        <button onClick={() =>{logout({returnTo:window.location.origin})}}>logout</button>
                </div>
            </nav>
            <Outlet />
        </>
    )
}

export default NavBar
