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
    font-size: 1rem;
    font-weight: bold;
    margin-right: 0.5rem;
}

select {
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s;
}

.input-outline {
    outline: none;
  }

  input[type="text"],
textarea {
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s;
}

input[type="number"] {
    padding: 0.5rem;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    font-size: 1rem;
    outline: none;
    transition: all 0.3s;
}

input[type="number"]:focus {
    border-color: rgb(24, 212, 24, 0.8);
    box-shadow: 0px 0px 5px rgb(24, 212, 24, 0.8);
}

input[type="text"]:focus,
textarea:focus {
    border-color: rgb(24, 212, 24, 0.8);
    box-shadow: 0px 0px 5px rgb(24, 212, 24, 0.8);
}

.btn-container {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

button {
    padding: 0 1rem 0 1rem;
    background-color: rgba(25, 212, 25, 0.8);
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    font-size: 1.2rem;
    cursor: pointer;
    outline: none;
    transition: all 0.3s;
}

button:hover {
    background-color: rgba(35, 150, 35, 0.8);
}



/*////////////////// REGISTER CSS END ///////////////////////*/
`
export default Wrapper
