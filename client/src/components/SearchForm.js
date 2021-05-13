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
    const searchProcessor = new SearchProcessor();
    setSuggestionList(searchProcessor.getSuggestion(inputValue));
  }, [inputValue]);

  function handleSearch(input) {
    const searchProcessor = new SearchProcessor();
    const searchResult = searchProcessor.getFirstSuggestion(input);

    if (searchResult !== undefined) {
      setInputValue(searchResult.ticker);
      updateSelectedCompany(searchResult.ticker, searchResult.name);
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