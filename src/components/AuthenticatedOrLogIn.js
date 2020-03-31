import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';

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
    return <>
      <div>
        logged in as {currentUser.displayName} (uid={currentUser.uid})
        <button onClick={signOut}>Sign out</button>
      </div>
      {children}
    </>;
  }
  else {
    return <>
      <div>Not logged in :(</div>
      <button onClick={showAuthPopup}>Log in via google!</button>
    </>;
  }
};

export default withFirebase(AuthenticatedOrLogIn);
