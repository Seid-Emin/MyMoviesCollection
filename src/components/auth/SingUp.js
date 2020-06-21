import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import './authStyles.css';
import * as actions from '../../store/actions';
import { checkValidity, updateObject } from '../helpers/utils';

import Input from '../UI/Input/Input'


class SingUp extends Component {
  state = {
    user: {
      firstName: {
        label: 'First Name',
        title: 'Latin Letters only',
        type: 'text',
        value: '',
        validation: {
          required: true,
          isName: true
        },
        valid: false,
        touched: false,
      },
      lastName: {
        label: 'Last Name',
        title: 'Latin Letters only',
        value: '',
        type: 'text',
        validation: {
          required: true,
          isName: true
        },
        valid: false,
        touched: false,
      },
      email: {
        label: 'Email',
        value: '',
        type: 'email',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
      },
      password: {
        label: 'Password',
        title: '[a-Z],mininum 9 symbols + special characters',
        value: '',
        type: 'password',
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
    } else {
      this.setState({ errorSubmit: true });
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
    const { uid, authError } = this.props;
    const { user, errorSubmit } = this.state;

    return nextProps.uid != uid || nextState.user != user || nextState.errorSubmit != errorSubmit
      || nextProps.authError != authError
  }

  componentWillUnmount() {
    const { clearError, authError } = this.props;
    // if there was an arror, cleared it from state on unmount
    if (authError) {
      clearError();
    }
  }

  render() {
    const { authError } = this.props;
    const { user, errorSubmit } = this.state;

    let invalidMessage = errorSubmit ? <p className='Invalid'>Please fill all the required fields with
    valid information</p>
      : authError ? <p>{authError.message}</p> : null

    let inputs = Object.keys(user).map((field, index) => {
      return <Input key={index} name={field} field={user[field]} handleChange={this.handleChange} />
    })

    return (
      <div className='container'>
        <form className='width' onSubmit={this.handleSubmit}>
          <h5 className='text-darken-3'>Sign up</h5>
          {inputs}
          <div className='input-field'>
            <button className='btn sign z-depth-0'>Sign up</button>
            <div className='red-text center'>
              {invalidMessage}
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

    // search state
    search: state.search,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    // authActions
    signUp: (newUser) => dispatch(actions.signUp(newUser)),
    clearError: () => dispatch(actions.clearError())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SingUp));