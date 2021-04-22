import { React, useState, useEffect } from 'react';
import { ApiClient } from '../services/Api';
import AboutCard from './AboutCard';
import KeyStatsCard from './KeyStatsCard';

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

  return (
    <div>
      {companyOverview !== '' &&
        <KeyStatsCard companyOverview={companyOverview} />
      }
      {companyOverview !== '' && companyOverview.Description !== 'None' &&
        <AboutCard companyOverview={companyOverview} />
      }
    </div>
  );
}

export default StockOverview