import React from 'react';
import { CardHeader, Chip, Typography } from '@material-ui/core';
import './ChartHeader.css';

function ChartHeader(props) {
  const selectedTicker = props.selectedTicker;
  const selectedName = props.selectedName;
  const previousClose = props.previousClose;
  const chartOptions = props.chartOptions;

  let header = (
    <>
      <Typography variant="h1">
        {selectedName}
      </Typography>
      <Typography className="previous-close">
        {previousClose}
      </Typography>
      <Typography variant="subtitle1" className="last-updated">
        {chartOptions !== '' && chartOptions.lastUpdated !== null &&
          'Last Updated:' + chartOptions.lastUpdated
        }
      </Typography>
    </>
  );

  return (
    <CardHeader
      title={header}
      disableTypography={true}
      action={
        <Chip
        color="primary"  
        label={selectedTicker}
        />
      }
    />
  );
}

export default ChartHeader