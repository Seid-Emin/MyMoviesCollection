import React, { Component } from 'react'
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index'

import './Search.css'


class Search extends Component {
  handleSearch = (e) => {
    console.log(this.props);
    this.props.searchText(e.target.value);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.fetchSearch(this.props.search);
  }

  render() {
    return (
      <nav className='searchField'>
        <div className="nav-wrapper">
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input onChange={this.handleSearch} id="search" type="search" required />
              <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
              <i className="material-icons">close</i>
            </div>
          </form>
        </div>
      </nav>
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
    fetchSearch: (query) => dispatch(actions.fetchSearch(query))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)


