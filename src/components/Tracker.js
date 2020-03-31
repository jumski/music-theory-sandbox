import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';
import Entry from './Entry';

function lastNumberOfDays(number) {
  const today = new Date();
  return [...Array(number).keys()].map(deltaDays => {
    const date = new Date();
    date.setDate(today.getDate() - deltaDays);
    return date;
  });
}

function Tracker({ firestore: db, trackerRef }) {
  const [tracker, setTracker] = useState(null);
  const dates = lastNumberOfDays(7);

  useEffect(() => trackerRef.onSnapshot(setTracker), [trackerRef]);

  if (tracker) {
    const { name, entries } = tracker.data();
    return <div>
      <h2>{name} ({tracker.id})</h2>

      {dates.map(d => <Entry key={d} tracker={tracker} date={d} />)}
    </div>;
  }
  else {
    return <div>loading tracker...</div>;
  }
}

export default withFirebase(Tracker);
