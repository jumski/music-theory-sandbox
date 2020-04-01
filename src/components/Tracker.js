import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';
import Entry from './Entry';
import { lastNumberOfDays } from '../helpers';
import { List } from '@material-ui/core';

function Tracker({ firestore: db, trackerRef }) {
  const [tracker, setTracker] = useState(null);
  const dates = lastNumberOfDays(7);

  useEffect(() => trackerRef.onSnapshot(setTracker), [trackerRef]);

  if (tracker) {
    const { name } = tracker.data();
    return <div>
      <h2>{name} ({tracker.id})</h2>
      <List component="nav" aria-label="main entries">

        {dates.map(d => <Entry key={d} tracker={tracker} date={d} />)}
      </List>
    </div>;
  }
  else {
    return <div>loading tracker...</div>;
  }
}

export default withFirebase(Tracker);
