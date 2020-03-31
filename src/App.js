import React from 'react';
import './App.css';
import AuthenticatedOrLogIn from './auth/AuthenticatedOrLogIn';
import MainPane from './components/MainPane';

export default function App() {
  return (
    <div className="App">
      <AuthenticatedOrLogIn>
        <MainPane/>
      </AuthenticatedOrLogIn>
    </div>
  );
}
