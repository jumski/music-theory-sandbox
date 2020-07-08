import React from 'react';
import DateAvatar from './DateAvatar'
import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

export default function ShowUndefinedEntry({ dateString, primaryText, secondaryText, onEdit = ()=>{} }) {
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
        primary={primaryText}
        secondary={secondaryText}
      />

      <ListItemSecondaryAction onClick={onEdit}>
        <IconButton onClick={onEdit} edge="end" aria-label="comments">
          <CreateIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  </div>;
}
