import React from 'react'

import './Video.css'

const Video = ({ video }) => {
  return (
    <a className='videoLink' href={'https://www.youtube.com/watch?v=' + video.key} title='Watch video' target='_blank' rel="noopener noreferrer"><span className='material-icons'>play_arrow</span> {video.size}p</a>
  )
}

export default Video
