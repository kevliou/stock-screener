import { React, useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import StockOverview from './components/StockOverview';

function App() {
  const [selectedTicker, setSelectedTicker] = useState('');
  function updateSelectedTicker(value) {
    console.log('Selected Ticker: ' + value);
    setSelectedTicker(value);
  }

  return (
    <>
      <section>
        <div className="App">
          <SearchForm
            selectedTicker={selectedTicker}
            updateSelectedTicker={updateSelectedTicker}
          />
        </div>
      </section>
      <section>
        {selectedTicker !== '' &&
          <div>
            <StockOverview
              selectedTicker={selectedTicker}
            />
          </div>
        }
      </section>
    </>
  );
}

export default App;