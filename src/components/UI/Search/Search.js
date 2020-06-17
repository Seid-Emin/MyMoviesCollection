import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import * as actions from '../../../store/actions/index';

import './Search.css';


class Search extends Component {
  _handleSearch = (e) => {
    if (e.key === 'Enter') {
      let search = this.props.search
      this.props.searchText(e.target.value);
      this.props.fetchMultiSearch(search);
      this.props.history.push(`/search=${search}`)
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let search = this.props.search
    this.props.fetchMultiSearch(search);
    this.props.history.push(`/search=${search}`)
  }

  render() {
    return (
      <nav className='searchField'>
        <div className="">
          <form onSubmit={this.handleSubmit}>
            <div className="input-field">
              <input onKeyDown={this._handleSearch} id="search" type="search" required />
              <label className="label-icon" htmlFor="search"> <Link to={'/search=' + this.props.search} ><i className="material-icons">search</i></Link></label>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));


