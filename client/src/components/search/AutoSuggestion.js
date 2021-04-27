import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { getAutoSuggestionList } from '../../services/Model';

function AutoSuggestion(props) {
  const tickerDict = props.tickerDict;
  const searchValue = props.searchValue;

  const [suggestionList, setSuggestionList] = useState([]);
  useEffect(() => {
    let isMounted = true;
    async function getList() {
      getAutoSuggestionList(tickerDict, searchValue)
        .then(res => (isMounted) ? setSuggestionList(res) : undefined);
    }

    getList();

    // Do not fetch suggestion list if component is unmounted
    return function cleanup() {
      isMounted = false;
    }
  }, [tickerDict, searchValue]);

  function handleClick(ticker) {
    props.updateSearchValue(ticker);
    props.updateTicker(ticker);
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