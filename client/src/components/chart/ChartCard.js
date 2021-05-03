import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@material-ui/core';
import { ApiClient } from '../../services/Api';
import { parseChartData1D, parseChartData1M, parseChartData1Y, parseChartData5D, parseChartData5Y, parseChartData6M, parseChartDataYTD } from '../../services/ChartDataFormatter';
import StockPriceChart from './StockPriceChart';
import DateToggleButtons from './DateToggleButtons';
import ChartHeader from './ChartHeader';
import './ChartCard.css';

function ChartCard(props) {
  const selectedTicker = props.selectedTicker;
  const selectedName = props.selectedName;
  const previousClose = props.previousClose;

  const [dateRange, setDateRange] = useState('1D');
  const handleDateClick = (e, newDate) => {
    if (newDate !== null) {
      setDateRange(newDate);
    }
  }

  const [chartData1D, setChartData1D] = useState(undefined);
  const [chartData5D, setChartData5D] = useState(undefined);
  const [chartData1M, setChartData1M] = useState(undefined);
  const [chartData6M, setChartData6M] = useState(undefined);
  const [chartDataYTD, setChartDataYTD] = useState(undefined);
  const [chartData1Y, setChartData1Y] = useState(undefined);
  const [chartData5Y, setChartData5Y] = useState(undefined);

  useEffect(() => {
    let isMounted = true;

    if (selectedTicker !== '') {
      fetchData();
    }

    function fetchData() {
      const apiClient = new ApiClient();

      apiClient.getIntradayQuotes(selectedTicker)
        .then(res => (isMounted) ? console.log(res) : undefined);
      
      apiClient.getFiveDayQuotes(selectedTicker)
        .then(res => (isMounted) ? console.log(res) : undefined);
      
      apiClient.getAnnualQuotes(selectedTicker)
        .then(res => (isMounted) ? console.log(res) : undefined);

      apiClient.getFiveYearQuotes(selectedTicker)
      .then(res => (isMounted) ? console.log(res) : undefined);
    }

    // Do not fetch suggestion list if component is unmounted
    return function cleanup() {
      isMounted = false;
    }
  }, [selectedTicker]);



  // useEffect(() => {
  //   let isMounted = true;
  //   const apiClient = new ApiClient();

  //   function fetchData() {
  //     apiClient.getIntraday(selectedTicker)
  //       .then(res => (isMounted)
  //         ? setChartData1D(parseChartData1D(res))
  //         : undefined
  //       )
  //       .catch(err => console.log(err))

  //     apiClient.getFiveDay(selectedTicker)
  //       .then(res => (isMounted)
  //         ? setChartData5D(parseChartData5D(res))
  //         : undefined
  //       )
  //       .catch(err => console.log(err))

  //     apiClient.getDailyAdjusted(selectedTicker)
  //       .then(res => (isMounted) ? setLongTermChartData(res) : undefined)
  //       .catch(err => console.log(err))
  //   }

  //   function setLongTermChartData(data) {
  //     setChartData1M(parseChartData1M(data));
  //     setChartData6M(parseChartData6M(data));
  //     setChartDataYTD(parseChartDataYTD(data));
  //     setChartData1Y(parseChartData1Y(data));
  //     setChartData5Y(parseChartData5Y(data));
  //   }

  //   if (selectedTicker !== '') {
  //     fetchData();
  //   }

  //   // Do not fetch suggestion list if component is unmounted
  //   return function cleanup() {
  //     isMounted = false;
  //   }
  // }, [selectedTicker]);

  // const [chartData, setChartData] = useState(undefined);
  // useEffect(() => {
  //   switch (dateRange) {
  //     case '1D':
  //       setChartData(chartData1D);
  //       break;
  //     case '5D':
  //       setChartData(chartData5D);
  //       break;
  //     case '1M':
  //       setChartData(chartData1M);
  //       break;
  //     case '6M':
  //       setChartData(chartData6M);
  //       break;
  //     case 'YTD':
  //       setChartData(chartDataYTD);
  //       break;
  //     case '1Y':
  //       setChartData(chartData1Y);
  //       break;
  //     case '5Y':
  //       setChartData(chartData5Y);
  //       break;
  //     default:
  //       setChartData(undefined);
  //   }
  // }, [selectedTicker, dateRange]);
  
  //chartData1D, chartData5D, chartData1M, chartData6M, chartDataYTD, chartData1Y, chartData5Y

  // const [chartOptions, setChartOptions] = useState('');
  // useEffect(() => {
  //   switch (dateRange) {
  //     case '1D':
  //       setChartOptions({
  //         chartUnit: 'hour',
  //         displayFormats: {
  //           hour: 'hh:mm a'
  //         }
  //       });
  //       break;
  //     case '5D':
  //       setChartOptions({
  //         chartUnit: 'day',
  //         displayFormats: {
  //           hour: 'MMM dd'
  //         }
  //       });
  //       break;
  //     case '1M':
  //       setChartOptions({
  //         chartUnit: 'day',
  //         displayFormats: {
  //           hour: 'MMM dd'
  //         }
  //       });
  //       break;
  //     case '6M':
  //       setChartOptions({
  //         chartUnit: 'month',
  //         displayFormats: {
  //           hour: 'MMM yyyy'
  //         }
  //       });
  //       break;
  //     case 'YTD':
  //       setChartOptions({
  //         chartUnit: 'month',
  //         displayFormats: {
  //           hour: 'MMM yyyy'
  //         }
  //       });
  //       break;
  //     case '1Y':
  //       setChartOptions({
  //         chartUnit: 'month',
  //         displayFormats: {
  //           hour: 'MMM yyyy'
  //         }
  //       });
  //       break;
  //     case '5Y':
  //       setChartOptions({
  //         chartUnit: 'year',
  //         displayFormats: {
  //           hour: 'yyyy'
  //         }
  //       });
  //       break;
  //     default:
  //       console.log('Uncaught')
  //   }
  // }, [dateRange]);

  return (
    <Card>
      <ChartHeader
        selectedTicker={selectedTicker}
        selectedName={selectedName}
        previousClose={previousClose}
      // chartOptions={chartOptions}
      />
      <CardContent className="content">
        <DateToggleButtons
          dateRange={dateRange}
          handleDateClick={handleDateClick}
        />
        {/* <div>
          {chartData &&
            <StockPriceChart
              chartData={chartData}
              chartOptions={chartOptions}
            />
          }
        </div> */}
      </CardContent>
    </Card>
  )
}

export default ChartCard