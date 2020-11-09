import { createGlobalStyle } from 'styled-components';

const Background = createGlobalStyle`
  *,
  *:before,
  *:after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    background-color: #f2c94c;
  }
  button:focus {
    outline: none;
  }
`;

export default Background;
