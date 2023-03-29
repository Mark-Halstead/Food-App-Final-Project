import styled from "styled-components";

const Wrapper = styled.main`
.navbar {
  position: relative; 
  z-index: 30; 
  top: 0;
  left: 0;
  width: 100%;
  background: rgb(238, 238, 238, 0);
  height: 4rem;
  display: flex;
  align-items: center;
}

.nav-center {
  width: 90vw;
  max-width: 1170px;
  margin: 0 auto -1rem auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
}

.nav-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
}

.nav-toggle {
  background: transparent;
  border: none;
  outline: none;
  font-size: 2rem;
  color: hsl(206, 100%, 76%);
  cursor: pointer;
  display: none;
  transition: all 0.2s linear;
}

.nav-toggle:hover {
  transform: scale(1.2);
}

.nav-link {
  display: block;
  padding: 1rem 2rem;
  text-transform: capitalize;
  letter-spacing: 0.20rem;
  transition: all 0.2s linear;
  color: hsl(209, 61%, 16%);
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 1000;
}

.nav-link:hover {
    color: hsl(150, 60%, 20%);
    background-color: rgba(63, 228, 43, 0.5);
    padding-left: 2.25rem;
}

/* nav toggle functionality */
.nav-links {
  overflow: hidden;
  height: auto;
  display: flex;
  transition: all 0.2s linear;
}

#landing-logo {
    margin: 1.2rem 0 0 3rem
}

.section-title h2 {
    text-transform: uppercase;
    letter-spacing: 0.55rem;
  }
  .section-title span {
    color: #18de18;
  }

`;
export default Wrapper;
