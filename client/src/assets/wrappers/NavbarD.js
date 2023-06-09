import styled from "styled-components";

const Wrapper = styled.nav`
    height: var(--nav-height);
    display: flex;
    align-items: center;
    z-index: 1;
    justify-content: center;
    box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
    background: var(--white);
    .logo {
        display: flex;
        align-items: center;
        width: 100px;
    }
    .nav-center {
        display: flex;
        width: 90vw;
        align-items: center;
        justify-content: space-between;
    }
    .nav-center div:first-child {
        flex: 1;
        display: flex;
        justify-content: flex-start;
    }
    .nav-center div {
        flex: 1;
        display: flex;
        justify-content: center;
    }
    .nav-center div:last-child {
        flex: 1;
        display: flex;
        justify-content: right;
    }
    .toggle-btn {
        background: transparent;
        border-color: transparent;
        font-size: 1.75rem;
        color: rgb(24, 212, 24, 0.8);
        cursor: pointer;
        display: flex;
        align-items: center;
    }

    .btn-container {
        position: relative;
    }
    .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0 0.5rem;
        position: relative;
        box-shadow: var(--shadow-2);
        background-color: rgb(24, 212, 24, 1);
    }

    .dropdown {
        position: absolute;
        top: 40px;
        right: 0;
        width: 80px;
        background: rgb(24, 212, 24, 0.5);
        cursor: pointer;
        box-shadow: var(--shadow-2);
        padding: 0.5rem;
        text-align: center;
        visibility: hidden;
        border-radius: var(--borderRadius);
    }
    .show-dropdown {
        visibility: visible;
    }
    .dropdown-btn {
        background: transparent;
        border-color: transparent;
        color: rgb(35, 220, 35, 1);
        letter-spacing: var(--letterSpacing);
        text-transform: capitalize;
        cursor: pointer;
    }
    .logo-text {
        display: none;
        margin: 0;
    }
    @media (min-width: 992px) {
        position: sticky;
        top: 0;

        .nav-center {
            width: 90%;
        }
        .logo {
            display: none;
        }
        .logo-text {
            display: block;
        }
    }
`;
export default Wrapper;
