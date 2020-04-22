import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignInLink } from '../SignIn';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import '../../index.css';

// Here the user can sign up to our gym application

// sign up page
const SignUpPage = () => (
  <div id="outer">
    <div id="inner">
      <h1>Sign Up</h1>
      <SignUpForm />
      <SignInLink />
    </div>
  </div>
);

// initialize the state of the component (username, email, passwords, error)
const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    // resets state after a successful sign up
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { username, email, passwordOne, isAdmin } = this.state;

    const roles = [];

    if(isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    // Firebase authentication API used to sign user up
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
            roles,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME); // redirects user to home page
      })
      .catch(error => {
        this.setState({ error });
      })
    
    event.preventDefault();
  }

  // update the values input by user in the local state
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // onChangeCheckbox = event => {
  //   this.setState({ [event.target.name]: event.target.checked});
  // }

  render() {
    const {
      username, email, 
      passwordOne, passwordTwo, 
      //isAdmin, 
      error,
    } = this.state;

    // checks if both passwords are the same
    // or if the user has entered a string
    // for password, email, username
    const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' || 
      username === '';

    // inputs for user to create an account
    return (
      <form onSubmit={this.onSubmit}>
        <input name="username" value={username} onChange={this.onChange}
          type="text" placeholder="Full Name" id="text" />
        <br />
        <input name="email" value={email} onChange={this.onChange}
          type="text" placeholder="Email Address" id="text" />
        <br />
        <input name="passwordOne" value={passwordOne} onChange={this.onChange}
          type="password" placeholder="Password" id="text" />
        <br />
        <input name="passwordTwo" value={passwordTwo} onChange={this.onChange}
          type="password" placeholder="Confirm Password" id="text" />
        <br />
        {/* <label>
          Admin: 
          <input name="isAdmin" type="checkbox" checked={isAdmin}
            onChange={this.onChangeCheckbox} />
        </label> */}
        <br />
        <button disabled={isInvalid} type="submit" id="button">Sign Up</button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
} // SignUpForm

// redirects user to sign up page
const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </p>
);

// organizes components
const SignUpForm = compose(
  withRouter,
  withFirebase, 
)(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };