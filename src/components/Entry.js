import React, { useState } from 'react';
import { withFirebase } from '../firebase/context';

function Entry({ entry }) {
  const { notes, date } = entry.data();
  const [parameters, setParameters] = useState(entry.data().parameters);

  function toggleParameter(param) {
    const { [param]: currentValue } = parameters;
    const newParameters = { ...parameters, [param]: !currentValue };

    entry.ref.set({ parameters: newParameters }, { merge: true })
    setParameters(newParameters);
  }

  return <li>
    <h3>{date} ({notes})</h3>
    {Object.entries(parameters).map(([name, value]) => {
      return <span key={name} onClick={() => toggleParameter(name)}>
        {name}: {value ? 'tak' : 'nie'},
        <br/>
      </span>
    })}
  </li>;
}

export default withFirebase(Entry);
