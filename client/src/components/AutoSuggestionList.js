import React from 'react';

function AutoSuggestionList(props) {
    const suggestionList = props.suggestionList;
    let suggestionItems;

    if(suggestionList) {
        suggestionItems = suggestionList.map((el) => (
            <div key={el.ticker}>
                <h3> Ticker: {el.ticker} </h3>
                <h3> Name: {el.name} </h3>
            </div>
        ));
    }

    return (
        <>
            {suggestionItems}
        </>
    );
}

export default AutoSuggestionList