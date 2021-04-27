import React from 'react';
import { CardHeader, Chip, Typography } from '@material-ui/core';

function ChartHeader(props) {
  const selectedCompany = props.selectedCompany;
  const previousClose = props.previousClose;
  
  let header = (
    <>
      <Typography>
        {selectedCompany.name}
      </Typography>
      <Typography>
        {`$${Number.parseFloat(previousClose).toFixed(2)}`}
      </Typography>
      <Typography>
        Last Updated:
      </Typography>
    </>
  );

  return (
    <CardHeader
      title={header}
      disableTypography={true}
      action={
        <Chip
          label={selectedCompany.ticker}
        />
      }
    />
  );
}

export default ChartHeader