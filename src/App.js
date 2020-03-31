import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthenticatedOrLogIn from './components/AuthenticatedOrLogIn';

function App() {
  return (
    <div className="App">
      <AuthenticatedOrLogIn>
        kartofle
      </AuthenticatedOrLogIn>
    </div>
  );
}

export default App;
