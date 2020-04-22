import React from 'react';
import { withFirebase } from '../Firebase';
import '../../index.css';
import { FlatButton } from 'material-ui';

// Here the sign out button is implemented
// to allow the user to sign out of our gym application

const SignOutButton = ({ firebase }) => (
  // Firebase authentication API used to sign user out
  <FlatButton label="Sign Out" onClick={firebase.doSignOut} 
      style={{ float: 'right' }} />
);

export default withFirebase(SignOutButton);