import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../../store/actions';

// Combined links
const Links = ({ uid, initials, toggleSideMenu, signOut, search }) => {
    return (
        uid
            ? (
                <SignedInLinks
                    toggleSideMenu={toggleSideMenu}
                    initials={initials}
                    signOut={signOut}
                    search={search}/>
            )
            : <SignedOutLinks toggleSideMenu={toggleSideMenu}/>
    );
};


// Inner Component SignOutLinks
const SignedOutLinks = ({ toggleSideMenu }) => {
    return (
        <React.Fragment>
            <li className="signup" onClick={toggleSideMenu}><NavLink to="/signup"
                                                                     activeClassName="activeNavLinks">Signup</NavLink>
            </li>
            <li className="signin" onClick={toggleSideMenu}><NavLink to="/signin"
                                                                     activeClassName="activeNavLinks">Signin</NavLink>
            </li>
        </React.Fragment>
    );
};


// Inner Component SignedInLinks
const SignedInLinks = ({
                           initials, signOut, toggleSideMenu,
                           search: { searchText, mediaType, filterType, currentPage, searching },
                       }) => {

    const signOutCleanState = () => {
        signOut();
        window.location.reload();
    };

    let pathToDisplay = searching ? `/search=${searchText}` : `/${mediaType}/${filterType}/page=${currentPage}`;

    return (
        <React.Fragment>
            <li className={'logout'}
                onClick={() => {
                    toggleSideMenu();
                    signOutCleanState();
                }}>
                <NavLink to={pathToDisplay}>
                    Log Out
                </NavLink>
            </li>
            <li className={'initials'} onClick={toggleSideMenu}>
                <NavLink to={pathToDisplay}
                         className={'btn btn-floating pink lighten-1'}>
                    {initials}
                </NavLink>
            </li>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        // auth state
        uid: state.firebase.auth.uid,

        // firebase state
        initials: state.firebase.profile.initials,

        // search state
        search: state.search,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        signOut: () => dispatch(actions.signOut()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Links);