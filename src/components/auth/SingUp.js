import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import './authStyles.css';
import * as actions from '../../store/actions';


class SingUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(this.state)
  }

  componentDidUpdate(prevProps, prevState) {
    const { uid, history,
      search: { currentPage, mediaType, filterType } } = this.props;

    if (prevProps.uid != uid) {
      // Redirect to Main Content
      history.push(`/${mediaType}/${filterType}/page=${currentPage}`);

    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { uid } = this.props;
    console.log(nextProps.uid);

    return nextProps.uid != uid
  }

  render() {
    const { authError } = this.props;

    return (
      <div className='container'>
        <form className='white width' onSubmit={this.handleSubmit}>
          <h5 className='grey-text text-darken-3'>Sign up</h5>
          <div className='input-field'>
            <label className='active' htmlFor='fName'>First Name</label>
            <input type='text' name='firstName' onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <label className='active' htmlFor='lastName'>Last Name</label>
            <input type='text' name='lastName' onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <label className='active' htmlFor='email'>Email</label>
            <input type='email' name='email' onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <label className='active' htmlFor='password'>Password</label>
            <input type='password' name='password' onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <button className='btn pink lighten-1 z-depth-0'>Sign up</button>
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
    uid: state.firebase.auth.uid,
    authError: state.auth.authError,
    search: state.search,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (newUser) => dispatch(actions.signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SingUp));