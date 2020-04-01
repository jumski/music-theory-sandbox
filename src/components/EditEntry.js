import React, { useState } from 'react';

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
    <h3>{dateString} <input type="text" value={notes} onChange={setNotes}/></h3>
    <ul>{Object.entries(parameters).map(([name, value]) => {
      return <li onClick={() => setParameter(name, !value)} style={{cursor: 'pointer'}} key={name}>
        {name}: <input type="checkbox" checked={value}/>
      </li>;
    })}</ul>

    <button onClick={saveEntry} disabled={isSaving}>Save</button>
  </div>;
}
