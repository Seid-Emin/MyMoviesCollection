import React from 'react'

import '../Categories.css'

const Movies = ({ fetchData }) => {
  const mediaType = 'movie';
  return (
    <div className='media-side-nav'>
      <div className='white-text lighten-5 main-categirie'>Movies</div>
      <div className='categories-wrap grey-text lighten-3'>
        <p onClick={() => fetchData(mediaType, 'latest')} >Latest</p>
        <p onClick={() => fetchData(mediaType, 'now_playing')}>Now Playing</p>
        <p onClick={() => fetchData(mediaType, 'popular')}>Popular</p>
        <p onClick={() => fetchData(mediaType, 'top_rated')}>Top Rated</p>
        <p onClick={() => fetchData(mediaType, 'upcoming')}>Upcoming</p>
      </div>
    </div>
  )
}

export default Movies
