import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import StockPriceChart from './StockPriceChart';
import DateToggleButtons from './DateToggleButtons';
import ChartHeader from './ChartHeader';
import { useChartData } from './ChartHooks';
import './ChartCard.css';

function ChartCard(props) {
  const selectedTicker = props.selectedTicker;
  const selectedName = props.selectedName;

  const [dateRange, setDateRange] = useState('1D');
  const handleDateClick = (e, newDate) => {
    if (newDate !== null) {
      setDateRange(newDate);
    }
  }

  // Fetch data on ticker change
  const chartData = useChartData(dateRange, selectedTicker);
  useEffect(() => {
    // Reset to 1 day view on new ticker selected
    setDateRange('1D');
  }, [selectedTicker]);

  return (
    <Card>
      <ChartHeader
        selectedTicker={selectedTicker}
        selectedName={selectedName}
        dateRange={dateRange}
        chartData={chartData}
      />
      <CardContent className="content">
        <DateToggleButtons
          dateRange={dateRange}
          handleDateClick={handleDateClick}
        />
        <div>
          {chartData && dateRange &&
            <StockPriceChart
              dateRange={dateRange}
              chartData={chartData}
            />
          }
        </div>
      </CardContent>
    </Card>
  )
}

export default ChartCard