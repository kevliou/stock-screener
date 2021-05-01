import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';

function AutoSuggestion(props) {
  const suggestionList = props.suggestionList;
  const updateSearchValue = props.updateSearchValue;
  const updateTicker = props.updateTicker;

  function handleClick(ticker) {
    updateSearchValue(ticker);
    updateTicker(ticker);
  }

  // Render list items
  let suggestionItems;
  if (suggestionList !== undefined) {
    suggestionItems = suggestionList.map((el) => {
      return (
        <div key={el.ticker}>
          <ListItem
            button
            divider
            onClick={() => handleClick(el.ticker)}
          >
            <ListItemText
              primary={el.name}
              secondary={"Ticker: " + el.ticker}
            />
          </ListItem>
        </div>
      );
    });
  } else {
    suggestionItems =
      <ListItem button divider>
        <ListItemText primary="No matches..." />
      </ListItem>
  }

  return (
    <List>
      {suggestionItems}
    </List>
  );
}

export default AutoSuggestion