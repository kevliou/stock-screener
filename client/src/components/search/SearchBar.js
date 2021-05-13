import React from 'react';
import { IconButton, InputBase } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import './SearchBar.css';

function SearchBar(props) {
  const inputValue = props.inputValue;
  const updateInputValue = props.updateInputValue;
  const clearInputValue = props.clearInputValue;
  const handleSearch = props.handleSearch;
  const setFocus = props.setFocus;

  function handleChange(e) {
    updateInputValue(e.target.value);
  }

  function handleCloseClick() {
    clearInputValue();
    setFocus(false);
  }

  function handleEnterKey(e) {
    if (e.key === "Enter") {
      handleSearch(inputValue);
      setFocus(false);
    }
  }

  function handleSearchIcon() {
    props.handleSearch(inputValue);
    setFocus(false);
  }

  function handleOnFocus(e) {
    e.target.select();
    setFocus(true);
  }

  return (
    <div className="search-card">
      <InputBase
        id="input-with-icon-adornment"
        className="search-bar"
        placeholder="Search for US exchange-listed companies"
        autoComplete='off'
        onChange={handleChange}
        onKeyDown={handleEnterKey}
        onFocus={handleOnFocus}
        value={inputValue}
        startAdornment={
          <IconButton
            position="start"
            className="search-button"
            size="small"
            aria-label="search"
            onClick={handleSearchIcon}
          >
            <Search />
          </IconButton>
        }
        endAdornment={inputValue !== "" &&
          <IconButton
            position="end"
            size="small"
            aria-label="close"
            onClick={handleCloseClick}
          >
            <Close />
          </IconButton>
        }
      />
    </div>
  );
}

export default SearchBar