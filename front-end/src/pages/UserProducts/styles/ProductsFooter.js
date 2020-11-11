import styled from 'styled-components';

const ProductsFooter = styled.section`
  background-color: black;
  bottom: 0;
  color: white;
  font-size: 12px;
  height: 80px;
  letter-spacing: 2px;
  padding-top: 15px;
  position: fixed;
  text-align: center;
  width: 100%;
  button {
    background-color: rgba(0, 0, 0, 0.816);
    border: 0;
    border-radius: 5px;
    color: white;
    font-size: 18px;
    font-weight: bold;
    height: 40px;
    margin: 0 auto;
    padding: 0.5em 2em;
    width: 55%;
  }
  button:hover {
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
    width: 55%;
  }
  span {
    bottom: 2.5em;
    position: absolute;
    font-size: 15px;
    font-weight: 500;
  }
`;

export default ProductsFooter;
