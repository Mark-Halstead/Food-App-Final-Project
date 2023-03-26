import styled from 'styled-components'

const Wrapper = styled.section`
/*////////////////// REGISTER CSS START /////////////////////*/
.form-center {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
}

.form-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  margin-bottom: 1rem;
}

label {
  margin-right: 0.5rem;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

button {
  height: 35px;
  align-self: flex-end;
  margin-left: 1rem;
}

.button {
    cursor: pointer;
    color: var(--white);
    background: var(--primary-500);
    border: transparent;
    border-radius: var(--borderRadius);
    letter-spacing: var(--letterSpacing);
    padding: 0.375rem 0.75rem;
    box-shadow: var(--shadow-2);
    transition: var(--transition);
    text-transform: capitalize;
    display: inline-block;
}
.button:hover {
    background: var(--primary-700);
    box-shadow: var(--shadow-3);
}


/*////////////////// REGISTER CSS END ///////////////////////*/
`
export default Wrapper
