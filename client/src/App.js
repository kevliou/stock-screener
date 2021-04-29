import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import StockOverview from './components/StockOverview';

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
    <>
      <section>
        <div className="App">
          <SearchForm
            selectedTicker={selectedTicker}
            updateSelectedCompany={updateSelectedCompany}
            clearSelectedCompany={clearSelectedCompany}
          />
        </div>
      </section>
      <section>
        {selectedTicker !== '' &&
          <div>
            <StockOverview
              selectedTicker={selectedTicker}
              selectedName={selectedName}
            />
          </div>
        }
      </section>
    </>
  );
}

export default App;