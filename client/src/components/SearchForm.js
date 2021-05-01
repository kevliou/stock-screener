import React, { useState, useEffect } from 'react';
import SearchBar from './search/SearchBar';
import AutoSuggestion from './search/AutoSuggestion';
import { getFirstAutoSuggestionTicker, getTickerDict } from '../services/Model';

function SearchForm(props) {
  const [tickerDict, setTickerDict] = useState({});
  useEffect(() => {
    async function getDict() {
      setTickerDict(await getTickerDict());
    }

    getDict();
  }, []);

  const selectedTicker = props.selectedTicker;
  const updateSelectedCompany = props.updateSelectedCompany;
  const clearSelectedCompany = props.clearSelectedCompany;

  const [searchValue, setSearchValue] = useState('');
  function updateSearchValue(value) {
    setSearchValue(value);
  }
  function clearSearchValue(value) {
    setSearchValue('');
    clearSelectedCompany();
  }
  function updateTicker(ticker) {
    updateSelectedCompany(ticker, tickerDict[ticker]);
  }

  // Retrieve first auto selection item on pressing enter
  async function handleSearch(value) {
    let firstSuggestion = await getFirstAutoSuggestionTicker(tickerDict, value);
    if (firstSuggestion !== undefined) {
      setSearchValue(firstSuggestion);
      updateSelectedCompany(firstSuggestion, tickerDict[firstSuggestion]);
    }
  }

  let suggestionDropDown;
  // Hide autosuggestion dropdown if search bar is empty
  if (searchValue !== '') {
    // Show searchbar if no company is selected, or selected company does not match search term
    if (selectedTicker === '' || searchValue !== selectedTicker) {
      suggestionDropDown =
        <AutoSuggestion
          tickerDict={tickerDict}
          searchValue={searchValue}
          updateSearchValue={updateSearchValue}
          updateTicker={updateTicker}
        />
    }
  }

  return (
    <>
      <SearchBar
        searchValue={searchValue}
        updateSearchValue={updateSearchValue}
        clearSearchValue={clearSearchValue}
        handleSearch={handleSearch}
      />
      {suggestionDropDown}
    </>
  );
}

export default SearchForm