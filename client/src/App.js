import { React, useState } from 'react';
import './App.css';
import SearchForm from './components/SearchForm';
import StockOverview from './components/StockOverview';

function App () {
  const [selectedTicker, setSelectedTicker] = useState('');
  function updateSelectedTicker(value) {
    console.log('Selected Ticker: ' + value);
    setSelectedTicker(value);
  }

  return (
      <div className="App">
        <SearchForm 
          selectedTicker = {selectedTicker}
          updateSelectedTicker = {updateSelectedTicker}
        />
      </div>
  );
}

export default App;