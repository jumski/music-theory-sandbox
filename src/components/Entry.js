import React, { useState, useEffect } from 'react';
import { withFirebase } from '../firebase/context';
import ShowEntry from './ShowEntry';
import EditEntry from './EditEntry';
import DateAvatar from './DateAvatar';
import {
  IconButton,
  Link,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';

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
    return <div>
      <h3>{dateString}</h3>
      Loading entry...
    </div>;
  }

  if (isCreating) {
    return <div>
      <h3>{dateString}</h3>
      Creating entry... please wait.
    </div>;
  }

  if (!entry.exists) {
    return <div>
      <ListItem
        divider
        button
        role='listitem'
      >
        <ListItemIcon>
          <DateAvatar
            dateString={dateString} />
        </ListItemIcon>

        <ListItemText
          align='center'
        >
          Entry for this date does not exists,
          <Link
            component="button"
            variant="body2"
            onClick={createEmptyEntry}
          >
            wanna create?
          </Link>
        </ListItemText>
      </ListItem>
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
