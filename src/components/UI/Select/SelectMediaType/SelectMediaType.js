import React from 'react';
import { connect } from 'react-redux';

import './SelectMediaType.css';

// Components
import Select from '../Select';

const SelectMediaType = ({ collections: { collections, type }, handler }) => {
  return <Select
    selectName='mediaType'
    selectClass='list-type-select'
    payload={collections}
    value={type}
    handler={handler} />
}

const mapStateToProps = state => {
  return {
    collections: state.collections
  }
}

export default connect(mapStateToProps)(SelectMediaType);