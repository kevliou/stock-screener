import { parse } from 'date-fns';

class EquityChartData {
  constructor(data) {
    console.log(data);
    this.chartData = parseTimeSeries(data);
  }
  getChartData() {
    return this.chartData;
  }
}

function parseTimeSeries(data) {
  const results = [];

  if (data.hasOwnProperty('Time Series (5min)')) {
    const timeSeriesData = data['Time Series (5min)'];

    for (let key in timeSeriesData) {
      const entry = {
        x: parse(key,'yyyy-MM-dd HH:mm:ss', new Date()),
        y: timeSeriesData[key]['4. close'],
        volume: timeSeriesData[key]['5. volume']
      }

      results.push(entry);
    }
    
    return results.sort((a,b) => b.date - a.date);

  } else if(data.hasOwnProperty('Time Series (Daily)')) {
    const timeSeriesData = data['Time Series (5min)'];

    for (let key in timeSeriesData) {
      const entry = {
        x: parse(key,'yyyy-MM-dd', new Date()),
        y: timeSeriesData[key]['4. close'],
        volume: timeSeriesData[key]['6. volume']
      }

      results.push(entry);
    }
    
    return results.sort((a,b) => b.date - a.date);

  } else {
    console.log('Time series data cannot be parsed. Check data format.')
  }
}

export default EquityChartData