import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import {compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { PasswordForgetLink } from '../PasswordForget';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes'; 
import '../../index.css';

// Here the user can sign into our gym application

// sign in page
const SignInPage = () => (
  <div id="outer">
    <div id="inner">
      <h1>Sign In</h1>
      <SignInForm />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  </div>
);

// initialize the state of the component (email, password, error)
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
}

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    // resets state after a successful sign in
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    // Firebase authentication API used to sign user in
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME); // redirects user to home page
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  }

  // update the values input by user in the local state
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value});
  }

  render() {
    const { email, password, error } = this.state;

    // validation to confirm user entered a string for both password and email
    const isInvalid = password === '' || email === '';

    // details input by user
    return (
      <form onSubmit={this.onSubmit}>
        <input name="email" value={email}
            onChange={this.onChange} type="text"
            placeholder="Email Address" id="text"/>
        <br />
        <input name="password" value={password}
            onChange={this.onChange} type="password"
            placeholder="password" id="text"/>
        <br />
        <br />
        <button disabled={isInvalid} type="submit" id="button">
          Sign In
        </button>
        
        {error && <p>{error.message}</p>}
      </form>
    )
  }
} // SignInForm

// redirects user to sign in page
const SignInLink = () => (
  <p>
    Have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
  </p>
);

// organizes components
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);

export default SignInPage;

export {SignInForm, SignInLink};