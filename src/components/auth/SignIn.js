import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import './authStyles.css';
import * as actions from '../../store/actions';
import { singleMedia } from '../helpers/silgleMedia';


class SignIn extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }

  componentDidUpdate(prevProps, prevState) {
    const { uid, history } = this.props;

    if (prevProps.uid !== uid) {
      // Redirect to Collections
      history.push(`/collections/all_media`);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { uid, authError } = this.props;
    return nextProps.uid !== uid || nextProps.authError !== authError
  }

  componentWillUnmount() {
    const { uid, getCollectionFromFirestore, clearError, authError, fetchSelected, selectedMediaType, showModal, history,
      selectedMedia: { selected, selectedId },
      search: { mediaType, filterType, currentPage, viewing },
      collections: { status } } = this.props;

    // if login success - get collections ( if any)
    if (uid) {
      getCollectionFromFirestore();
      if (selected) {

        singleMedia(mediaType, selectedId, fetchSelected, selectedMediaType, showModal);
        if (viewing) {
          history.push(`/${mediaType}/${filterType}/page=${currentPage}/id=${selectedId}`);
        } else {
          history.push(`/collections/${status}/${mediaType}/id=${selectedId}`);
        }
      } else if (!viewing) {
        history.push(`/collections/${status}`);

      } else {
        history.push(`/${mediaType}/${filterType}/page=${currentPage}`);
      }
    }



    // if there was an arror, cleared it from state on unmount
    if (authError) {
      clearError();
    }
  }

  render() {
    const { authError } = this.props;

    return (
      <div className='container'>
        <form className='width' onSubmit={this.handleSubmit} >
          <h5 className='text-darken-3'>Signin</h5>
          <div className='input-field'>
            <label className='active' htmlFor='email'>Email</label>
            <input type='email' name='email' onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <label className='active' htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <button className='btn sign z-depth-0'>Signin</button>
            <div className='red-text center'>
              {authError ? <p>{authError.message}</p> : null}
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // auth state
    authError: state.auth.authError,

    // firebase state
    uid: state.firebase.auth.uid,

    // Search / Fetch state
    search: state.search,

    // SingleMedia state
    selectedMedia: state.selectedMedia,

    // Collections state
    collections: state.collections
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // authActions
    signIn: (credentials) => dispatch(actions.signIn(credentials)),
    clearError: () => dispatch(actions.clearError()),

    // fetchFilteredMediaAction
    currentlyViewing: () => dispatch(actions.currentlyViewing()),

    // collectionActions
    getCollectionFromFirestore: () => dispatch(actions.getCollectionFromFirestore()),

    // selectedAction
    fetchSelected: (id, mediaType) => dispatch(actions.fetchSelected(id, mediaType)),
    selectedMediaType: (type) => dispatch(actions.selectedMediaType(type)),
    showModal: () => dispatch(actions.showModal()),
    setSelected: () => dispatch(actions.setSelected()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));