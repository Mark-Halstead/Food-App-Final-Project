import styled from 'styled-components'

const Wrapper = styled.section`
/*////////////////// REGISTER CSS START /////////////////////*/
.register-background {
  height: 110vh;
  width: 100%;
  background-color: #4CAF50;
}

.register-container {
  background: #ffffff;
  padding: 4rem 4rem;
  max-width: 40%;
  border-radius: 0.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;
  text-align: center;
  position: absolute;
  left: 36%;
  top: 20%;
}

.register-container:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

.register-container form {
  display: flex;
  flex-direction: column;
}

.register-container form input {
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

.register-container form input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
}

.register-container form button {
  margin: 2rem 0 1rem;
  padding: 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #4CAF50;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.register-container form button:hover {
  background-color: #8fae90;
}
/*////////////////// REGISTER CSS END ///////////////////////*/
`
export default Wrapper
