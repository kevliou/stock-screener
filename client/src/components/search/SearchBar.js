import React from 'react';
import { IconButton, InputBase } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import './SearchBar.css';

function SearchBar(props) {
  const searchValue = props.searchValue;
  const updateSearchValue = props.updateSearchValue;

  function handleChange(e) {
    updateSearchValue(e.target.value);
  }

  function handleCloseClick() {
    props.clearSearchValue();
  }

  function handleEnterKey(e) {
    if (e.key === "Enter") {
      props.handleSearch(searchValue);
    }
  }

  function handleSearchIcon() {
    props.handleSearch(searchValue);
  }

  function handleFocus(e) {
    e.target.select();
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
        onFocus={handleFocus}
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