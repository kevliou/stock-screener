import { parse } from 'date-fns';

class ChartOptions {
  constructor() {
    this.data = [];
    this.unit = '';
    this.displayFormats = {};
    this.lastUpdated = {};
  }
}

class EquityChartData {
  constructor() {
    this.intradayData = [];
    this.dailyData = [];
    this.lastUpdated = '';
  }

  setIntraday(intraday) {
    this.intradayData = parseIntraday(intraday);
    this.lastUpdated = parseLastUpdated(intraday);
  }

  setDaily(daily) {
    this.dailyData = parseDaily(daily);
  }

  getChartOptions(dateRange) {
    const chartOptions = new ChartOptions();

    let dataset;
    if (dateRange === '1D' || dateRange === '5D') {
      dataset = this.intradayData;
    } else {
      dataset = this.dailyData;
    }

    /* JS Date function by default uses the system local time. Assume to be Eastern time.
    *  TO DO: make adjustments to account for local time zones and daylight savings
    */

    let startDate;
    let dateOffset = 0;
    let chartUnit = '';
    let displayFormats = {};

    switch (dateRange) {
      case '1D':
        chartUnit = 'hour';
        displayFormats.hour = 'hh:mm a';
        break;
      case '5D':
        chartUnit = 'day';
        displayFormats.day = 'MMM dd';
        dateOffset = 5 * 60 * 60 * 24 * 1000;
        break;
      case '1M':
        chartUnit = 'day';
        displayFormats.day = 'MMM dd';
        dateOffset = 30 * 60 * 60 * 24 * 1000;
        break;
      case '6M':
        chartUnit = 'month';
        displayFormats.month = 'MMM yyyy';
        dateOffset = 6 * 30 * 60 * 60 * 24 * 1000;
        break;
      case 'YTD':
        chartUnit = 'month';
        displayFormats.month = 'MMM yyyy';
        break;
      case '1Y':
        chartUnit = 'month';
        displayFormats.month = 'MMM yyyy';    
        dateOffset = 365 * 60 * 60 * 24 * 1000;
        break;
      case '5Y':
        chartUnit = 'year';
        displayFormats.month = 'yyyy';
        dateOffset = 5 * 365 * 60 * 60 * 24 * 1000;
        break;
      default:
        console.log('Invalid date range');
    }

    if (dateRange !== 'YTD') {
      startDate = new Date(this.lastUpdated - dateOffset);
    } else {
      startDate = new Date(this.lastUpdated.getFullYear(), 0, 1);
    }

    let endDate = new Date(this.lastUpdated);

    // Adjust time for start and end ranges
    if (dateRange === '1D') {
      startDate.setSeconds(0);
      startDate.setMinutes(0);
      startDate.setHours(9);

      endDate.setSeconds(0);
      endDate.setMinutes(0);
      endDate.setHours(16);
    } else {
      startDate.setSeconds(0);
      startDate.setMinutes(0);
      startDate.setHours(0);
    }

    chartOptions.data = dataset.filter(el =>
      el.x >= startDate && el.x <= endDate);

    chartOptions.unit = chartUnit;
    chartOptions.lastUpdated = this.lastUpdated;

    return chartOptions;
  }
}

function parseIntraday(data) {
  if (data.hasOwnProperty('Time Series (5min)')) {
    const results = [];
    const timeSeriesData = data['Time Series (5min)'];

    for (let key in timeSeriesData) {
      const entry = {
        x: parse(key, 'yyyy-MM-dd HH:mm:ss', new Date()),
        y: timeSeriesData[key]['4. close'],
        volume: timeSeriesData[key]['5. volume']
      }

      results.push(entry);
    }

    return results;

    // Assume data is already sorted
    // return results.sort((a,b) => b.date - a.date);
  } else {
    console.log('Intraday data cannot be parsed. Check data format.')
  }
}

function parseDaily(data) {
  if (data.hasOwnProperty('Time Series (Daily)')) {
    const results = [];
    const timeSeriesData = data['Time Series (Daily)'];

    for (let key in timeSeriesData) {
      const entry = {
        x: parse(key, 'yyyy-MM-dd', new Date()),
        y: timeSeriesData[key]['4. close'],
        volume: timeSeriesData[key]['6. volume']
      }

      results.push(entry);
    }

    return results;

    // Assume data is already sorted    
    // return results.sort((a,b) => b.date - a.date);
  } else {
    console.log('Daily data cannot be parsed. Check data format.')
  }
}

function parseLastUpdated(data) {
  if (data.hasOwnProperty('Meta Data')) {
    let refreshDate = data['Meta Data']['3. Last Refreshed'];
    return (parse(refreshDate, 'yyyy-MM-dd HH:mm:ss', new Date()));
  }
}

export default EquityChartData