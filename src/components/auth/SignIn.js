import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';


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

  componentWillUnmount() {
    this.props.getCollectionFromFirestore();
  }

  render() {
    const { authError, auth } = this.props;
    if (auth.uid) return <Redirect to='/movie/now_playing/page=1' />

    return (
      <div className='container'>
        <form className='white width' onSubmit={this.handleSubmit}>
          <h5 className='grey-text text-darken-3'>Login</h5>
          <div className='input-field'>
            <label className='active' htmlFor='email'>Email</label>
            <input type='email' name='email' onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <label className='active' htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <button className='btn pink lighten-1 z-depth-0'>Login</button>
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
    auth: state.firebase.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signIn: (credentials) => dispatch(actions.signIn(credentials)),
    getCollectionFromFirestore: () => dispatch(actions.getCollectionFromFirestore())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);