import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@material-ui/lab/index'
import { Typography } from '@material-ui/core';

function DateToggleButtons(props) {
  let dateRange = props.dateRange;
  let handleDateClick = props.handleDateClick;


  return(
    <ToggleButtonGroup
      value={dateRange}
      exclusive
      onChange={handleDateClick}
      size="small"
      aria-label="date range"
    >
      <ToggleButton value="1D" aria-label="1 day">
        <Typography>1D</Typography>
      </ToggleButton>
      <ToggleButton value="5D" aria-label="5 days">
        <Typography>5D</Typography>
      </ToggleButton>
      <ToggleButton value="1M" aria-label="1 month">
        <Typography>1M</Typography>
      </ToggleButton>
      <ToggleButton value="6M" aria-label="6 months">
        <Typography>6M</Typography>
      </ToggleButton>
      <ToggleButton value="YTD" aria-label="year to date">
        <Typography>YTD</Typography>
      </ToggleButton>
      <ToggleButton value="1Y" aria-label="1 year">
        <Typography>1Y</Typography>
      </ToggleButton>
      <ToggleButton value="5Y" aria-label="5 years">
        <Typography>5Y</Typography>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default DateToggleButtons