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

    if (prevProps.uid != uid) {
      // Redirect to Collections
      history.push(`/collections/all_media`);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { uid, authError } = this.props;
    return nextProps.uid != uid || nextProps.authError != authError
  }

  componentWillUnmount() {
    const { uid, getCollectionFromFirestore, clearError } = this.props;
    if (uid) {
      getCollectionFromFirestore();
    }
    clearError();
  }

  render() {
    const { authError } = this.props;

    return (
      <div className='container'>
        <form className='width' onSubmit={this.handleSubmit} >
          <h5 className='text-darken-3'>Login</h5>

          <div className='input-field'>
            <label className='active' htmlFor='email'>Email</label>
            <input type='email' name='email' onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <label className='active' htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <button className='btn sign z-depth-0'>Login</button>
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
    authError: state.auth.authError,
    uid: state.firebase.auth.uid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: (credentials) => dispatch(actions.signIn(credentials)),
    getCollectionFromFirestore: () => dispatch(actions.getCollectionFromFirestore()),
    clearError: () => dispatch(actions.clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SignIn));