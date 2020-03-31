import React, { useState } from 'react';

export default function EditEntry({ entry, onSave }) {
  const { date } = entry.data();
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
    <h3>{date} <input type="text" value={notes} onChange={setNotes}/></h3>
    <ul>{Object.entries(parameters).map(([name, value]) => {
      return <li key={name}>
        {name}:
        <input
          onChange={() => setParameter(name, !value)}
          type="checkbox"
          checked={value}/>
      </li>;
    })}</ul>

    <button onClick={saveEntry} disabled={isSaving}>Save</button>
  </div>;
}
