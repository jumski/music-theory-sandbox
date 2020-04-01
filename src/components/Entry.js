import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';
import ShowEntry from './ShowEntry';
import EditEntry from './EditEntry';

function Entry({ tracker, date, firebase, firestore: db }) {
  const [isEditing, setEditing] = useState(false);
  const [entry, setEntry] = useState(null);

  const dateString = date.toISOString().split('T')[0];
  const entryRef = db.doc(`trackers/${tracker.id}/entriesCollection/${dateString}`);

  useEffect(() => entryRef.onSnapshot(setEntry), []);

  if (!entry) {
    return "loading entry...";
  }

  if (!entry.exists) {
    return <div>
      <h3>{dateString}</h3>
      Entry for date '{dateString}' does not exists, wanna create?
    </div>;
  }

  if (isEditing) {
    return <EditEntry date={dateString} entry={entry} onSave={() => setEditing(false)}/>;
  }
  else {
    return <ShowEntry date={dateString} entry={entry} onClick={() => setEditing(true)}/>;
  }
}

export default withFirebase(Entry);
