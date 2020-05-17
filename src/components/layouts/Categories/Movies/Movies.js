import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import '../Categories.css'

const Movies = ({ fetchData, currentPage }) => {

  const mediaType = 'movie';

  return (
    <div className='media-side-nav'>
      <div className='white-text lighten-5 main-categirie'>Movies</div>
      <div className='categories-wrap grey-text lighten-3'>
        <p onClick={() => fetchData(mediaType, 'latest')} ><NavLink to={`/movie/latest/page=${currentPage}`} activeClassName='activeNav'>Latest</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'now_playing')}><NavLink to={`/movie/now_playing/page=${currentPage}`} activeClassName='activeNav'>Now Playing</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'popular')}><NavLink to={`/movie/popular/page=${currentPage}`} activeClassName='activeNav'>Popular</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'top_rated')}><NavLink to={`/movie/top_rated/page=${currentPage}`} activeClassName='activeNav'>Top Rated</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'upcoming')}><NavLink to={`/movie/upcoming/page=${currentPage}`} activeClassName='activeNav'>Upcoming</NavLink></p>
      </div>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentPage: state.search.currentPage,
  }
}

export default connect(mapStateToProps)(Movies);
