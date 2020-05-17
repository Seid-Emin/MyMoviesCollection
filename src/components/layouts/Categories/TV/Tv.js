import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import '../Categories.css'

const Tv = ({ fetchData, currentPage }) => {
  const mediaType = 'tv';
  return (
    <div className='media-side-nav'>
      <div className='white-text lighten-5 main-categirie'>Tv</div>
      <div className='categories-wrap grey-text lighten-3'>
        <p onClick={() => fetchData(mediaType, 'latest')}><NavLink to={`/tv/latest/page=${currentPage}`} activeClassName='activeNav'>Latest</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'airing_today')}><NavLink to={`/tv/airing_today/page=${currentPage}`} activeClassName='activeNav'>Airing Today</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'popular')}><NavLink to={`/tv/popular/page=${currentPage}`} activeClassName='activeNav'>Popular</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'top_rated')}><NavLink to={`/tv/top_rated/page=${currentPage}`} activeClassName='activeNav'>Top Rated</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'on_the_air')}><NavLink to={`/tv/on_the_air/page=${currentPage}`} activeClassName='activeNav'>On The Air</NavLink></p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentPage: state.search.currentPage,
  }
}

export default connect(mapStateToProps)(Tv);
