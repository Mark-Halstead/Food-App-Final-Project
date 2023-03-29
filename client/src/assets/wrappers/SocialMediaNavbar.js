import styled from 'styled-components'

const Wrapper = styled.aside`
* {
    margin: 0;
    padding: 0;
    font-family: "Quicksand", serif;
  }
  
  html {
    font-size: 62.5%;
  }
  
  .wrapper {
    width: 100%;
    height: 50vh;
    background-color: #262626;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .follow,
  .menu-link {
    font-size: 2rem;
    font-weight: 600;
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
`
export default Wrapper
