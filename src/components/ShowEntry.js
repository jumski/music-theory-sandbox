import React from 'react';

export default function ShowEntry({ dateString, entry, onClick }) {
  const { notes, parameters } = entry.data();
  return <div onClick={onClick}>
    <h3>{dateString} <small>{notes}</small></h3>
    <ul>{Object.entries(parameters).map(([name, value]) => {
      return <li key={name}>{name}: {value ? 'tak' : 'nie'}</li>
    })}</ul>
  </div>;
}
