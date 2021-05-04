import { useState, useEffect } from 'react';
import { ApiClient } from '../../services/Api';
import { chartDataFormatter } from '../../services/ChartDataFormatter';

export function useChartData(dateRange, ticker) {
  const [chartData1D, setChartData1D] = useState(undefined);
  const [chartData5D, setChartData5D] = useState(undefined);
  const [chartData1M, setChartData1M] = useState(undefined);
  const [chartData6M, setChartData6M] = useState(undefined);
  const [chartDataYTD, setChartDataYTD] = useState(undefined);
  const [chartData1Y, setChartData1Y] = useState(undefined);
  const [chartData5Y, setChartData5Y] = useState(undefined);

  useEffect(() => {
    let isMounted = true;

    if (ticker !== '') {
      const apiClient = new ApiClient();
      // Clear current data
      setChartData1D(undefined);
      setChartData5D(undefined);
      setChartData1M(undefined);
      setChartData6M(undefined);
      setChartDataYTD(undefined);
      setChartData1Y(undefined);
      setChartData5Y(undefined);

      // API calls
      apiClient.getIntradayQuotes(ticker)
        .then(res => {
          if (isMounted) {
            setChartData1D(chartDataFormatter.parse1D(res));
          }
        })
        .catch(err => console.log('Intraday quote fetch failed: ' + err));

      apiClient.getFiveDayQuotes(ticker)
        .then(res => (isMounted)
          ? setChartData5D(chartDataFormatter.parse5D(res))
          : undefined
        )
        .catch(err => console.log('Five day quote fetch failed: ' + err));

      apiClient.getAnnualQuotes(ticker)
        .then(res => (isMounted)
          ? setChartData5D(setAnnualData(res))
          : undefined
        )
        .catch(err => console.log('Annual data fetch failed: ' + err));

      apiClient.getFiveYearQuotes(ticker)
        .then(res => (isMounted)
          ? setChartData5Y(chartDataFormatter.parse5Y(res))
          : undefined
        )
        .catch(err => console.log('Five year quote fetch failed: ' + err));

      function setAnnualData(apiData) {
        const timeSeriesData = apiData.results;

        setChartData1M(chartDataFormatter.parse1M(timeSeriesData))
        setChartData6M(chartDataFormatter.parse6M(timeSeriesData))
        setChartDataYTD(chartDataFormatter.parseYTD(timeSeriesData))
        setChartData1Y(chartDataFormatter.parse1Y(timeSeriesData))
      }
    }

    // Do not fetch suggestion list if component is unmounted
    return function cleanup() {
      isMounted = false;
    }
  }, [ticker]);

  switch (dateRange) {
    case '1D':
      return chartData1D;
    case '5D':
      return chartData5D;
    case '1M':
      return chartData1M;
    case '6M':
      return chartData6M;
    case 'YTD':
      return chartDataYTD;
    case '1Y':
      return chartData1Y;
    case '5Y':
      return chartData5Y;
    default:
      return console.log('Uncaught date range');
  }
}