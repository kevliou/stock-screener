import React, { useState, useEffect } from 'react';
import SearchBar from './search/SearchBar';
import AutoSuggestion from './search/AutoSuggestion';
import { ApiClient } from '../services/Api';

function SearchForm(props) {
  const selectedTicker = props.selectedTicker;
  const updateSelectedCompany = props.updateSelectedCompany;
  const clearSelectedCompany = props.clearSelectedCompany;
  const apiClient = new ApiClient();

  const [tickerDict, setTickerDict] = useState(undefined);
  useEffect(() => {
    async function getDict() {
      await apiClient.getTickerDict()
        .then(res => setTickerDict(JSON.parse(res)))
    }

    getDict();
  }, []);

  const [searchValue, setSearchValue] = useState('');
  function updateSearchValue(value) {
    setSearchValue(value);
  }

  function clearSearchValue() {
    setSearchValue('');
    clearSelectedCompany();
  }

  function updateTicker(ticker) {
    updateSelectedCompany(ticker, tickerDict[ticker]);
  }

  const [suggestionList, setSuggestionList] = useState(undefined);
  useEffect(() => {
    async function getSuggestionList(searchTerm) {
      const suggestions = await apiClient.getSuggestion(searchTerm);
      const result = [];
  
      if (suggestions !== undefined && suggestions !== '') {
        suggestions.forEach(el => {
          const item = {
            'ticker': el,
            'name': tickerDict[el],
          }
          result.push(item);
        });
      } else {
        return
      }
  
      return result;
    }

    let isMounted = true;
    async function getList() {
      await getSuggestionList(searchValue)
        .then(res => (isMounted) ? setSuggestionList(res) : undefined);
    }

    getList();

    // Do not fetch suggestion list if component is unmounted
    return function cleanup() {
      isMounted = false;
    }
  }, [searchValue]);

  // Retrieve first auto selection item on pressing enter/ search icon press
  async function handleSearch(value) {
    const firstSuggestion = await getFirstSuggestionTicker(value);

    if (firstSuggestion !== undefined) {
      setSearchValue(firstSuggestion);
      updateSelectedCompany(firstSuggestion, tickerDict[firstSuggestion]);
    }
  }

  async function getFirstSuggestionTicker(searchTerm) {
    const suggestions = await apiClient.getSuggestion(searchTerm);

    if (suggestions !== undefined && suggestions !== '') {
      return suggestions[0];
    }
  }

  let suggestionDropDown;
  // Hide autosuggestion dropdown if search bar is empty
  if (searchValue !== '') {
    // Show searchbar if no company is selected, or selected company does not match search term
    if (selectedTicker === '' || searchValue !== selectedTicker) {
      suggestionDropDown =
        <AutoSuggestion
          suggestionList={suggestionList}
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