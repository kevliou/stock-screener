import { React, useState, useEffect } from 'react';
import { ApiClient } from '../services/Api';
import AboutCard from './other/AboutCard';
import KeyStatsCard from './other/KeyStatsCard';
import StockPriceChart from './chart/StockPriceChart';

function StockOverview(props) {
  const selectedCompany = props.selectedCompany;

  const [companyOverview, setCompanyOverview] = useState('');
  useEffect(() => {
    let isMounted = true;
    async function setOverview() {
      let ticker = selectedCompany.ticker;
      const apiClient = new ApiClient();
      apiClient.getCompanyOverview(ticker)
        .then(res => (isMounted) ? setCompanyOverview(res) : undefined);
    }
    setOverview();

    // Do not fetch suggestion list if component is unmounted
    return function cleanup(){
      isMounted = false;
    }
  }, [selectedCompany]);

  const [quote, setQuote] = useState('');
  useEffect(() => {
    let isMounted = true;

    async function setCompanyQuote() {
      let ticker = selectedCompany.ticker;
      const apiClient = new ApiClient();
      apiClient.getQuote(ticker)
        .then(res => (isMounted) ? setQuote(res) : undefined);
    }
    setCompanyQuote();

    // Do not fetch suggestion list if component is unmounted
    return function cleanup(){
      isMounted = false;
    }
  }, [selectedCompany]);

  const[intraday, setIntraday] = useState('');
  useEffect(() => {
    let isMounted = true;

    async function setIntradayData() {
      let ticker = selectedCompany.ticker;
      const apiClient = new ApiClient();
      apiClient.getIntraday(ticker)
        .then(res => (isMounted) ? setIntraday(res) : undefined);
    }
    setIntradayData();

    // Do not fetch suggestion list if component is unmounted
    return function cleanup(){
      isMounted = false;
    }
  }, [selectedCompany]);

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