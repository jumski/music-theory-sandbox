import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';

export default function EditEntry({ dateString, entry, onSave }) {
  const [notes, setNotes] = useState(entry.data().notes);
  const [parameters, setParameters] = useState(entry.data().parameters);
  const [isSaving, setSaving] = useState(false);

  async function saveEntry() {
    setSaving(true);
    await entry.ref.set({ notes: notes, parameters: parameters }, { merge: true });
    setSaving(false);
    onSave();
  }

  function setParameter(name, value) {
    setParameters({ ...parameters, [name]: value });
  }

  return <div style={{opacity: isSaving ? '0.4' : '1'}}>
    <Dialog
      disableBackdropClick
      disableEscapeKeyDown
      fullScreen
      open={true}
    >
      <DialogTitle id="confirmation-dialog-title">{dateString}</DialogTitle>
      <DialogContent dividers>
        <Typography variant="h6">
          How do you feel?
        </Typography>

        <List >
          {
            Object.entries(parameters).map(([name, value], index) => {
              return (
                <ListItem key={index}>
                  <ListItemText primary={name}  />
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={value}
                      onClick={() => setParameter(name, !value)}
                      name={name}
                      tabIndex={-1}
                      color="primary"
                      disableRipple
                    />
                  </ListItemIcon>
                </ListItem>
              )
            })
          }
        </List>
        <Typography variant="h6">Who did you meat today?</Typography>
        <Typography variant="h6">Where have you been?</Typography>

        <TextField
          id="notes"
          multiline
          rowsMax="6"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={saveEntry} disabled={isSaving} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  </div>;
}
