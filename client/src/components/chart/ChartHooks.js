import { useState, useEffect } from 'react';
import { chartDataFormatter } from '../../services/ChartDataFormatter';
import { useApi } from '../ApiHook';

export function useChartData(dateRange, ticker) {
  const [apiData1D, loading1D, error1D] = useApi('/getIntradayQuotes', ticker);
  const [apiData5D, loading5D, error5D] = useApi('/getFiveDayQuotes', ticker);
  const [apiData1Y, loading1Y, error1Y] = useApi('/getAnnualQuotes', ticker);
  const [apiData5Y, loading5Y, error5Y] = useApi('/getFiveYearQuotes', ticker);
  
  const [chartData1D, setChartData1D] = useState(undefined);
  useEffect(() => {
    if (apiData1D !== undefined) {
      setChartData1D(chartDataFormatter.parse1D(apiData1D));
    } else {
      setChartData1D(undefined);
    }
  }, [apiData1D])

  const [chartData5D, setChartData5D] = useState(undefined);
  useEffect(() => {
    if (apiData5D !== undefined) {
      setChartData5D(chartDataFormatter.parse5D(apiData5D));
    } else {
      setChartData5D(undefined);
    }
  }, [apiData5D])

  const [chartData1M, setChartData1M] = useState(undefined);
  const [chartData6M, setChartData6M] = useState(undefined);
  const [chartDataYTD, setChartDataYTD] = useState(undefined);
  const [chartData1Y, setChartData1Y] = useState(undefined);
  useEffect(() => {
    if (apiData1Y !== undefined) {
      const timeSeriesData = apiData1Y.results;

      setChartData1M(chartDataFormatter.parse1M(timeSeriesData));
      setChartData6M(chartDataFormatter.parse6M(timeSeriesData));
      setChartDataYTD(chartDataFormatter.parseYTD(timeSeriesData));
      setChartData1Y(chartDataFormatter.parse1Y(timeSeriesData));
    } else {
      setChartData1M(undefined);
      setChartData6M(undefined);
      setChartDataYTD(undefined);
      setChartData1Y(undefined);
    }
  }, [apiData1Y])

  const [chartData5Y, setChartData5Y] = useState(undefined);
  useEffect(() => {
    if (apiData5Y !== undefined) {
      setChartData5Y(chartDataFormatter.parse5Y(apiData5Y));
    } else {
      setChartData5Y(undefined);
    }
  }, [apiData5Y])

  switch (dateRange) {
    case '1D':
      return [chartData1D, loading1D, error1D];
    case '5D':
      return [chartData5D, loading5D, error5D];
    case '1M':
      return [chartData1M, loading5D, error5D];
    case '6M':
      return [chartData6M, loading1Y, error1Y];
    case 'YTD':
      return [chartDataYTD, loading1Y, error1Y];
    case '1Y':
      return [chartData1Y, loading1Y, error1Y];
    case '5Y':
      return [chartData5Y, loading5Y, error5Y];
    default:
      return console.log('Uncaught date range');
  }
}