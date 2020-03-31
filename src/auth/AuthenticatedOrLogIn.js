import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';
import CurrentUserContext from './context';

// This components contains signin/signout logic
// It will render "Log in via google!" button if no auth session is found,
// or render children if session is found.
function AuthenticatedOrLogIn({ children, firebase, onSignIn = ()=>{} }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        onSignIn({ user: user });
      }
      setCurrentUser(user);
    });
  }, []);

  function signOut() {
    firebase.auth().signOut();
  }

  function showAuthPopup() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  if (currentUser) {
    return <CurrentUserContext.Provider value={currentUser}>
      logged in as {currentUser.displayName} (uid={currentUser.uid})
      <button onClick={signOut}>Sign out</button>
      {children}
    </CurrentUserContext.Provider>;
  }
  else {
    return <>
      <div>Not logged in :(</div>
      <button onClick={showAuthPopup}>Log in via google!</button>
    </>;
  }
};

export default withFirebase(AuthenticatedOrLogIn);
