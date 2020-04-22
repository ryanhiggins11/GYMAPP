import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';

import '../../index.css';
import * as ROUTES from '../../constants/routes';

// Here the user can reset their password by providing their email

// password forget page
const PasswordForgetPage = () => (
  <div id="outer">
    <div id="inner">
      <h1>Forgot Password?</h1>
      <h3>Enter email here to change your password:</h3>
      <PasswordForgetForm />
    </div>
    
  </div>
);

// resets state after a successful input
const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetFormBase extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  // Firebase authentication API used to reset password
  onSubmit = event => {
    const { email } = this.state;
    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  // update the values input by user in the local state
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, error } = this.state;

    // validation
    const isInvalid = email === '';

    // inputs for user to reset password
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <br />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

// redirects to password forget page
const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };