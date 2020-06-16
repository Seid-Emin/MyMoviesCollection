import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Categories.css'

import * as actions from '../../../store/actions/index';

const categoriesConfig = {
  movie: {
    latest: 'latest',
    now_playing: 'now_playing',
    popular: 'popular',
    top_rated: 'top_rated',
    upcoming: 'upcoming'
  },
  tv: {
    latest: 'latest',
    airing_today: 'airing_today',
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
  }
}

const Categories = ({ fetchFilteredMedia }) => {

  return (
    <div className='Categories-wrapper'>
      <div className="inner">
        <div className='media-side-nav'>
          {Object.keys(categoriesConfig).map(categorie => {
            return (<div className='white-text lighten-5 main-categirie'>{categorie}
              <ul className='categories-wrap grey-text lighten-3'>
                {Object.keys(categoriesConfig[categorie]).map(option => {
                  let currentOption = categoriesConfig[categorie][option];
                  return (<li>
                    <NavLink
                      to={`/${categorie}/${currentOption}/page=1`}
                      activeClassName='activeNav'
                      onClick={() => fetchFilteredMedia(categorie, currentOption)}>{currentOption}
                    </NavLink>
                  </li>
                  )
                })}
              </ul>
            </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    fetchFilteredMedia: (mediaType, filterType) => dispatch(actions.fetchFilteredMedia(mediaType, filterType))
  }
}

export default connect(null, mapDispatchToProps)(Categories);