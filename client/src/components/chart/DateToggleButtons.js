import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab/index'
import { Typography } from '@material-ui/core';
import './DateToggleButton.css';

function DateToggleButtons(props) {
  let dateRange = props.dateRange;
  let handleDateClick = props.handleDateClick;

  return (
    <ToggleButtonGroup
      value={dateRange}
      className="toggle-button-group"
      exclusive
      onChange={handleDateClick}
      size="small"
      aria-label="date range"
    >
      <ToggleButton 
        value="1D" 
        aria-label="1 day"
        className="toggle-button"
      >
        <Typography variant="subtitle1">1D</Typography>
      </ToggleButton>
      <ToggleButton 
        value="5D" 
        aria-label="5 days"
        className="toggle-button"
      >
        <Typography variant="subtitle1">5D</Typography>
      </ToggleButton>
      <ToggleButton 
        value="1M" 
        aria-label="1 month"
        className="toggle-button"
      >
        <Typography variant="subtitle1">1M</Typography>
      </ToggleButton>
      <ToggleButton 
        value="6M" 
        aria-label="6 months"
        className="toggle-button"
      >
        <Typography variant="subtitle1">6M</Typography>
      </ToggleButton>
      <ToggleButton 
        value="YTD" 
        aria-label="year to date"
        className="toggle-button"
      >
        <Typography variant="subtitle1">YTD</Typography>
      </ToggleButton>
      <ToggleButton 
        value="1Y" 
        aria-label="1 year"
        className="toggle-button"
      >
        <Typography variant="subtitle1">1Y</Typography>
      </ToggleButton>
      <ToggleButton 
        value="5Y" 
        aria-label="5 years"
        className="toggle-button"
      >
        <Typography variant="subtitle1">5Y</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default DateToggleButtons