import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';
import ShowEntry from './ShowEntry';
import EditEntry from './EditEntry';

function Entry({ tracker, date, firebase, firestore: db }) {
  const [isEditing, setEditing] = useState(false);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const dateString = date.toISOString().split('T')[0];
    const query = db.collection('entries')
      .where('tracker', '==', tracker.ref)
      .where('date', '==', dateString);
    query.get().then(({ docs: [e] }) => {
      if (e) setEntry(e);
    });
  }, [date, db, tracker]);

  useEffect(() => {
    if (entry) {
      entry.ref.onSnapshot(setEntry)
    }
  }, [entry]);

  if (!entry) {
    return "";
  }

  if (isEditing) {
    return <EditEntry entry={entry} onSave={() => setEditing(false)}/>;
  }
  else {
    return <ShowEntry entry={entry} onClick={() => setEditing(true)}/>;
  }
}

export default withFirebase(Entry);
