import React, { useEffect, useState } from 'react';
import Tracker from './Tracker';
import { withCurrentUser } from '../auth/context';
import { withFirebase } from '../firebase/context';

function MainPane({ currentUser, firestore: db }) {
  const [user, setUser] = useState(null);
  const userRef = db.doc(`users/${currentUser.uid}`);

  useEffect(() => userRef.onSnapshot(u => {
    if (u.exists) {
      setUser(u);
    }
    else {
      const trackerRef = db.collection('trackers').doc();

      trackerRef.set({ name: currentUser.displayName }, { merge: true })
      userRef.set({
        name: currentUser.displayName,
        trackers: [trackerRef]
      }, { merge: true });
    }
  }), []);

  if (user) {
    const [tracker] = user.data().trackers;

    return <Tracker trackerRef={tracker} />;
  }
  else {
    return <div>Loading user...</div>;
  }
}

export default withFirebase(withCurrentUser(MainPane));
