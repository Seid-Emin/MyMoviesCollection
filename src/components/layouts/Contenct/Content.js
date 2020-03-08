import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index'

import './Content.css'

import Cards from '../Cards/Cards';
import FilteredMedia from '../FilteredMedia/FilteredMedia'
import Categories from '../Categories/Categories'
import Spinner from '../../UI/Spinner/Spinner'
import Modal from '../../UI/Modal/Modal'
import Backdrop from '../../UI/Backdrop/Backdrop'

class Content extends Component {
  render() {
    const { showInfo, loadingSearch } = this.props;
    const modal = showInfo ?
      <React.Fragment>
        <Backdrop clicked={this.props.hideSelected} show={showInfo} />
        <Modal />
      </React.Fragment>
      : null;

    return (
      <div className='content-grid'>
        <Categories />
        {loadingSearch ? <Spinner /> :
          <React.Fragment>
            <Cards />
            <FilteredMedia />
          </React.Fragment>}
        {modal}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    showInfo: state.selectedMedia.showInfo,
    loadingSearch: state.search.loading
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideSelected: () => dispatch(actions.hideSelected())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)
