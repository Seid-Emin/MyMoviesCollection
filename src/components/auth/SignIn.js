import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import './authStyles.css';
import * as actions from '../../store/actions';


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
    const { uid, getCollectionFromFirestore, clearError, authError } = this.props;

    // if login success - get collections ( if any)
    if (uid) {
      getCollectionFromFirestore();
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
    uid: state.firebase.auth.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // authActions
    signIn: (credentials) => dispatch(actions.signIn(credentials)),
    clearError: () => dispatch(actions.clearError()),

    // collectionActions
    getCollectionFromFirestore: () => dispatch(actions.getCollectionFromFirestore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));