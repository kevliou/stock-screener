import { CircularProgress, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React from 'react';
import './TransitionManager.css';

function TransitionManager(props) {
  const content = props.content;
  const isLoading = props.isLoading;
  const loadingMessage = props.loadingMessage;
  const error = props.error;

  let display = false;
  if (error) {
    console.log(error);
    display = (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {(process.env.NODE_ENV === 'production')
          ? 'Something went wrong'
          : error.message
        }
      </Alert>
    )
  } else if (isLoading) {
    display = (
      <div className="loading">
        { loadingMessage &&
          <Typography>{loadingMessage}</Typography>
        }
        <CircularProgress className="progress-circle" />
      </div>
    )
  } else if (content !== undefined) {
    display = content;
  }

  return display;
}

export default TransitionManager