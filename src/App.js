import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthenticatedOrLogIn from './auth/AuthenticatedOrLogIn';
import { withCurrentUser } from './auth/context';
import { withFirebase } from './firebase/context';
import Tracker from './components/Tracker';
import MenuIcon from '@material-ui/icons/Menu';

import {
  makeStyles,
  Button,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
} from '@material-ui/core';

const TestCurrentUserContextConsumer = withCurrentUser(({ currentUser }) => {
  return <div>XXXX={currentUser.displayName}</div>;
});

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            *trackme
          </Typography>
          <AuthenticatedOrLogIn />
        </Toolbar>
      </AppBar>
      <Container>
        <AuthenticatedOrLogIn>
          <TestCurrentUserContextConsumer />
          <Tracker trackerId={"g5ICQ3A6nXfyhQ0xlA1g"} />
        </AuthenticatedOrLogIn>
      </Container>
    </div>
  );
}

export default App;
