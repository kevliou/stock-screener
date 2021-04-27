import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import { ApiClient } from '../../services/Api';
import StockPriceChart from './StockPriceChart';
import DateToggleButtons from './DateToggleButtons';
import ChartHeader from './ChartHeader';

function ChartCard(props) {
  const selectedCompany = props.selectedCompany;
  const quote = props.quote;

  const[dateRange, setDateRange] = useState('1D');

  const handleDateClick = (e, newDate) => {
    if(newDate !== null){
      setDateRange(newDate);
    }
  }

  const[intraday, setIntraday] = useState('');
  useEffect(() => {
    let isMounted = true;

    async function setIntradayData() {
      let ticker = selectedCompany.ticker;
      const apiClient = new ApiClient();
      apiClient.getIntraday(ticker)
        .then(res => (isMounted) ? setIntraday(res) : undefined);
    }
    setIntradayData();

    // Do not fetch suggestion list if component is unmounted
    return function cleanup(){
      isMounted = false;
    }
  }, [selectedCompany]);

  return (
    <Card>
      <ChartHeader
        selectedCompany={selectedCompany}
        previousClose={quote['08. previous close']}
      />
      <CardContent>
        <DateToggleButtons
          dateRange={dateRange}
          handleDateClick={handleDateClick}
        />
        <StockPriceChart
          intraday={intraday}
        />
      </CardContent>
    </Card>
  )
}

export default ChartCard