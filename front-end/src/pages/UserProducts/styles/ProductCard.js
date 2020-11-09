import styled from 'styled-components';

const Card = styled.section`
  display: flex;
  background-color: #00000012;
  flex-direction: column;
  margin: 20px;
  width: 220px;
  height: 300px;
  border: 1px solid black;
  border-radius: 5px;
  justify-content: space-around;
  align-items: center;
  .product-image {
    background-color: white;
    width: 95%;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    display: block;
    img {
      margin-left: auto;
      margin-right: auto;
      display: block;
      height: 100%;
    }
  }
  button { background: none; border: none;}
  button:hover { color: red; }
  .price { font-weight: bold; }
  .product-name { font-size: 18px; }
  span { font-size: 24px; margin: 20px; }
  @media only screen and (max-width: 565px)  {
    width: 90%;
  }
`;

export default Card;
