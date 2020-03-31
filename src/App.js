import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthenticatedOrLogIn from './auth/AuthenticatedOrLogIn';
import { withCurrentUser } from './auth/context';
import { withFirebase } from './firebase/context';
import Tracker from './components/Tracker';

const TestCurrentUserContextConsumer = withCurrentUser(({ currentUser }) => {
  return <div>XXXX={currentUser.displayName}</div>;
});

function App() {
  return (
    <div className="App">
      <AuthenticatedOrLogIn>
        <TestCurrentUserContextConsumer />
        <Tracker trackerId={"g5ICQ3A6nXfyhQ0xlA1g"} />
      </AuthenticatedOrLogIn>
    </div>
  );
}

export default App;
