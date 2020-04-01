import React from 'react';
import PropTypes from 'prop-types'

import {
  Avatar,
  makeStyles,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  green: {
    background: '#4caf50',
    width: theme.spacing(9),
    height: theme.spacing(9),
  },

  orange: {
    background: '#ff9800',
    width: theme.spacing(9),
    height: theme.spacing(9),
  },

  grey: {
    background: '#e0e0e0',
    width: theme.spacing(9),
    height: theme.spacing(9),
  }
}));

function formatDate(dateString) {
  const date = Date.parse(dateString);

  return new Intl.DateTimeFormat('en-GB', {
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}

export default function DateAvatar(props) {
  const classes = useStyles();

  const { color = 'grey', dateString } = props

  return <div>
    <Avatar className={classes[color]}>
      {formatDate(dateString)}
    </Avatar>

  </div>;
}

DateAvatar.propTypes = {
  color: PropTypes.oneOf(['green', 'orange', 'grey'])
}
