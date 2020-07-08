import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';
import ShowEntry from './ShowEntry';
import EditEntry from './EditEntry';
import ShowUndefinedEntry from './ShowUndefinedEntry';

function Entry({ tracker, date, firebase, firestore: db }) {
  const [isEditing, setEditing] = useState(false);
  const [isCreating, setCreating] = useState(false);
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
    setCreating(true);
    await entryRef.set(defaultEntryData, { merge: true });
    setCreating(false);
    setEditing(true);
  }

  if (!entry) {
    return <ShowUndefinedEntry
      secondaryText="Loading entry..."
      dateString={dateString}
    />;
  }

  if (isCreating) {
    return <ShowUndefinedEntry
      secondaryText="Creating Entry..."
      dateString={dateString}
    />;
  }

  if (!entry.exists) {
    return <ShowUndefinedEntry
      secondaryText="Entry for this date does not exists"
      dateString={dateString}
      onEdit={createEmptyEntry}
    />;
  }

  if (isEditing) {
    return <>
      <EditEntry dateString={dateString} entry={entry} onSave={() => setEditing(false)}/>
      <ShowEntry dateString={dateString} entry={entry} onEdit={() => setEditing(true)}/>
    </>;
  }

  return <ShowEntry dateString={dateString} entry={entry} onEdit={() => setEditing(true)}/>;
}

export default withFirebase(Entry);
