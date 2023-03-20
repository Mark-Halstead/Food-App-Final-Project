import React from 'react'

const Hamburger = () => {
    return (
        <div class="hamburger-container">
            <div class="open-navbar-icon navbar-icon center">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
            <div class="navbar-wrapper">
                <nav class="navbar">
                    <div class="close-navbar-icon navbar-icon center">
                        <div class="line line-1"></div>
                        <div class="line line-2"></div>
                    </div>
                    <div class="nav-list">
                        <a href="#" class="nav-link center">Home</a>
                        <a href="#" class="nav-link center">Tours</a>
                        <a href="#" class="nav-link center">About Us</a>
                        <a href="#" class="nav-link center">Offer</a>
                        <a href="#" class="nav-link center">Contact</a>
                    </div>
                </nav>
            </div>
        </div>
    )
}

export default Hamburger
