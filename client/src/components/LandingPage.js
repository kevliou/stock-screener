import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import SearchForm from './SearchForm';
import StockOverview from './StockOverview';
import Footer from './Footer';
import './LandingPage.css';
import LoadingBar from './loading/LoadingBar';

function LandingPage(props) {
  const [selectedTicker, setSelectedTicker] = useState('');
  const [selectedName, setSelectedName] = useState('');

  function updateSelectedCompany(symbol, companyName) {
    console.log('Selected Ticker: ' + symbol);
    setSelectedTicker(symbol);
    setSelectedName(companyName);
  }

  return (
    <div className="app">
      <Container maxWidth="md">
        <div className="search">
          <section>
            <SearchForm
              selectedTicker={selectedTicker}
              updateSelectedCompany={updateSelectedCompany}
            />
          </section>
        </div>
        {/* <LoadingBar /> */}
        <div className="stock-card">
          <section>
            {selectedTicker &&
              <StockOverview
                selectedTicker={selectedTicker}
                selectedName={selectedName}
              />
            }
          </section>
        </div>
      </Container>
      <Footer className="footer" />
    </div>
  );
}

export default LandingPage