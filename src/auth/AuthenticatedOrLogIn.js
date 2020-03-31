import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';
import CurrentUserContext from './context';
import {
  Button,
} from '@material-ui/core';

// This components contains signin/signout logic
// It will render "Log in via google!" button if no auth session is found,
// or render children if session is found.
function AuthenticatedOrLogIn({ children, firebase }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        setCurrentUser(firebaseUser);
      }
      else {
        setCurrentUser(null);
      }
    });
  });

  function signOut() {
    firebase.auth().signOut();
  }

  function showAuthPopup() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
  };

  if (currentUser) {
    return <CurrentUserContext.Provider value={currentUser}>
      {/* logged in as {currentUser.displayName} (uid={currentUser.uid}) */}
      {currentUser.displayName}
      <Button
        variant="contained"
        color="primary"
        onClick={signOut}>
        Sign out
      </Button>
      {children}
    </CurrentUserContext.Provider>;
  }
  else {
    return <>
      <Button variant="contained" color="primary" onClick={showAuthPopup}>Log in via google!</Button>
    </>;
  }
};

export default withFirebase(AuthenticatedOrLogIn);
