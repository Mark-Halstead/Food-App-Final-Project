import styled from 'styled-components'

const Wrapper = styled.section`
/*////////////////// LOGIN CSS START /////////////////////*/
.login-background {
    height: 110vh;
    width: 100%;
    background-color: hsl(206, 95%, 55%);
  }
  
  .login-container {
    background: #ffffff;
    padding: 4rem 4rem;
    max-width: 40%;
    border-radius: 0.5rem;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    text-align: center;
    position: absolute;
    left: 34%;
    top: 20%;
  }
  
  .login-container:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
  
  .login-container form {
    display: flex;
    flex-direction: column;
  }
  
  .login-container form input {
    margin: 1.5rem 0;
    padding: 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: #f7f7f7;
    font-size: 1.1rem;
    font-weight: 400;
    color: #2d2d2d;
    transition: all 0.2s ease-in-out;
  }
  
  .login-container form input:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
  
  .login-container form button {
    margin: 2rem 0 1rem;
    padding: 1rem;
    border: none;
    border-radius: 0.25rem;
    background-color: hsl(206, 95%, 55%);
    color: #ffffff;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  
  .login-container form button:hover {
    background-color: #005fa3;
  }
/*////////////////// LOGIN CSS END ///////////////////////*/
`

export default Wrapper
