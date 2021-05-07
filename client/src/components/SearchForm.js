import React, { useState, useEffect } from 'react';
import SearchBar from './search/SearchBar';
import AutoSuggestion from './search/AutoSuggestion';
import { ApiClient } from '../services/Api';
import { ClickAwayListener } from '@material-ui/core';

function SearchForm(props) {
  const updateSelectedCompany = props.updateSelectedCompany;
  const clearSelectedCompany = props.clearSelectedCompany;
  const apiClient = new ApiClient();

  const [tickerDict, setTickerDict] = useState(() => {
    async function getDict() {
      await apiClient.getTickerDict()
        .then(res => setTickerDict(JSON.parse(res)))
    }

    getDict();
  });

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
      const apiClient = new ApiClient();
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

    if (searchValue !== ''){
      getList();
    }

    // Do not fetch suggestion list if component is unmounted
    return function cleanup() {
      isMounted = false;
    }
  }, [searchValue, tickerDict]);

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

  const [hasFocus, setHasFocus] = useState(false);
  function setFocus(isFocused) {
    setHasFocus(isFocused);
  }
  
  function handleClickAway() {
    setFocus(false);
  }

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div>
        <SearchBar
          searchValue={searchValue}
          updateSearchValue={updateSearchValue}
          clearSearchValue={clearSearchValue}
          handleSearch={handleSearch}
          setFocus={setFocus}
        />
        {hasFocus &&
          <AutoSuggestion
            suggestionList={suggestionList}
            updateSearchValue={updateSearchValue}
            updateTicker={updateTicker}
            setFocus={setFocus}
          />
        }
      </div>
    </ClickAwayListener>
  );
}

export default SearchForm