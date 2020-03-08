import React from 'react'

import '../Categories.css'

const Movies = ({ fetchData }) => {
  const mediaType = 'tv';
  return (
    <div className='media-side-nav'>
      <div className='white-text lighten-5 main-categirie'>Tv</div>
      <div className='categories-wrap grey-text lighten-3'>
        <p onClick={() => fetchData(mediaType, 'latest')}>Latest</p>
        <p onClick={() => fetchData(mediaType, 'airing_today')}>Airing Today</p>
        <p onClick={() => fetchData(mediaType, 'popular')}>Popular</p>
        <p onClick={() => fetchData(mediaType, 'top_rated')}>Top Rated</p>
        <p onClick={() => fetchData(mediaType, 'on_the_air')}>On The Air</p>
      </div>
    </div>
  )
}

export default Movies
