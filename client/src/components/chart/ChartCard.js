import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import StockPriceChart from './StockPriceChart';

function ChartCard(props) {
  const selectedCompany = props.selectedCompany;
  const intraday = props.intraday;

  let header = (
    <>
      <Typography>
        {selectedCompany.name}
      </Typography>
    </>
  );

  return (
    <Card>
      <CardHeader 
        title = {header}
        disableTypography = {true}
      />
      <CardContent>
          <StockPriceChart 
            intraday = {intraday}
          />
      </CardContent>
    </Card>
  )
}

export default ChartCard