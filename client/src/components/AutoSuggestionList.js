import React from 'react';
import {List, ListItem, ListItemText, Divider} from '@material-ui/core/index';

function AutoSuggestionList(props) {
    const suggestionList = props.suggestionList;
    let suggestionItems;

    // Render list items
    if(suggestionList !== undefined && suggestionList !== '') {
        suggestionItems = suggestionList.map((el) => (
            <div key={el.ticker}>
                <ListItem button>
                    <ListItemText primary={el.name} secondary={"Ticker: " + el.ticker} />            
                </ListItem>
                <Divider />
            </div>
        ));
    } else if(suggestionList === undefined) {
        suggestionItems =
            <ListItem button>
                <ListItemText primary="No matches..." />
            </ListItem>
    }

    return (
        <List>
            {suggestionItems}
        </List>
    );
}

export default AutoSuggestionList