import { parse } from "date-fns";

export const chartDataFormatter = {
  parse1D,
  parse5D,
  parse1M,
  parse6M,
  parseYTD,
  parse1Y,
  parse5Y
}

    /* JS Date function by default uses the system local time. Assume to be Eastern time.
    *  TO DO: make adjustments to account for local time zones and daylight savings
    */

function parse1D(data) { 
  function parseDate(el) {
    let dateString = `${el.date} ${el.minute}`;
    return parse(dateString, 'yyyy-MM-dd HH:mm', new Date());
  }
  
  const results = [];
  data.forEach(el => {
    // Skip null entries
    if (el.close !== null) {
      const entry = {
        x: parseDate(el),
        y: el.close,
        volume: el.volume
      }
      
      results.push(entry);
    }
  });
  
  // Sort result by date
  results.sort((a,b) => a.x - b.x);

  return results;
}

function parse5D(data) {
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
      // Check if time is between 9:30am to 4pm ET
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
  
  // Sort result by date
  results.sort((a,b) => a.x - b.x);

  return results;
}

function parse1M(data) {
  const endDate = new Date();
  const startDate = new Date(endDate - 30 * 60 * 60 * 24 * 1000);

  let results = parseDailyData(data, startDate, endDate)
  
  // Sort result by date
  results.sort((a, b) => a.x - b.x);

  return results;
}

function parse6M(data) {
  const endDate = new Date();
  const startDate = new Date(endDate - 6 * 30 * 60 * 60 * 24 * 1000);
  
  let results = parseDailyData(data, startDate, endDate)
  
  // Sort result by date
  results.sort((a, b) => a.x - b.x);

  return results;
}

function parseYTD(data) {
  const endDate = new Date();
  const startDate = new Date(endDate.getFullYear(),0,1);
  
  let results = parseDailyData(data, startDate, endDate)
  
  // Sort result by date
  results.sort((a, b) => a.x - b.x);

  return results;
}

function parse1Y(data) {
  const endDate = new Date();
  const startDate = new Date(endDate - 365 * 60 * 60 * 24 * 1000);

  let results = parseDailyData(data, startDate, endDate)
  
  // Sort result by date
  results.sort((a, b) => a.x - b.x);

  return results;
}

function parse5Y(data) {
  const refreshDate = data['Meta Data']['3. Last Refreshed'];
  const endDate = parse(refreshDate, 'yyyy-MM-dd', new Date());
  const dateOffset = 5 * 365 * 60 * 60 * 24 * 1000;

  const startDate = new Date(endDate - dateOffset);
  
  const results = [];
  const timeSeriesData = data['Weekly Time Series'];

  for (let key in timeSeriesData) {
    const currentDate = parse(key, 'yyyy-MM-dd', new Date());

    if (currentDate >= startDate && currentDate <= endDate) {
      const entry = {
        x: currentDate,
        y: timeSeriesData[key]['4. close'],
        volume: timeSeriesData[key]['5. volume']
      }

      results.push(entry);
    }
  }

  // Sort result by date
  results.sort((a, b) => a.x - b.x);
  return results;
}

function parseDailyData(data, startDate, endDate) {
  const results = [];
  
  data.forEach(el => {
    const currentDate = new Date(el.t);

    if (currentDate >= startDate && currentDate <= endDate) {
      const entry = {
        x: currentDate,
        y: el.c,
        volume: el.v
      }
  
      results.push(entry);
    }
  });

  return results;
}