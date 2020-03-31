import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';

function Tracker({ firestore: db, trackerId }) {
  const [tracker, setTracker] = useState(null);

  useEffect(() => {
    if (!tracker) {
      db.collection('trackers').doc(trackerId.toString()).get().then(setTracker)
    }
  }, []);

  if (tracker) {
    const { name } = tracker.data();
    return <div>tracker={name} ({tracker.id})</div>;
  }
  else {
    return <div>loading tracker...</div>;
  }
}

export default withFirebase(Tracker);
