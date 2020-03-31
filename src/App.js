import React from 'react';
import logo from './logo.svg';
import './App.css';
import { withFirebase } from './firebase/context';

function App({ auth }) {
  return (
    <div className="App">
      test
    </div>
  );
}

export default withFirebase(App);
