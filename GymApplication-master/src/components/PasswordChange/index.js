import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import '../../index.css';

// Here the user can change their password
// only accessible on the users account page

// resets state after a successful input
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

// password change page
class PasswordChangeForm extends Component {

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  // Firebase authentication API used to change password
  onSubmit = event => {
    const { passwordOne } = this.state;
    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    // validation
    const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

    // inputs for user to change password
    return (
      <form onSubmit={this.onSubmit}>
        <input name="passwordOne" value={passwordOne} onChange={this.onChange}
          type="password" placeholder="New Password" />
        <br />
        <input name="passwordTwo" value={passwordTwo} onChange={this.onChange}
          type="password" placeholder="Confirm New Password" />
        <br />
        <button disabled={isInvalid} type="submit">
          Reset My Password
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);