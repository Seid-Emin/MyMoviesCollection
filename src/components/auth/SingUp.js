import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/actions/authAction';

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

  render() {
    const { auth, authError } = this.props;
    if (auth.uid) return <Redirect to='/' />

    return (
      <div className='container'>
        <form className='white' onSubmit={this.handleSubmit}>
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
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>

      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    auth: state.firebase.auth,
    authError: state.auth.authError
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingUp);