import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { withFirebase } from './firebase/context';

function App({ firebase }) {
  const { currentUser } = firebase.auth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!user) {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider)
        .then(({ user }) => setUser(user))
        .catch(err => console.log('error', err));
    }
  });

  return (
    <div className="App">
      user={user ? user.displayName : 'not logged in'}
    </div>
  );
}

export default withFirebase(App);
