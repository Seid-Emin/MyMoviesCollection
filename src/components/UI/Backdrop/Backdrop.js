import React from 'react';
import { CSSTransition } from 'react-transition-group';

import './Backdrop.css';


const Backdrop = ({ handler, showInfo }) => {
  return (
    <CSSTransition
      in={showInfo}
      appear={showInfo}
      key='backdrop'
      timeout={0} >
      <div className='backdropInfo' onClick={handler}></div>
    </CSSTransition>
  )
}

export default Backdrop;
