import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import SearchForm from './SearchForm';
import StockOverview from './StockOverview';
import Footer from './Footer';
import './LandingPage.css';

function LandingPage(props) {
  const [selectedTicker, setSelectedTicker] = useState('');
  const [selectedName, setSelectedName] = useState('');

  function updateSelectedCompany(symbol, companyName) {
    console.log('Selected Ticker: ' + symbol);
    setSelectedTicker(symbol);
    setSelectedName(companyName);
  }

  function clearSelectedCompany() {
    setSelectedTicker('');
    setSelectedName('');
  }

  return (
    <div className="app">
      <Container className="body" maxWidth="md">
        <div className="search">
          <section>
            <SearchForm
              selectedTicker={selectedTicker}
              updateSelectedCompany={updateSelectedCompany}
              clearSelectedCompany={clearSelectedCompany}
            />
          </section>
        </div>
        <div className="stock-card">
          <section >
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