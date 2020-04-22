import React from 'react';
import '../../index.css';

import { AuthUserContext } from '../Session';
import { withAuthorization } from '../Session';
import {PasswordForgetLink} from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';

// Account page on our gym application
// Here the user can view their account and change their password

const AccountPage = () => (
  // authorised user
  <AuthUserContext.Consumer>
    {authUser => (
      <div id="outer"> 
        <div id="inner">
          <h1>Your Account</h1>
          <p>Email: {authUser.email}</p>
          <p>Need to change your password?</p>
          <PasswordChangeForm />
          <PasswordForgetLink />
        </div>
      </div>
    )}
  </AuthUserContext.Consumer>
);

// checks if user is not null
const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);