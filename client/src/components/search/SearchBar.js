import React from 'react';
import { IconButton, InputBase } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import './SearchBar.css';

function SearchBar(props) {
  const searchValue = props.searchValue;
  const updateSearchValue = props.updateSearchValue;
  const clearSearchValue = props.clearSearchValue;
  const handleSearch = props.handleSearch;
  const setFocus = props.setFocus;

  function handleChange(e) {
    updateSearchValue(e.target.value);
  }

  function handleCloseClick() {
    clearSearchValue();
    setFocus(false);
  }

  function handleEnterKey(e) {
    if (e.key === "Enter") {
      handleSearch(searchValue);
      setFocus(false);
    }
  }

  function handleSearchIcon() {
    props.handleSearch(searchValue);
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
        placeholder="Search for US stocks"
        autoComplete='off'
        onChange={handleChange}
        onKeyDown={handleEnterKey}
        onFocus={handleOnFocus}
        value={searchValue}
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
        endAdornment={searchValue !== "" &&
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