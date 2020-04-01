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

  async function createEmptyEntry() {
    const defaultEntryData = {
      notes: '',
      parameters: {
        cough: false,
        highFever: false,
        runnyNose: false,
        lossOfSmell: false
      }
    };
    await entryRef.set(defaultEntryData, { merge: true });
    setEditing(true);
  }

  if (!entry) {
    return <div>
      <h3>{dateString}</h3>
      Loading entry...
    </div>;
  }

  if (!entry.exists) {
    return <div>
      <h3>{dateString}</h3>
      Entry for date '{dateString}' does not exists, <a href='#' onClick={createEmptyEntry}>wanna create?</a>
    </div>;
  }

  if (isEditing) {
    return <EditEntry dateString={dateString} entry={entry} onSave={() => setEditing(false)}/>;
  }
  else {
    return <ShowEntry dateString={dateString} entry={entry} onClick={() => setEditing(true)}/>;
  }
}

export default withFirebase(Entry);
