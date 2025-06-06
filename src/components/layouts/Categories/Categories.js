import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import './Categories.css';

// Redux actions
import * as actions from '../../../store/actions';

const categoriesConfig = {
    movie: {
        latest: 'latest',
        now_playing: 'now_playing',
        popular: 'popular',
        top_rated: 'top_rated',
        upcoming: 'upcoming',
    },
    tv: {
        latest: 'latest',
        airing_today: 'airing_today',
        popular: 'popular',
        top_rated: 'top_rated',
        on_the_air: 'on_the_air',
    },
};

const Categories = ({
                        fetchFilteredMedia,
                        clearSearchingState,
                        toggleSideMenu,
                        currentlyViewing,
                        removeSelectedId,
                        search: { viewing },
                        selectedMedia: { selectedId },
                    }) => {

    const fetchCategorie = (categorie, currentOption) => {
        // Clear searching state
        clearSearchingState();
        // Get categorie
        fetchFilteredMedia(categorie, currentOption);

        if (!viewing) {
            currentlyViewing();
        }

        if (selectedId) {
            removeSelectedId();
        }

    };

    return (
        <aside className="categories-wrapper">
            <div className="inner">
                <div className="media-side-nav">
                    {Object.keys(categoriesConfig).map((categorie, index) => {
                        return (<div key={index} className="white-text lighten-5 main-categirie">{categorie}
                                <ul className="categories-wrap grey-text lighten-3">
                                    {Object.keys(categoriesConfig[categorie]).map((option, index) => {
                                        let currentOption = categoriesConfig[categorie][option];
                                        return (
                                            <li key={index} onClick={toggleSideMenu}>
                                                <NavLink
                                                    to={`/${categorie}/${currentOption}/page=1`}
                                                    activeClassName="activeNav"
                                                    onClick={() => fetchCategorie(categorie, currentOption)}>{currentOption.replace(/_/g, ' ')}
                                                </NavLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </aside>
    );
};
const mapStateToProps = state => {
    return {
        // Search / Fetch state
        search: state.search,

        // selectedMedia state
        selectedMedia: state.selectedMedia,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //searchAction
        clearSearchingState: () => dispatch(actions.clearSearchingState()),
        fetchFilteredMedia: (mediaType, filterType) => dispatch(actions.fetchFilteredMedia(mediaType, filterType)),
        currentlyViewing: () => dispatch(actions.currentlyViewing()),
        removeSelectedId: () => dispatch(actions.removeSelectedId()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Categories));