import React, { useState } from 'react';
import { withFirebase } from '../firebase/context';

function AuthenticatedOrLogIn({ children, firebase }) {
  const [user, setUser] = useState(null);

  function showAuthPopup() {
    if (!user) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then(({ user }) => setUser(user))
        .catch(err => console.log('error', err));
    }
  };

  if (user) {
    return <>
      <div>logged in as {user.displayName}</div>
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
