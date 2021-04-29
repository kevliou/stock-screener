import React, { useState } from 'react';
import { Container } from '@material-ui/core';
import SearchForm from './components/SearchForm';
import StockOverview from './components/StockOverview';
import './App.css';

function App() {
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
    <Container className="container" maxWidth="md">
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
  );
}

export default App;