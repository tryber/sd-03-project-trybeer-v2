import styled from 'styled-components';

const Orders = styled.section`
  display: flex;
  flex-direction: column;
  background-color: #00000012;
  border: 1px solid rgba(0, 0, 0, 0.631);
  border-radius: 5px;
  height: 70%;
  margin: 0 auto;
  margin-top: 12em;
  padding: 20px;
  width: 40%;
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
  .total-price {
    color: black;
    font-size: 20px;
    font-weight: 800;
    height: 5%;
    letter-spacing: 2px;
    padding: 20px 0;
    text-align: center;
    width: 100%;
  }
`;

export default Orders;
