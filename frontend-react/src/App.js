import React from 'react';
import './App.css';
import Dropzone from './Dropzone';
import AuthenticatedOrLogIn from './auth/AuthenticatedOrLogIn';

export default function App() {
  const classes = {root: 'looptrap-root'};

  return (
    <div className={classes.root}>
      <AuthenticatedOrLogIn>
        <Dropzone />
      </AuthenticatedOrLogIn>
    </div>
  );
}
