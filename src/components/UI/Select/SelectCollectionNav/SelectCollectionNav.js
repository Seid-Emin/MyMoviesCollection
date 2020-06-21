import React from 'react';
import { connect } from 'react-redux';

import './SelectCollectionNav.css';

// Components
import Select from '../Select';


const SelectCollectionNav = ({ collections: { collections, status }, handler, navStatus }) => {
  return <Select
    selectName='navStatus'
    selectClass='collection-nav-select'
    payload={collections}
    value={status}
    navStatus={navStatus}
    handler={handler} />
}

const mapStateToProps = state => {
  return {
    // collections state
    collections: state.collections
  }
}

export default connect(mapStateToProps)(SelectCollectionNav);