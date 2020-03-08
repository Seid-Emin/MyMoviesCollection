import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index'

import './Search.css'


class Search extends Component {
  _handleSearch = (e) => {
    if (e.key === 'Enter') {
      this.props.searchText(e.target.value);
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchMultiSearch(this.props.search);
  }

  render() {
    return (
      <nav className='searchField'>
        <div className="nav-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input onKeyDown={this._handleSearch} id="search" type="search" required />
              <label className="label-icon" htmlFor="search"> <Link to={'/search=' + this.props.search} ><i className="material-icons">search</i></Link></label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav >
    )
  }
}

const mapStateToProps = state => {
  return {
    search: state.search.searchText
  }
}

const mapDispatchToProps = dispatch => {
  return {
    searchText: (search) => dispatch(actions.search(search)),
    fetchMultiSearch: (query) => dispatch(actions.fetchMultiSearch(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)


