import React from 'react';
import PropTypes from 'prop-types';

function MenuTop({ pageTitle }) {
  return (
    <div className="MenuTop">
      <header className="navbar navbar-dark fixed-top" style={ { background: '#D17A22' } }>
        <div className="container-fluid">
          <button
            id="menuTopToggle"
            data-testid="top-hamburguer"
            className="navbar-toggler collapsed"
            type="button"
            data-toggle="collapse"
            data-target="#navbarToggleExternalContent"
            aria-controls="navbarToggleExternalContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <h1 data-testid="top-title" style={ { color: 'white' } }>{ pageTitle }</h1>
        </div>
      </header>
    </div>
  );
}

export default MenuTop;

MenuTop.propTypes = {
  pageTitle: PropTypes.string,
};

MenuTop.defaultProps = {
  pageTitle: 'TryBeer',
};
