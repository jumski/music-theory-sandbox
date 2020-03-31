import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';
import Entry from './Entry';

function Tracker({ firestore: db, trackerRef }) {
  const [tracker, setTracker] = useState(null);

  useEffect(() => trackerRef.onSnapshot(setTracker), [trackerRef]);

  if (tracker) {
    const { name, entries } = tracker.data();
    return <div>
      <h2>{name} ({tracker.id})</h2>

      {entries.map(e => <Entry key={e.id} entryRef={e}/>)}
    </div>;
  }
  else {
    return <div>loading tracker...</div>;
  }
}

export default withFirebase(Tracker);
