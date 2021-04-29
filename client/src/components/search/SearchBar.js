import React from 'react';
import { IconButton, InputAdornment, InputBase, Card, CardContent } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';
import './SearchBar.css';

function SearchBar(props) {
  const searchValue = props.searchValue;
  const updateSearchValue = props.updateSearchValue;

  function handleChange(e) {
    updateSearchValue(e.target.value);
  }

  function handleCloseClick(e) {
    props.clearSearchValue();
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      props.handleEnter(e.target.value);
    }
  }

  return (
    <div className="search-card">
      <InputBase
        id="input-with-icon-adornment"
        className="search-bar"
        placeholder="Search for US stocks"
        autoComplete='off'
        // fullWidth={true}
        startAdornment={
          <InputAdornment position="start" aria-label="search">
            <Search />
          </InputAdornment>
        }
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={searchValue}
        endAdornment={
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