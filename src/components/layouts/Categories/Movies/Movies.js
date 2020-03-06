import React from 'react'

import './Movies.css'

const Movies = () => {
  return (
    <React.Fragment>
      <div className='white-text lighten-5 main-categirie'>Movies</div>
      <div className='categories-wrap grey-text lighten-3'>
        <p>Latest</p>
        <p>Now Playing</p>
        <p>Popular</p>
        <p>Top Rated</p>
        <p>Upcomming</p>
      </div>
    </React.Fragment>
  )
}

export default Movies
