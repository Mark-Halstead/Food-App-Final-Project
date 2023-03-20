import React from 'react'

const Hamburger = () => {
    return (
        <>
            <div className="hamburger-open-navbar-icon hamburger-navbar-icon hamburger-center">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <div className="hamburger-navbar-wrapper">
                <nav className="hamburger-navbar">
                    <div className="hamburger-close-navbar-icon hamburger-navbar-icon hamburger-center">
                        <div className="line line-1"></div>
                        <div className="line line-2"></div>
                    </div>
                    <div className="hamburger-nav-list">
                        <a href="#" className="hamburger-nav-link hamburger-center">Home</a>
                        <a href="#" className="hamburger-nav-link hamburger-center">Tours</a>
                        <a href="#" className="hamburger-nav-link hamburger-center">About Us</a>
                        <a href="#" className="hamburger-nav-link hamburger-center">Offer</a>
                        <a href="#" className="hamburger-nav-link hamburger-center">Contact</a>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Hamburger
