import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import './Search.css';

import * as actions from '../../../store/actions/index';


const Search = ({ search: { searchText, searching }, searchQuery, fetchMultiSearch, clearSearchingState, history }) => {
  const _handleSearch = (e) => {
    const { value } = e.target;

    // Clear searching state if user is typing new search params
    if (searching) {
      clearSearchingState();
    }

    searchQuery(value);
    if (e.key === 'Enter' && searchText) {
      fetchMultiSearch(searchText);
      history.push(`/search=${searchText}`)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchText) {
      fetchMultiSearch(searchText);
      history.push(`/search=${searchText}`)
    }
  }

  return (
    <nav className='searchField'>
      <div className="searchField-inner">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="input-field">
            <input onChange={(e) => _handleSearch(e)} id="search" type="search" required autoComplete='on' />
            <label className="label-icon" htmlFor="search"> <Link to={'/search=' + searchText} ><i className="material-icons" onClick={(e) => handleSubmit(e)}>search</i></Link></label>
          </div>
        </form>
      </div>
    </nav >
  )
}

const mapStateToProps = state => {
  return {
    // search state
    search: state.search
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // searchAction
    searchQuery: (search) => dispatch(actions.search(search)),
    fetchMultiSearch: (query) => dispatch(actions.fetchMultiSearch(query)),
    clearSearchingState: () => dispatch(actions.clearSearchingState()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Search));


