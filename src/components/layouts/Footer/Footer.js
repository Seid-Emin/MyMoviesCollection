import React from 'react'

import './Footer.css'
import TMDB_Logo from '../../../assets/brand_theMovie/TMDB_Logo_gree.png'

const Footer = () => {
  return (
    <footer className="page-footer">
      <div className="container">
        <img className='footer-logo valign-wrapper' src={TMDB_Logo}></img>
      </div>
    </footer>
  )
}

export default Footer
