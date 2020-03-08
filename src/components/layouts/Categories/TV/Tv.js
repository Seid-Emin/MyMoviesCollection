import React from 'react'
import { NavLink } from 'react-router-dom'

import '../Categories.css'

const Movies = ({ fetchData }) => {
  const mediaType = 'tv';
  return (
    <div className='media-side-nav'>
      <div className='white-text lighten-5 main-categirie'>Tv</div>
      <div className='categories-wrap grey-text lighten-3'>
        <p onClick={() => fetchData(mediaType, 'latest')}><NavLink to='/tv/latest' activeClassName='activeNav'>Latest</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'airing_today')}><NavLink to='/tv/airing-today' activeClassName='activeNav'>Airing Today</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'popular')}><NavLink to='/tv/popular' activeClassName='activeNav'>Popular</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'top_rated')}><NavLink to='/tv/top-rated' activeClassName='activeNav'>Top Rated</NavLink></p>
        <p onClick={() => fetchData(mediaType, 'on_the_air')}><NavLink to='/tv/on-the-air' activeClassName='activeNav'>On The Air</NavLink></p>
      </div>
    </div>
  )
}

export default Movies
