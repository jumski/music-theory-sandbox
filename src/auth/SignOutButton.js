import React from 'react';
import { Button } from '@material-ui/core';
import { withFirebase } from '../firebase/context';
import { withCurrentUser } from '../auth/context';

function SignOutButton({ firebase, currentUser }) {

  function signOut() {
    firebase.auth().signOut();
  }

  return <>
    {currentUser.displayName}
    <Button
      variant="contained"
      color="primary"
      onClick={signOut}>
      Sign out
    </Button>
  </>;
}

export default withFirebase(withCurrentUser(SignOutButton));
