import React from 'react';
import './App.css';
import AuthenticatedOrLogIn from './auth/AuthenticatedOrLogIn';
import MainPane from './components/MainPane';
import MenuIcon from '@material-ui/icons/Menu';
import SignOutButton from './auth/SignOutButton';

import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
} from '@material-ui/core';

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

export default function App() {
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
          <AuthenticatedOrLogIn>
            <SignOutButton/>
          </AuthenticatedOrLogIn>
        </Toolbar>
      </AppBar>
      <Container>
        <AuthenticatedOrLogIn>
          <MainPane/>
        </AuthenticatedOrLogIn>
      </Container>
    </div>
  );
}
