import React from "react";
import Wrapper from "../../assets/wrappers/SocialMediaNavbar";

function SocialMediaNavbar() {
    return (
        <div className="wrapper">
            <div className="menu">
                <div className="follow">Follow Us</div>
                <div className="line"></div>
                <div className="nav-menu">
                    <a href="#" className="menu-link">
                        Facebook
                    </a>
                    <a href="#" className="menu-link">
                        Instagram
                    </a>
                    <a href="#" className="menu-link">
                        Twitter
                    </a>
                    <a href="#" className="menu-link">
                        LinkedIn
                    </a>
                    <a href="#" className="menu-link">
                        YouTube
                    </a>
                </div>
            </div>
        </div>
    );
}

export default SocialMediaNavbar;
