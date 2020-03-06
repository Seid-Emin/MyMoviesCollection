import React from 'react'

import './Content.css'

import Cards from '../Cards/Cards';
import Categories from '../Categories/Categories'

const Content = () => {
  return (
    <div className='row'>
      <div className='col s3 m3 l2 sticky'>
        <Categories />
      </div>
      <div className='col s9 m9 l10'>
        <Cards />
      </div>
    </div>
  )
}

export default Content
