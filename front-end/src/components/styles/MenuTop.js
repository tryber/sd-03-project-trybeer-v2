import styled from 'styled-components';

const MenuTop = styled.section`
  position: fixed;
  background-color: black;
  height: 80px;
  width: 100%;
  top: 0;
  .menu {
    width: 60px;
    height: 60px;
    background-color: white;
    border-radius: 50%;
    position: fixed;
    left: 25px;
    top: 10px;
    cursor: pointer;
    box-shadow: 0 0 0 0 white, 0 0 0 0 white;
    transition: 1s linear;
  }
  .menu:hover {
    box-shadow: 0 0 0 8px white, 0 0 0 8px white;
  }
  .hamburguer {
    position: relative;
    display: block;
    background-color: black;
    width: 30px;
    height: 3px;
    top: 29px;
    left: 15px;
    transition: 0.5s ease-in-out;
  }

  .hamburguer:before,
  .hamburguer:after {
    background-color: black;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    transition: 0.5s ease-in-out;
  }

  .hamburguer:before {
    top: -10px;
  }

  .hamburguer:after {
    top: 10px;
  }

  .app-name {
    color: white;
    padding-top: 20px;
  }

  .hamburguer-input {
    display: none;
  }

  .menuChecked {
    box-shadow: 0 0 0 150vw white, 0 0 0 100vh white;
  }

  .menuChecked:hover {
    box-shadow: 0 0 0 150vw white, 0 0 0 100vh white;
  }

  .hamburguerChecked {
    transform: rotate(45deg);
  }

  .hamburguerChecked:before {
    transform: rotate(90deg);
    top: 0;
  }

  .hamburguerChecked:after {
    transform: rotate(90deg);
    top: 0;
  }

  .menu-btn {
    display: block;
    margin-bottom: 40px;
    font-size: 47px;
    text-decoration: none;
    background: none;
    border: none;
    cursor: pointer;
  }

  .side-menu-container {
    position: absolute;
    opacity: 1;
    top: 25em;
    left: 50%;
    transform: translate(-50%, -50%);
    list-style: none;
    transition: 0.25s 0.5s ease-in-out;
  }
`;

export default MenuTop;
