import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { ApiClient } from '../../services/Api';
import EquityChartData from '../../services/EquityChartData';
import StockPriceChart from './StockPriceChart';
import DateToggleButtons from './DateToggleButtons';
import ChartHeader from './ChartHeader';

function ChartCard(props) {
  const selectedTicker = props.selectedTicker;
  const selectedName = props.selectedName;
  const quote = props.quote;

  const [intradayQuotes, setIntradayQuotes] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const apiClient = new ApiClient();

    async function fetchIntradayData() {
      const result = await apiClient.getIntraday(selectedTicker);
      if (isMounted) {
        setIntradayQuotes(result);
      }
    }

    fetchIntradayData();

    // Do not fetch suggestion list if component is unmounted
    return function cleanup() {
      isMounted = false;
    }
  }, [selectedTicker]);

  const [dailyQuotes, setDailyQuotes] = useState(null);
  useEffect(() => {
    let isMounted = true;
    const apiClient = new ApiClient();

    async function fetchDailyData() {
      const result = await apiClient.getDailyAdjusted(selectedTicker);
      if (isMounted) {
        setDailyQuotes(result);
      }
    }

    fetchDailyData();

    // Do not fetch suggestion list if component is unmounted
    return function cleanup() {
      isMounted = false;
    }
  }, [selectedTicker]);

  const [dateRange, setDateRange] = useState('1D');
  const handleDateClick = (e, newDate) => {
    if (newDate !== null) {
      setDateRange(newDate);
    }
  }

  const [chartOptions, setChartOptions] = useState('');
  useEffect(() => {
    if (intradayQuotes !== null && dailyQuotes !== null) {
      let equityChartData = new EquityChartData();
      equityChartData.setIntraday(intradayQuotes);
      equityChartData.setDaily(dailyQuotes);
      setChartOptions(equityChartData.getChartOptions(dateRange));
    }
  }, [intradayQuotes, dailyQuotes, dateRange]);

  return (
    <Card>
      <ChartHeader
        selectedTicker={selectedTicker}
        selectedName={selectedName}
        quote={quote}
        chartOptions={chartOptions}
      />
      <CardContent>
        <DateToggleButtons
          dateRange={dateRange}
          handleDateClick={handleDateClick}
        />
        <div>
          {chartOptions !== '' &&
            <StockPriceChart
              chartOptions={chartOptions}
            />
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default ChartCard