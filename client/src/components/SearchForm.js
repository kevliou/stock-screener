import React, { useState, useEffect } from 'react';
import SearchBar from './search/SearchBar';
import AutoSuggestion from './search/AutoSuggestion';
import { ClickAwayListener } from '@material-ui/core';
import { SearchProcessor } from '../services/SearchProcessor';

function SearchForm(props) {
  const updateSelectedCompany = props.updateSelectedCompany;

  const [inputValue, setInputValue] = useState('');
  function updateInputValue(input) {
    setInputValue(input);
  }

  function clearInputValue() {
    setInputValue('');
  }

  const [suggestionList, setSuggestionList] = useState(undefined);
  useEffect(() => {
    if (inputValue !== '') {
      const searchProcessor = new SearchProcessor();
      setSuggestionList(searchProcessor.getSuggestion(inputValue));
    } else {
      const defaultList = [
        {ticker: 'AAPL', name: 'Apple Inc.'},
        {ticker: 'MSFT', name: 'Microsoft Corporation'},
        {ticker: 'GOOGL', name: 'Alphabet Inc. Class A'},
        {ticker: 'FB', name: 'Meta Platforms Inc. Class A'},
        {ticker: 'JPM', name: 'JP Morgan Chase & Co.'}
      ]
      setSuggestionList(defaultList);
    }
  }, [inputValue]);

  function handleSearch(input) {
    if (suggestionList !== undefined) {
      let tickerIndex = 0

      if (input !== undefined) {
        suggestionList.forEach((el, index) => {
          if(el.ticker === input) {
            tickerIndex = index;
          }
        });
      }

      setInputValue(suggestionList[tickerIndex].ticker);
      updateSelectedCompany(suggestionList[tickerIndex].ticker, suggestionList[tickerIndex].name);
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
          inputValue={inputValue}
          updateInputValue={updateInputValue}
          clearInputValue={clearInputValue}
          handleSearch={handleSearch}
          setFocus={setFocus}
        />
        {hasFocus &&
          <AutoSuggestion
            suggestionList={suggestionList}
            handleSearch={handleSearch}
            setFocus={setFocus}
          />
        }
      </div>
    </ClickAwayListener>
  );
}

export default SearchForm