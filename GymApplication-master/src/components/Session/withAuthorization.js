import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

// Here components of our gym application can be protected with authorization

const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    // uses a firebase listener to detect when the authenticated user changes
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          // if authorization fails go to sign in page
          if (!condition(authUser)) {
            this.props.history.push(ROUTES.SIGN_IN);
          }
        },
        () => this.props.history.push(ROUTES.SIGN_IN),
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        // avoids showing the user protected pages before redirect happens
        <AuthUserContext.Consumer>
          {authUser =>
            condition(authUser) ? <Component {...this.props} /> : null
          }
        </AuthUserContext.Consumer>
      );
    }
  }

  // organizes components
  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};

export default withAuthorization;