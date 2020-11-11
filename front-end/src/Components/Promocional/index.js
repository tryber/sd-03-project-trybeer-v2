import React from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import Instagram from '../../images/instagram.png';
import Facebook from '../../images/facebook.png';
import Whatsapp from '../../images/whatsapp.png';

const Promocional = ({ name }) => (
  <section className="promo-container">
    <div className="credits-container">
      <span>Seu TryBeer créditos</span>
      <h1>R$ 120,00 </h1>
    </div>
    <h3>Como funciona?</h3>
    <p>
      R$ 10,00 em
      {' '}
      <span>TryBeerCréditos</span>
      {' '}
      equivalem a R$ 10,00 reais para gastar exclusivamente no
      nosso site. Ganhe créditos compartilhando seu código de indicação.
    </p>
    <label htmlFor="code">
      Código
      <input id="code" type="text" value={ `${name}2020` } />
    </label>
    <div className="social-icon">
      <img src={ Facebook } alt="Icone do Facebook" />
      <img src={ Whatsapp } alt="Icone do Whatsapp" />
      <img src={ Instagram } alt="Icone do Instagram" />
    </div>
  </section>
);

Promocional.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Promocional;
