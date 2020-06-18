import React from 'react';

import './Backdrop.css'

const Backdrop = ({ handler }) => {
  return (<div className='backdropInfo' onClick={handler}></div>
  )
}

export default Backdrop
