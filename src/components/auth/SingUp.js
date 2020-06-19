import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import './authStyles.css';
import * as actions from '../../store/actions';
import { checkValidity, updateObject } from '../helpers/utils';


class SingUp extends Component {
  state = {
    user: {
      firstName: {
        value: '',
        validation: {
          required: true,
          isName: true
        },
        valid: false,
        touched: false,
      },
      lastName: {
        value: '',
        validation: {
          required: true,
          isName: true
        },
        valid: false,
        touched: false,
      },
      email: {
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
      },
      password: {
        value: '',
        validation: {
          required: true,
          isPassword: true
        },
        valid: false,
        touched: false,
      }
    },
    formIsValid: false,
    errorSubmit: false
  }

  handleChange = (e) => {
    const { user, errorSubmit } = this.state;
    const { name, value } = e.target;

    const updatedField = updateObject(user[name], {
      value: value,
      valid: checkValidity(value, user[name].validation),
      touched: true
    });

    const updatedUser = { ...user }
    updatedUser[name] = updatedField;

    this.setState({ user: updatedUser });

    if (errorSubmit) {
      this.setState({ errorSubmit: false });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { user } = this.state;
    const { signUp } = this.props;
    let formIsValid = true;

    for (var key in user) {
      formIsValid = user[key].valid && formIsValid;
    }

    if (formIsValid) {
      let newUser = {
        firstName: user.firstName.value,
        lastName: user.lastName.value,
        email: user.email.value,
        password: user.password.value,
      }
      signUp(newUser);
    }

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
    const { user, errorSubmit } = this.state;
    console.log(nextProps.uid);

    return nextProps.uid != uid || nextState.user != user || nextState.errorSubmit != errorSubmit
  }

  componentWillUnmount() {
    const { clearError } = this.props;

    clearError();
  }

  render() {
    const { authError } = this.props;
    const { user: { firstName, lastName, email, password }, errorSubmit } = this.state;

    let invalidMessage = !errorSubmit ? null : <p className='Invalid'>Please fill all the required fields with
    valid information</p>

    return (
      <div className='container'>
        <form className='width' onSubmit={this.handleSubmit}>
          <h5 className='text-darken-3'>Sign up</h5>
          <div className='input-field'>
            <label className='active' htmlFor='fName' title='Only Latin Letters'>First Name *</label>
            <input
              className={(!firstName.valid && !firstName.touched) || firstName.valid ? 'Valid' : 'Invalid'}
              type='text'
              name='firstName'
              onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <label className='active' htmlFor='lastName' title='Only Latin Letters'>Last Name *</label>
            <input
              className={(!lastName.valid && !lastName.touched) || lastName.valid ? 'Valid' : 'Invalid'}
              type='text'
              name='lastName'
              onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <label className='active' htmlFor='email'>Email *</label>
            <input
              className={(!email.valid && !email.touched) || email.valid ? 'Valid' : 'Invalid'}
              type='email'
              name='email'
              onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <label className='active' htmlFor='password' title='[a-Z],mininum 9 symbols + special characters'>Password *</label>
            <input
              className={(!password.valid && !password.touched) || password.valid ? 'Valid' : 'Invalid'}
              type='password'
              name='password'
              onChange={this.handleChange} />
          </div>
          <div className='input-field'>
            <button className='btn blue darken-4 z-depth-0'>Sign up</button>
            <div className='red-text center'>
              {invalidMessage}
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
    signUp: (newUser) => dispatch(actions.signUp(newUser)),
    clearError: () => dispatch(actions.clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SingUp));