import React from 'react';
import { Paper, List, ListItem, ListItemText } from '@material-ui/core';
import './AutoSuggestion.css';

function AutoSuggestion(props) {
  const suggestionList = props.suggestionList;
  const updateSearchValue = props.updateSearchValue;
  const updateTicker = props.updateTicker;
  const setFocus = props.setFocus;

  function handleClick(ticker) {
    updateSearchValue(ticker);
    updateTicker(ticker);
    setFocus(false);
  }


  // Render list items
  let suggestionItems;
  if (suggestionList !== undefined) {
    const lastItem = suggestionList.length;

    suggestionItems = suggestionList.map((el, index) => {
      return (
        <div key={el.ticker}>
          <ListItem
            button
            divider={index !== lastItem - 1}
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
      <ListItem button >
        <ListItemText primary="No matches..." />
      </ListItem>
  }

  return (
    <Paper elevation={5} className="result-box">
      <List>
        {suggestionItems}
      </List>
    </Paper>
  );
}

export default AutoSuggestion