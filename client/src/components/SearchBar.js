import { React } from 'react';
import { IconButton, InputAdornment, InputBase, Paper } from '@material-ui/core';
import { Search, Close } from '@material-ui/icons';

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
    <Paper>
      <InputBase
        id="input-with-icon-adornment"
        placeholder="Search for US stocks"
        startAdornment={
          <InputAdornment position="start" aria-label="search">
            <Search />
          </InputAdornment>
        }
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        value={searchValue}
      />
      <IconButton
        position="end"
        size="small"
        aria-label="close"
        onClick={handleCloseClick}
      >
        <Close />
      </IconButton>
    </Paper>
  );
}

export default SearchBar