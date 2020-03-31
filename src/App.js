import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthenticatedOrLogIn from './auth/AuthenticatedOrLogIn';
import { withCurrentUser } from './auth/context';

const TestCurrentUserContextConsumer = withCurrentUser(({ currentUser }) => {
  return <div>XXXX={currentUser.displayName}</div>;
});

function App() {
  return (
    <div className="App">
      <AuthenticatedOrLogIn>
        <TestCurrentUserContextConsumer />
      </AuthenticatedOrLogIn>
    </div>
  );
}

export default App;
