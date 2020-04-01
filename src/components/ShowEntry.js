import React from 'react';
import DateAvatar from './DateAvatar'

import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';

function parametersLabel(parameters) {
  const symptoms = Object.keys(parameters).filter(key => parameters[key]);

  if (symptoms.length === 0) return 'All OK';

  return symptoms.join(', ');
}

export default function ShowEntry({ dateString, entry, onClick }) {
  const { notes, parameters } = entry.data();
  const label = parametersLabel(parameters);

  return <div>
    <ListItem
      divider
      button
      aria-haspopup='true'
      aria-controls='entry-menu'
      role='listitem'
    >
      <ListItemIcon>
        <DateAvatar
          dateString={dateString}
          color={label === 'All OK' ? 'green' : 'orange'}/>
      </ListItemIcon>

      <ListItemText
        align='center'
        primary={label}
        secondary={notes ? notes : '---'}
      />

      <ListItemSecondaryAction onClick={onClick}>
        <IconButton onClick={onClick} edge="end" aria-label="comments">
          <CreateIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  </div>;
}
