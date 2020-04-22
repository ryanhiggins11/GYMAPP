import React from 'react';
import { Link } from 'react-router-dom';
//import 'semantic-ui-css/semantic.min.css';
import { Button } from 'semantic-ui-react';
import RaisedButton from 'material-ui/FlatButton';
import Tabs from 'react-bootstrap';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import '../../index.css';
import { auth } from 'firebase';

// Navigation of our gym application is set up here

const Navigation = () => (
  <AuthUserContext.Consumer>
    {/* If user authorized show NavigationAuth, else show NavigationNonAuth */}
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

// what user views if they are signed in
const NavigationAuth = ({ authUser }) => ( 
  <div>
    <Link to={ROUTES.HOME}>
      <RaisedButton label="Home" primary={true} />
    </Link> 
    <Link to={ROUTES.ACCOUNT}>
      <RaisedButton label="Account"  />
    </Link> 
    {!!authUser.roles[ROLES.ADMIN] && (
      <Link to={ROUTES.ADMIN}>
        <RaisedButton label="Admin" />
      </Link>
    )}
    <Link to={ROUTES.CLASSES}>
      <RaisedButton label="Classes" />
    </Link>
    <Link to={ROUTES.PERSONAL_TRAINER}>
      <RaisedButton label="Book a Personal Trainer" />
    </Link>
    <Link to={ROUTES.STORE}>
      <RaisedButton label="Store" />
    </Link>
    <SignOutButton />
  </div>
);
  
// what user views if they are not signed in
const NavigationNonAuth = () => (
  <div>
    <Link to={ROUTES.HOME}>
      <RaisedButton label="Home" id="tab" />
    </Link> 
    <Link to={ROUTES.SIGN_IN}>
      <RaisedButton label="Sign In"  />
    </Link> 
    <Link to={ROUTES.SIGN_UP}>
      <RaisedButton label="Sign Up" id="tab" />
    </Link> 
  </div>
);

export default Navigation;