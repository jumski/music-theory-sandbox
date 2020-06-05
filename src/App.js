import React from 'react';
import './App.css';
import Dropzone from './Dropzone';

export default function App() {
  const classes = {root: 'looptrap-root'};

  return (
    <div className={classes.root}>
      <Dropzone />
    </div>
  );
}
