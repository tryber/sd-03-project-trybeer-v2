import styled from 'styled-components';

const UserForm = styled.section`
  background-color: #00000012;
  border: 1px solid rgba(0, 0, 0, 0.631);
  border-radius: 5px;
  height: 70%;
  margin: 0 auto;
  margin-top: 8%;
  padding: 20px;
  width: 40%;

  .ipt_form {
    border: 0;
    border-radius: 5px;
    color: rgb(5, 10, 75);
    height: 35px;
    margin: 10px 20px;
    padding-left: 10px;
    width: 90%;
  }

  .ipt_form:focus {
    box-shadow: inset 0 0 0 1px rgb(253, 253, 253), 0 0 3px 1px rgb(216, 208, 208);
    outline: none;
  }

  .div_form {
    align-content: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 35px;
    width: 400px;
  }

  .txt_label {
    color: black;
    font-size: 18px;
    letter-spacing: 0.05em;
  }

  .form-group {
    width: 90%;
    margin-top: 10px;
  }

  .txt_seller {
    color: black;
    font-size: 16px;
    letter-spacing: 0.05em;
  }

  h1,
  h2 {
    color: black;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode',
      Geneva, Verdana, sans-serif;
    text-shadow: rgba(0, 0, 0, 0.268) 0.1em 0.1em 0.2em;
  }

  h2 {
    color: #000000e9;
    font-weight: 100;
    letter-spacing: 0.05em;
  }

  .btn_ok {
    background-color: rgba(0, 0, 0, 0.816);
    border: 0;
    border-radius: 5px;
    color: #1f8dd6;
    font-size: 18px;
    height: 40px;
    margin: 0 auto;
    margin-top: 35px;
    padding: 0.5em 2em;
    width: 80%;
  }

  .btn_ok:hover {
    background-color: black;
    border: none transparent;
    border-radius: 5px;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.1);
    color: #1e8ad1;
    cursor: pointer;
    font-size: 18px;
    height: 40px;
    padding: 0.5em 2em;
    transition: all 0.4s ease 0s;
    width: 80%;
  }

  .seller {
    margin-top: 10px;
  }

  .div_btn {
    margin: 0 auto;
  }

  .div_btn2 {
    margin-top: 10px;
  }

  .btn_ok2 {
    color: black;
    margin-top: 10px;
  }

  .txt_alert {
    color: rgb(255, 156, 156);
    margin: 5px 0;
  }
`;

export default UserForm;
