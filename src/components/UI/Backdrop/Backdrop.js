import React, { Component } from 'react';
import { CSSTransition } from 'react-transition-group';

import './Backdrop.css';


class Backdrop extends Component {

  componentDidMount() {
    // Prevent background from scrolling when modal is open
    document.body.style.overflow = 'hidden';
  }
  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }
  render() {
    const { handler, showInfo } = this.props;
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
}

export default Backdrop;
