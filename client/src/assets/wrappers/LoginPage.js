import styled from "styled-components";

const Wrapper = styled.section`
    /*////////////////// LOGIN CSS START /////////////////////*/
    .login-background {
        height: 100vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgb(24, 212, 24, 0.8);
        background-image: url("https://thumbs.dreamstime.com/b/greek-food-background-traditional-different-greek-dishes-set-greek-food-background-traditional-different-greek-dishes-set-top-view-178761927.jpg");
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
    }

    .login-background::before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .login-container {
        background: #f0f0f0;
        padding: 4rem 4rem;
        max-width: 40%;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.5rem 0.2rem rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease-in-out;
        text-align: center;
        position: absolute;
    }

    .login-container:hover {
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
    }

    .login-container form {
        display: flex;
        flex-direction: column;
    }

    .login-container form input {
        margin: 1.5rem 0 1.5rem 1rem;
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
        background-color: rgba(22, 170, 22, 0.8);
        color: #ffffff;
        font-size: 1.1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
    }

    .login-container form button:hover {
        background-color: #8fae90;
    }
    /*////////////////// LOGIN CSS END ///////////////////////*/
`;

export default Wrapper;
