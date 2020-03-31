import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';
import ShowEntry from './ShowEntry';
import EditEntry from './EditEntry';

function Entry({ entryRef }) {
  const [isEditing, setEditing] = useState(false);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    entryRef.onSnapshot(setEntry)
  }, [entryRef]);

  if (isEditing || !entry.exists) {
    return <EditEntry entry={entry} onSave={() => setEditing(false)}/>;
  }
  else {
    return <ShowEntry entry={entry} onClick={() => setEditing(true)}/>;
  }
}

export default withFirebase(Entry);
