import React, { useState } from 'react';
import './App.css';
import AuthenticatedOrLogIn from './auth/AuthenticatedOrLogIn';
import { withFirebase } from './firebase/context';
import Tracker from './components/Tracker';

function App({ firestore: db }) {
  const [trackerId, setTrackerId] = useState("g5ICQ3A6nXfyhQ0xlA1g");
  const trackerRef = db.doc(`trackers/${trackerId}`);

  return (
    <div className="App">
      <AuthenticatedOrLogIn onSignIn={() => {}}>
        <Tracker trackerRef={trackerRef} />
      </AuthenticatedOrLogIn>
    </div>
  );
}

export default withFirebase(App);
