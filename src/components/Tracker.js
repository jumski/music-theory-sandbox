import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';
import Entry from './Entry';

function Tracker({ firestore: db, trackerId }) {
  const [tracker, setTracker] = useState(null);
  const [entries, setEntries] = useState([]);

  async function fetchTrackerAndEntries(trackerId) {
    const tracker = await db.collection('trackers')
      .doc(trackerId.toString()).get();
    const entries = await Promise.all(tracker.data().entries.map(e => e.get()));

    console.log('x', entries[0].data());

    return { tracker, entries };
  }

  useEffect(() => {
    if (!tracker) {
      fetchTrackerAndEntries(trackerId).then(({ tracker, entries }) => {
        setTracker(tracker);
        setEntries(entries);
      });
    }
  }, []);

  if (tracker) {
    const { name } = tracker.data();
    return <div>
      <h2>{name} ({tracker.id})</h2>

      {entries.map(e => <Entry key={e.id} entry={e}/>)}
    </div>;
  }
  else {
    return <div>loading tracker...</div>;
  }
}

export default withFirebase(Tracker);
