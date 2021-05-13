import React from 'react';
import { Typography } from '@material-ui/core';
import './LoadingBar.css';

function LoadingBar(props) {
  return (
    <div className="loader">
      <Typography className="message">
        Heroku Loading
      </Typography>
      <div className="spinner">
        <div className="rect1" />
        <div className="rect2" />
        <div className="rect3" />
        <div className="rect4" />
        <div className="rect5" />
      </div>
    </div>
  );
}

export default LoadingBar