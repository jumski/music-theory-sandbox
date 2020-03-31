import React from 'react';

export default function Entry({ entry }) {
  const { id } = entry;
  const { parameters, notes } = entry.data();

  return <li>
    {id} - kaszel: {parameters.cough ? 'tak' : 'nie'}
  </li>;
}

