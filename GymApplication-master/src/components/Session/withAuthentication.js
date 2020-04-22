import React from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

// Used to keep track of the authenticated user

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        authUser: JSON.parse(localStorage.getItem('authUser')),
      };
    }

    componentDidMount() {
      // firebase listener to get the authenticated user
      this.listener = this.props.firebase.onAuthUserListener(
        // called when a user is signed in or out
        authUser => {
          localStorage.setItem('authUser', JSON.stringify(authUser));
          this.setState({ authUser });
        }, // signed in
        () => {
          localStorage.removeItem('authUser');
          this.setState({ authUser: null }); // signed out
        },
      );
    }

    // removes listener when component is being removed
    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        // uses the React context provider to provide the user
        <AuthUserContext.Provider value={this.state.authUser}>
          <Component {...this.props} />
        </AuthUserContext.Provider>
      );
    }
  }

  return withFirebase(WithAuthentication);
};

export default withAuthentication;