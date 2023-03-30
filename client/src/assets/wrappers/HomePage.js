import styled from "styled-components";

const Wrapper = styled.article`
    /*////////////////// GLOBAL STYLES START /////////////////////*/
    @import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap");

    @import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap");

    @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap");

    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap");

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Open Sans";
    }
    html {
        scroll-behavior: smooth;
    }
    body {
        background: #fff;
        color: hsl(209, 61%, 16%);
        line-height: 1.5;
        font-size: 0.875rem;
    }
    ul {
        list-style-type: none;
    }
    li {
        margin-right: 15px;
        font-weight: 800;
    }
    a {
        text-decoration: none;
    }

    h1,
    h2,
    h3,
    h4 {
        letter-spacing: 0.2rem;
        text-transform: capitalize;
        line-height: 1.25;
        margin-bottom: 0.75rem;
    }
    h1 {
        font-size: 3rem;
    }
    h2 {
        font-size: 2rem;
    }
    h3 {
        font-size: 1.25rem;
    }
    h4 {
        font-size: 0.875rem;
    }
    p {
        margin-bottom: 1.25rem;
        color: hsl(210, 22%, 49%);
    }
    /*////////////////// GLOBAL STYLES START /////////////////////*/

    /*////////////////// HAMBURGER-MENU STYLES START /////////////////////*/
    .hamburger-navbar-icon {
        width: 5.5rem;
        height: 5.5rem;
        border-radius: 50%;
        cursor: pointer;
        flex-direction: column;
    }

    .hamburger-open-navbar-icon {
        position: fixed;
        top: 0.4rem;
        left: 0.5rem;
        z-index: 200;
    }

    .hamburger-navbar-icon .line {
        height: 0.2rem;
        width: 3.5rem;
        background-color: rgb(203, 203, 203);
    }

    .hamburger-open-navbar-icon .line {
        margin: 0.6rem 1rem;
    }

    .hamburger-navbar-wrapper {
        width: 100vw;
        height: 100vh;
        background-color: rgba(255, 255, 255, 0.7);
        position: fixed;
        left: 0;
        bottom: -100%;
        opacity: 0;
        z-index: 300;
        padding: 3.5rem 5.5rem 3.5rem 3.5rem;
        transition: bottom 0.5s, opacity 0.2s;
    }

    .change .hamburger-navbar-wrapper {
        bottom: 0;
        opacity: 1;
        transition: bottom 0.5s, opacity 0.2s 0.25s;
    }

    .hamburger-navbar {
        width: 100%;
        height: 100%;
        background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)),
            url(images/navbar-bg.jpg) center no-repeat;
        background-size: cover;
        position: relative;
        overflow-y: hidden;
    }

    .hamburger-close-navbar-icon {
        position: absolute;
        top: 2.5rem;
        right: 3rem;
        z-index: 300;
    }

    .hamburger-close-navbar-icon .line {
        position: absolute;
    }

    .hamburger-ine-1 {
        transform: rotate(40deg);
    }

    .hamburger-line-2 {
        transform: rotate(-40deg);
    }

    .hamburger-nav-list {
        height: 100%;
        display: flex;
    }

    .hamburger-nav-link {
        font-size: 3rem;
        font-weight: 700;
        color: #fff;
        text-transform: uppercase;
        width: 100%;
        opacity: 0.8;
        position: relative;
        top: -100%;
        transition: all 0.3s;
    }

    .change .hamburger-nav-link {
        top: 0;
    }

    .hamburger-nav-link:hover {
        opacity: 1;
        color: #c2c2c2;
    }

    .change .hamburger-nav-link:nth-child(1) {
        transition: top 1s 0.4s, opacity 0.3s, color 0.3s;
    }

    .change .hamburger-nav-link:nth-child(2) {
        transition: top 1s 0.6s, opacity 0.3s, color 0.3s;
    }

    .change .hamburger-nav-link:nth-child(3) {
        transition: top 1s 0.8s, opacity 0.3s, color 0.3s;
    }

    .change .hamburger-nav-link:nth-child(4) {
        transition: top 1s 1s, opacity 0.3s, color 0.3s;
    }

    .change .hamburger-nav-link:nth-child(5) {
        transition: top 1s 1.2s, opacity 0.3s, color 0.3s;
    }
    /*////////////////// HAMBURGER-MENU STYLES  /////////////////////*/

    /*//////////////// LANDING CSS START ///////////////*/
    .landing {
        height: 100vh;
        margin-top: -1.1vh;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        z-index: 10;
    }

    .landing-banner {
        text-align: center;
        color: #fff;
        padding: 0 5vw;
        margin-bottom: 8vh;
        margin-right: 27.5vw;
        position: relative;
        z-index: 10;
        animation: fadein 2s ease-in-out;
    }

    @keyframes fadein {
        from {
            opacity: 0;
            transform: translateY(-50%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .landing-banner h1 {
        text-transform: uppercase;
        font-weight: 500;
        font-size: 4.5vw;
        color: rgb(24, 212, 24);
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    .landing-banner p {
        max-width: 35vw;
        margin-left: auto;
        margin-right: auto;
        color: #fff;
        letter-spacing: 0.25vw;
        z-index: -3;
    }

    .landing-btn {
        padding: 0.9vh 1.6vw;
        font-size: 1.25vw;
        margin-top: 3vh;
        background: #fff;
        color: #18de18;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
        100% {
            transform: scale(1);
        }
    }

    .landing-btn:hover {
        background: transparent;
        color: #fff;
        border-color: #fff;
    }

    .btn {
        text-transform: uppercase;
        background: #fff;
        color: #18de18;
        padding: 0.4vh 0.45vw 0.4vh 0.8vw;
        letter-spacing: 0.15vw;
        display: inline-block;
        font-weight: 600;
        transition: all 0.3s linear;
        font-size: 1vw;
        border: 0.2vw solid transparent;
        cursor: pointer;
        box-shadow: 0 0.3vw 0.9vw rgba(0, 0, 0, 0.2);
        animation: pulse 2s ease-in-out infinite;
    }

    .btn:hover {
        color: hsl(184, 91%, 17%);
        background: none;
    }

    .floating-bg {
        z-index: 1;
        width: 100vw;
        height: 100vw;
        background-color: #a7ffa7;
        position: absolute;
        top: -65vw;
        right: -40vw;
        border-radius: 45%;
        animation: rotate 30s infinite;
    }

    .floating-bg::before {
        content: "";
        width: 100%;
        height: 100%;
        background-color: rgb(24, 212, 24, 0.8);
        position: absolute;
        top: 0;
        left: 0;
        border-radius: 40%;
        animation: rotate 30s infinite;
    }

    @keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @media screen and (min-width: 768px) {
        .landing {
            background: rgb(44, 174, 186, 0.7), url("") center/cover no-repeat;
        }
        .landing-banner {
            padding: 0;
        }
        .landing-banner p {
            max-width: 45vw;
        }
    }

    /*//////////////// LANDING CSS END ///////////////*/

    /*//////////////// BANNER CSS START ///////////////*/
    .banner {
        position: absolute;
        top: 20vh;
        left: 50vw;
        transform: translateX(-50%);
        text-align: center;
        width: 100vw;
        padding: 0 5vw;
    }

    .banner-heading {
        height: 20vh;
        margin-left: -71vw;
        margin-top: -40vh;
        perspective: 60vh;
        overflow: hidden;
    }

    .banner-heading span {
        font-family: "Oswald", sans-serif;
        font-size: 4vw;
        font-weight: 800;
        text-transform: uppercase;
        color: rgb(24, 212, 24);
        margin-top: 10vh;
        margin-left: 0.5vw;
        text-shadow: 0.3vw 0.3vw 0.6vw rgba(0, 0, 0, 0.1);
        position: absolute;
        width: 100vw;
        display: flex;
        justify-content: center;
        transform: translateZ(8vw);
        opacity: 0;
        letter-spacing: 3vw;
    }

    .banner-heading-1 {
        animation: animateHeading 12s 3s infinite;
    }

    .banner-heading-2 {
        animation: animateHeading 12s 6s infinite;
    }

    .banner-heading-3 {
        animation: animateHeading 12s 9s infinite;
    }

    .banner-heading-4 {
        animation: animateHeading 12s 12s infinite;
    }

    @keyframes animateHeading {
        0% {
            transform: translateZ(8vw);
            opacity: 0;
            letter-spacing: 3vw;
        }

        3% {
            transform: translateZ(0);
            opacity: 1;
            letter-spacing: 1.5vw;
        }

        25% {
            transform: translateZ(0);
            opacity: 1;
            letter-spacing: 1.5vw;
        }

        28% {
            transform: translateZ(8vw);
            opacity: 0;
            letter-spacing: 3vw;
        }

        100% {
            transform: translateZ(8vw);
            opacity: 0;
            letter-spacing: 3vw;
        }
    }

    .banner-paragraph {
        font-size: 4vw;
        font-weight: 400;
        text-transform: uppercase;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.6);
        width: 30vw;
        margin: 0 auto 6vh auto;
        padding: 1vh 0;
        box-shadow: 1vw 1vw 5vw rgba(0, 0, 0, 0.5);
        opacity: 0;
        visibility: hidden;
        animation: fadeAnimation 1s 1.5s forwards;
    }

    @keyframes fadeAnimation {
        0% {
            opacity: 0;
            visibility: hidden;
        }
        100% {
            opacity: 1;
            visibility: visible;
        }
    }

    .banner-btn {
        width: 20vw;
        height: 8vh;
        /* background: linear-gradient(to right, #9b0e0e, #7a1010); */
        background-color: rgb(24, 212, 24);
        color: #fff;
        font-size: 1.5vw;
        margin: 10vh 32vw 0 -100vw;
        text-transform: uppercase;
        border-radius: 3vw;
        border: 0.1vw solid rgb(24, 212, 24);
        box-shadow: 1vw 2vw 3vw rgba(0, 0, 0, 0.5);
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        position: relative;
        overflow: hidden;
        animation: fadeAnimation 1s 2s forwards;
    }

    .banner-btn::before {
        content: "";
        width: 100%;
        height: 100%;
        background: linear-gradient(to right, transparent, #fff, transparent);
        position: absolute;
        top: 0;
        left: -100%;
        transform: skewX(-30deg);
        transition: left 0.5s;
    }

    .banner-btn:hover::before {
        left: 100%;
    }

    /*//////////////// BANNER CSS END /////////////////*/

    /*//////////////// ABOUT CSS START /////////////////*/
    .about-img,
    .about-info {
        margin-bottom: 2rem;
    }
    img:not(.nav-logo) {
        width: 90%;
        display: block;
    }
    .about-section {
        padding: 0 0 0 0;
        height: 95vh;
    }
    .section-title {
        text-align: center;
        margin-bottom: 4rem;
    }
    .section-title h2 {
        text-transform: uppercase;
    }
    .section-title span {
        color: rgb(24, 212, 24);
    }
    .section-center {
        width: 90vw;
        margin: 0 auto;
        max-width: 1170px;
    }

    .btn-activities {
        animation-name: pulse;
        animation-duration: 2s;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }
    .section-center {
        width: 95vw;
    }

    .about-center {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 2rem;
    }
    .about-img,
    .about-info {
        margin-bottom: 0;
    }

    .about-img::before {
        content: "";
        position: absolute;
        width: 90%;
        height: 100%;
        border: 0.5rem solid rgb(24, 212, 24);
        box-sizing: border-box;
        top: -1.5rem;
        left: -1rem;
    }

    .about-img {
        position: relative;
    }
    .about-photo {
        position: relative;
    }
    .about-section-center {
        margin-left: 5rem;
        margin-top: 3rem;
    }
    /*//////////////// ABOUT CSS END ///////////////////*/

    /*//////////////// PRICING CARDS CSS START ///////////////*/
    .popular-tours {
        padding: 3.75rem 0 7.5rem 0;
        height: 100vh;
        max-width: 100%;
        opacity: 0.95;
    }

    .popular-tours-heading {
        font-size: 2rem;
        font-family: "Open Sans";
        list-style-type: none;
        text-decoration: none;
        box-sizing: border-box;
        outline: none;
        text-align: center;
        margin-top: -1rem;
        margin-bottom: 2rem;
        color: #3fe42b;
        text-shadow: 0 0.125rem 0.25rem #3fe42b;
    }

    .cards-wrapper {
        display: flex;
        justify-content: space-evenly;
    }

    .card {
        width: 22rem;
        position: relative;
        perspective: 100rem;
    }

    .card-image {
        min-width: 100%;
        border-radius: 0.375rem 0.375rem 0 0;
    }

    .front-side {
        text-align: center;
        background-color: #fdfdfd;
        border-radius: 0.25rem;
        position: relative;
        z-index: 10;
        opacity: 0.9;
        transition: opacity 0.4s, transform 0.4s, box-shadow 0.4s;
    }

    .change > .front-side {
        transform: translateZ(-3.75rem) translateX(2.5rem);
        box-shadow: 0 1.25rem 3.75rem #777;
        opacity: 0.5;
        z-index: 0;
    }

    .tour-name {
        font-size: 2rem;
        font-weight: 500;
        text-transform: uppercase;
        position: absolute;
        top: 20%;
        right: 1.25rem;
        color: #fff;
        text-shadow: 0 0 1rem #000, 0 0 1rem #000, 0 0 1rem #000, 0 0 1rem #000;
    }

    #free-plan {
        top: 23%;
    }

    .card-list {
        width: 60%;
        margin: auto;
        padding: 1.875rem 0 2.5rem 0;
    }

    .card-list-item {
        font-size: 0.9375rem;
        font-weight: 300;
        color: #777;
        margin: 1.25rem 0;
        border-bottom: 0.25rem solid #3fe42b;
        padding-bottom: 1.25rem;
    }

    .back-side {
        position: absolute;
        top: 0;
        background-color: #3fe42b;
        width: 100%;
        height: 100%;
        border-radius: 0.3125rem;
        box-shadow: 0 1.5625rem 4.0625rem #777;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        transform: translateZ(-3.75rem) translateX(2.5rem);
        opacity: 0.5;
        transition: opacity 0.4s, transform 0.4s, box-shadow 0.4s;
    }

    .change > .back-side {
        transform: translateZ(0) translateX(0);
        box-shadow: 0 0.9375rem 3.125rem #aaa;
        opacity: 0.8;
    }

    .tour-price {
        font-size: 2rem;
        font-weight: 300;
        color: #fff;
    }

    .card-button {
        color: #3fe42b;
        background-color: #fff;
        border: none;
        font-size: 1.5rem;
        padding: 0.75rem 1rem;
        letter-spacing: 0.2rem;
        border-radius: 4rem;
        cursor: pointer;
    }

    .navigation-button {
        position: absolute;
        top: 0.5rem;
        left: 0.5rem;
        padding: 0.5rem;
        background-color: rgba(255, 255, 255, 0.8);
        color: #777;
        border-radius: 0.3rem;
        border: none;
        font-size: 1.5rem;
        font-weight: 500;
        text-transform: uppercase;
        letter-spacing: 0.2rem;
        cursor: pointer;
    }
    /*//////////////// PRICING CARDS CSS END ///////////////*/

    /*//////////////// FOOD IMAGE CSS START /////////////////*/
    #food {
        position: absolute;
        top: 15vh;
        left: 50vw;
        width: 36vw;
        height: 70vh;
        transform: translate(-50%, -50%);
        z-index: 100;
        animation: spin 36s linear infinite;
    }

    @keyframes spin {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    /*//////////////// FOOD IMAGE CSS END ///////////////////*/

    /*//////////////// PEOPLE REVIEWS CSS START ///////////////////*/
    .stories {
        padding: 5rem 0;
        position: relative;
    }

    .stories-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100vh;
        margin-top: -2rem;
    }

    .reviews {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .story-bg {
        background-color: rgba(238, 238, 238, 0.85);
        padding: 2rem 5rem 0 2.5rem;
        margin: 2.5rem 0 0 0;
        width: 75%;
        box-shadow: 0 1rem 2.5rem rgba(51, 51, 51, 0.4);
        transform: skewX(20deg);
    }

    .story {
        transform: skewX(-20deg);
        display: flex;
    }

    .story-image {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        object-fit: cover;
        margin-right: 2.5rem;
    }

    .story-text {
        letter-spacing: 0.05rem;
    }

    .story-heading {
        font-size: 1.25rem;
        text-transform: uppercase;
        color: var(--grey-color);
        margin-bottom: 0.5rem;
    }

    .story-paragraph {
        font-size: 0.9rem;
        color: var(--light-grey-color);
    }

    .story-paragraph::first-letter {
        margin-left: 0.5rem;
    }

    /*//////////////// PEOPLE REVIEWS CSS END /////////////////////*/

    /*//////////////// FOOTER CSS START ///////////////*/

    .wrapper {
        width: 100%;
        height: 30vh;
        background-color: #262626;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .follow,
    .menu-link {
        font-size: 1.1rem;
        font-weight: 300;
        color: #fff;
        text-transform: uppercase;
        letter-spacing: 0.1rem;
        margin-right: 4rem;
    }

    .follow {
        pointer-events: auto;
    }

    .menu {
        display: flex;
        align-items: center;
        cursor: pointer;
        pointer-events: none;
    }

    .menu:hover {
        pointer-events: auto;
    }

    .line {
        width: 10rem;
        height: 0.1rem;
        margin-right: 5rem;
        position: relative;
    }

    .line::after {
        content: "";
        position: absolute;
        width: 0;
        height: 100%;
        background-color: #fff;
        transition: width 0.5s;
    }

    .menu:hover .line::after {
        width: 100%;
    }

    .nav-menu {
        display: flex;
    }

    .menu-link {
        text-decoration: none;
        position: relative;
        top: 5rem;
        opacity: 0;
        padding: 0.5rem;
        border-radius: 0.5rem;
    }

    .menu:hover .menu-link {
        top: 0;
        opacity: 1;
    }

    .menu-link:nth-child(1) {
        transition: top 0.5s 0.1s, opacity 0.5s 0.1s, background-color 0.3s;
    }

    .menu-link:nth-child(2) {
        transition: top 0.5s 0.2s, opacity 0.5s 0.2s, background-color 0.3s;
    }

    .menu-link:nth-child(3) {
        transition: top 0.5s 0.3s, opacity 0.5s 0.3s, background-color 0.3s;
    }

    .menu-link:nth-child(4) {
        transition: top 0.5s 0.4s, opacity 0.5s 0.4s, background-color 0.3s;
    }

    .menu-link:nth-child(5) {
        transition: top 0.5s 0.5s, opacity 0.5s 0.5s, background-color 0.3s;
    }

    .menu-link:nth-child(1):hover {
        background-color: #3b5998;
    }

    .menu-link:nth-child(2):hover {
        background-color: #3f729b;
    }

    .menu-link:nth-child(3):hover {
        background-color: #55acee;
    }

    .menu-link:nth-child(4):hover {
        background-color: #0077b5;
    }

    .menu-link:nth-child(5):hover {
        background-color: #cd201f;
    }
    /*//////////////// FOOTER CSS END /////////////////*/
`;

export default Wrapper;
