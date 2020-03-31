import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';
import ShowEntry from './ShowEntry';
import EditEntry from './EditEntry';

function Entry(props) {
  const [isEditing, setEditing] = useState(false);
  const [entry, setEntry] = useState(props.entry);

  useEffect(() => {
    entry.ref.onSnapshot(setEntry)
  }, []);

  if (isEditing) {
    return <EditEntry entry={entry} onSave={() => setEditing(false)}/>;
  }
  else {
    return <ShowEntry entry={entry} onClick={() => setEditing(true)}/>;
  }
}

export default withFirebase(Entry);
