import React, { useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import StockOverview from './components/StockOverview';

function App() {
  const [selectedCompany, setSelectedCompany] = useState(null);
  function updateSelectedCompany(symbol, companyName) {
    console.log('Selected Ticker: ' + symbol);
    setSelectedCompany({
      ticker: symbol,
      name: companyName
    });
  }
  function clearSelectedCompany() {
    setSelectedCompany(null);
  }

  return (
    <>
      <section>
        <div className="App">
          <SearchForm
            selectedCompany = {selectedCompany}
            updateSelectedCompany = {updateSelectedCompany}
            clearSelectedCompany = {clearSelectedCompany}
          />
        </div>
      </section>
      <section>
        {selectedCompany !== null &&
          <div>
            <StockOverview
              selectedCompany={selectedCompany}
            />
          </div>
        }
      </section>
    </>
  );
}

export default App;