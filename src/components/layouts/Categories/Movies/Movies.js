import React from 'react'
import { NavLink } from 'react-router-dom'

import '../Categories.css'

const Movies = ({ fetchData }) => {
  const mediaType = 'movie';
  return (
    <div className='media-side-nav'>
      <div className='white-text lighten-5 main-categirie'>Movies</div>
      <div className='categories-wrap grey-text lighten-3'>
        <p onClick={() => fetchData(mediaType, 'latest')} ><NavLink to='/movies/latest' activeClassName='activeNav'>Latest</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'now_playing')}><NavLink to='/movies/now_playing' activeClassName='activeNav'>Now Playing</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'popular')}><NavLink to='/movies/popular' activeClassName='activeNav'>Popular</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'top_rated')}><NavLink to='/movies/top_rated' activeClassName='activeNav'>Top Rated</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'upcoming')}><NavLink to='/movies/upcoming' activeClassName='activeNav'>Upcoming</NavLink></p>
      </div>
    </div>
  )
}

export default Movies
