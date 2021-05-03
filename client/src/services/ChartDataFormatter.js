import { parse } from "date-fns";

export function parseChartData1D(data) { 
  let refreshDate = data['Meta Data']['3. Last Refreshed'];
  let endDate = parse(refreshDate, 'yyyy-MM-dd HH:mm:ss', new Date());
  endDate.setMinutes(0);
  endDate.setHours(16);

  let startDate = new Date(endDate);
  startDate.setMinutes(30);
  startDate.setHours(9);

  const results = [];
  const timeSeriesData = data['Time Series (1min)'];
  
  for (let key in timeSeriesData) {
    const currentDate = parse(key, 'yyyy-MM-dd HH:mm:ss', new Date());

    if (currentDate >= startDate && currentDate <= endDate) {
      const entry = {
        x: currentDate,
        y: timeSeriesData[key]['4. close'],
        volume: timeSeriesData[key]['5. volume']
      }
  
      results.push(entry);
    }
  }

  return results;
}

export function parseChartData5D(data) {
  let refreshDate = data['Meta Data']['3. Last Refreshed'];
  let endDate = parse(refreshDate, 'yyyy-MM-dd HH:mm:ss', new Date());
  endDate.setMinutes(0);
  endDate.setHours(16);

  const dateOffset = 7 * 60 * 60 * 24 * 1000;

  let startDate = new Date(endDate - dateOffset);
  startDate.setMinutes(30);
  startDate.setHours(9);

  const results = [];
  const timeSeriesData = data['Time Series (30min)'];

  for (let key in timeSeriesData) {
    const currentDate = parse(key, 'yyyy-MM-dd HH:mm:ss', new Date());

    if (currentDate >= startDate && currentDate <= endDate) {
      // Check if time is within 9:30am to 4pm ET
      let startTime = new Date(currentDate);
      startTime.setMinutes(30);
      startTime.setHours(9);

      let endTime = new Date(currentDate);
      endTime.setMinutes(0);
      endTime.setHours(16);

      if (currentDate >= startTime && currentDate <= endTime) {
        const entry = {
          x: currentDate,
          y: timeSeriesData[key]['4. close'],
          volume: timeSeriesData[key]['5. volume']
        }
    
        results.push(entry);
      }
    }
  }
  
  return results;
}

export function parseChartData1M(data) {
  let refreshDate = data['Meta Data']['3. Last Refreshed'];
  let endDate = parse(refreshDate, 'yyyy-MM-dd', new Date());
  const dateOffset = 30 * 60 * 60 * 24 * 1000;

  let startDate = new Date(endDate - dateOffset);

  return parseDailyData(data, startDate, endDate);
}

export function parseChartData6M(data) {
  let refreshDate = data['Meta Data']['3. Last Refreshed'];
  let endDate = parse(refreshDate, 'yyyy-MM-dd', new Date());
  const dateOffset = 6*30 * 60 * 60 * 24 * 1000;

  let startDate = new Date(endDate - dateOffset);

  return parseDailyData(data, startDate, endDate);
}

export function parseChartDataYTD(data) {
  let refreshDate = data['Meta Data']['3. Last Refreshed'];
  let endDate = parse(refreshDate, 'yyyy-MM-dd', new Date());
  let startDate = new Date(endDate.getFullYear(),0,1);

  return parseDailyData(data, startDate, endDate);
}

export function parseChartData1Y(data) {
  let refreshDate = data['Meta Data']['3. Last Refreshed'];
  let endDate = parse(refreshDate, 'yyyy-MM-dd', new Date());
  const dateOffset = 365 * 60 * 60 * 24 * 1000;

  let startDate = new Date(endDate - dateOffset);

  return parseDailyData(data, startDate, endDate);
}

export function parseChartData5Y(data) {
  let refreshDate = data['Meta Data']['3. Last Refreshed'];
  let endDate = parse(refreshDate, 'yyyy-MM-dd', new Date());
  const dateOffset = 4 * 365 * 60 * 60 * 24 * 1000;

  let startDate = new Date(endDate - dateOffset);

  return parseDailyData(data, startDate, endDate);
}

function parseDailyData(data, startDate, endDate) {
  const results = [];
  const timeSeriesData = data['Time Series (Daily)'];

  for (let key in timeSeriesData) {
    const currentDate = parse(key, 'yyyy-MM-dd', new Date());

    if (currentDate >= startDate && currentDate <= endDate) {
      const entry = {
        x: currentDate,
        y: timeSeriesData[key]['4. close'],
        volume: timeSeriesData[key]['6. volume']
      }

      results.push(entry);
    }
  }

  return results;
}