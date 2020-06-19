import React from 'react';

import './Footer.css';

import TMDB_Logo from '../../../assets/brand_theMovie/TMDB_Logo_gree.png';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container layout">
        <img className='footer-logo valign-wrapper' src={TMDB_Logo}></img>
      </div>
    </footer>
  )
}

export default Footer;
