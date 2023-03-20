import React from 'react'

const Hamburger = () => {
    return (
        <>
            <div class="hamburger-open-navbar-icon hamburger-navbar-icon hamburger-center">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="hamburger-navbar-wrapper">
                <nav class="hamburger-navbar">
                    <div class="hamburger-close-navbar-icon hamburger-navbar-icon hamburger-center">
                        <div class="line line-1"></div>
                        <div class="line line-2"></div>
                    </div>
                    <div class="hamburger-nav-list">
                        <a href="#" class="hamburger-nav-link hamburger-center">Home</a>
                        <a href="#" class="hamburger-nav-link hamburger-center">Tours</a>
                        <a href="#" class="hamburger-nav-link hamburger-center">About Us</a>
                        <a href="#" class="hamburger-nav-link hamburger-center">Offer</a>
                        <a href="#" class="hamburger-nav-link hamburger-center">Contact</a>
                    </div>
                </nav>
            </div>
        </>
    )
}

export default Hamburger
