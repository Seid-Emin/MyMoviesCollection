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

const Categories = ({ fetchFilteredMedia, clearSearchingState, toggleSideMenu }) => {

  const fetchCategorie = (categorie, currentOption) => {

    // Clear searching state
    clearSearchingState();

    // Get categorie
    fetchFilteredMedia(categorie, currentOption);

  }

  return (
    <div className='categories-wrapper'>
      <div className="inner">
        <div className='media-side-nav'>
          {Object.keys(categoriesConfig).map((categorie, index) => {
            return (<div key={index} className='white-text lighten-5 main-categirie'>{categorie}
              <ul className='categories-wrap grey-text lighten-3'>
                {Object.keys(categoriesConfig[categorie]).map((option, index) => {
                  let currentOption = categoriesConfig[categorie][option];
                  return (
                    <li key={index} onClick={toggleSideMenu}>
                      <NavLink
                        to={`/${categorie}/${currentOption}/page=1`}
                        activeClassName='activeNav'
                        onClick={() => fetchCategorie(categorie, currentOption)}>{currentOption.replace(/_/g, ' ')}
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
    fetchFilteredMedia: (mediaType, filterType) => dispatch(actions.fetchFilteredMedia(mediaType, filterType)),
    clearSearchingState: () => dispatch(actions.clearSearchingState())
  }
}

export default connect(null, mapDispatchToProps)(Categories);