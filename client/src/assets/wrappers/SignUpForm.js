import styled from 'styled-components'

const Wrapper = styled.section`
position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: var(--borderRadius);
  width: 30%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);
  h3 {
    margin-top: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .input-outline {
    outline: none;
  }

  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
  display: flex;
  justify-content: center; 
  margin-top: 0.5rem;
  margin-bottom: 1rem; 
}

button {
  height: 35px;
  margin-left: 1rem;
  margin-right: 1rem; 
}

  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }

  .fade-enter {
    opacity: 0;
    transform: translateX(100%);
}

.fade-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
}

.fade-exit {
    opacity: 1;
    transform: translateX(0);
}

.fade-exit-active {
    opacity: 0;
    transform: translateX(-100%);
    transition: opacity 300ms, transform 300ms;
}

.submit-button {
    padding: 0 1rem 0 1rem;
    background-color: rgba(10, 212, 10, 0.8);
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    font-size: 1.2rem;
    cursor: pointer;
    outline: none;
    transition: all 0.3s;
}

.submit-button:hover {
    background-color: rgba(35, 150, 35, 0.8);
}
`

export default Wrapper
