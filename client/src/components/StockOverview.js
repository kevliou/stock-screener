import { React, useState, useEffect } from 'react';
import { ApiClient } from '../services/Api';
import AboutCard from './AboutCard';
import KeyStatsCard from './KeyStatsCard';
import StockPriceChart from './StockPriceChart';

function StockOverview(props) {
  const ticker = props.selectedTicker;

  const [companyOverview, setCompanyOverview] = useState('');
  useEffect(() => {
    async function setOverview() {
      if (ticker !== '') {
        const apiClient = new ApiClient();
        setCompanyOverview(await apiClient.getCompanyOverview(ticker));
      } else {
        setCompanyOverview('');
      }
    }
    setOverview();
  }, [ticker]);

  const [quote, setQuote] = useState('');
  useEffect(() => {
    async function setCompanyQuote() {
      if (ticker !== '') {
        const apiClient = new ApiClient();
        setQuote(await apiClient.getQuote(ticker));
      } else {
        setQuote('');
      }
    }
    setCompanyQuote();
  }, [ticker]);

  const[intraday, setIntraday] = useState('');
  useEffect(() => {
    async function setIntradayData() {
      if (ticker !== '') {
        const apiClient = new ApiClient();
        setIntraday(await apiClient.getIntraday(ticker));
      } else {
        setIntraday('');
      }
    }
    setIntradayData();
  }, [ticker]);

  return (
    <>
      <div>
        {intraday !== '' &&
          <StockPriceChart 
            intraday = {intraday}
          />
        }
      </div>
      <div>
        {companyOverview !== '' &&
          <KeyStatsCard 
            companyOverview = {companyOverview}
            quote = {quote}
          />
        }
      </div>
      <div>
        {companyOverview !== '' && companyOverview.Description !== 'None' &&
          <AboutCard companyOverview = {companyOverview} />
        }
      </div>
    </>
  );
}

export default StockOverview