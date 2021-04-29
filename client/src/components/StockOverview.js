import React, { useState, useEffect } from 'react';
import { ApiClient } from '../services/Api';
import AboutCard from './other/AboutCard';
import KeyStatsCard from './other/KeyStatsCard';
import ChartCard from './chart/ChartCard'

function StockOverview(props) {
  const selectedTicker = props.selectedTicker;
  const selectedName = props.selectedName;

  const [companyOverview, setCompanyOverview] = useState('');
  useEffect(() => {
    let isMounted = true;
    async function setOverview() {
      const apiClient = new ApiClient();
      apiClient.getCompanyOverview(selectedTicker)
        .then(res => (isMounted) ? setCompanyOverview(res) : undefined);
    }
    setOverview();

    // Do not fetch suggestion list if component is unmounted
    return function cleanup() {
      isMounted = false;
    }
  }, [selectedTicker]);

  const [quote, setQuote] = useState('');
  useEffect(() => {
    let isMounted = true;

    async function setCompanyQuote() {
      let ticker = selectedTicker;
      const apiClient = new ApiClient();
      apiClient.getQuote(ticker)
        .then(res => (isMounted) ? setQuote(res) : undefined);
    }
    setCompanyQuote();

    // Do not fetch suggestion list if component is unmounted
    return function cleanup() {
      isMounted = false;
    }
  }, [selectedTicker]);

  return (
    <>
      <div>
        {quote !== '' &&
          <ChartCard
            selectedTicker={selectedTicker}
            selectedName={selectedName}
            quote={quote}
          />
        }
      </div>
      <div>
        {companyOverview !== '' &&
          <KeyStatsCard
            companyOverview={companyOverview}
            quote={quote}
          />
        }
      </div>
      <div>
        {companyOverview !== '' && companyOverview.Description !== 'None' &&
          <AboutCard companyOverview={companyOverview} />
        }
      </div>
    </>
  );
}

export default StockOverview