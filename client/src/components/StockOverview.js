import React from 'react';
import AboutCard from './other/AboutCard';
import KeyStatsCard from './other/KeyStatsCard';
import ChartCard from './chart/ChartCard';
import './StockOverview.css';

function StockOverview(props) {
  const selectedTicker = props.selectedTicker;
  const selectedName = props.selectedName;

  function formatNumber(value, formatter) {
    if (!isNaN(value)) {
      return formatter.format(value);
    } else {
      return 'N/A';
    }
  }

  return (
    <div className="container">
      <div className="chart-card">
        <ChartCard
          selectedTicker={selectedTicker}
          selectedName={selectedName}
        />
      </div>
      <div className="key-stat-card">
        <KeyStatsCard 
          selectedTicker={selectedTicker}
          formatNumber={formatNumber}
        />
      </div>
      <div className="about-card">
        <AboutCard
          selectedTicker={selectedTicker}
          formatNumber={formatNumber}
        />
      </div>
    </div>
  );
}

export default StockOverview