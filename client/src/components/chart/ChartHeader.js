import React from 'react';
import { CardHeader, Chip, Typography } from '@material-ui/core';

function ChartHeader(props) {
  const selectedTicker = props.selectedTicker;
  const selectedName = props.selectedName;
  const quote = props.quote;
  const chartOptions = props.chartOptions;

  let header = (
    <>
      <Typography>
        {selectedName}
      </Typography>
      <Typography>
        {quote !== '' && quote['08. previous close'] !== null &&
          `$${Number.parseFloat(quote['08. previous close']).toFixed(2)}`
        }
      </Typography>
      <Typography>
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
          label={selectedTicker}
        />
      }
    />
  );
}

export default ChartHeader