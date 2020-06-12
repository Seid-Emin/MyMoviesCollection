import React from 'react';

import './Backdrop.css'

const Backdrop = ({ show, handleHideModal }) => {
  return (
    show ? <div className='backdropInfo' onClick={handleHideModal}></div> : null
  )
}

export default Backdrop
