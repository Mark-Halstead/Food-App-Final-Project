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
  margin-left: 1rem;
}

@media screen and (min-width: 768px) {
  .form-center {
    flex-direction: column;
    justify-content: center;
  }

  .form-group {
    grid-template-columns: auto auto;
    margin-right: 2rem;
  }

  .form-group:last-child {
    margin-right: 0;
  }

  .btn-container {
    display: flex;
    align-items: center;
    margin-top: 0;
    margin-left: 2rem;
  }
}



/*////////////////// REGISTER CSS END ///////////////////////*/
`
export default Wrapper
