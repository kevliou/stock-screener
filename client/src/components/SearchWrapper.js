import React from 'react';
import SearchBar from './SearchBar';
import AutoSuggestionList from './AutoSuggestionList';

const SearchWrapper = (props) => {
    const suggestionList = [
        {"ticker": "AAPL", "name": "Apple Inc"},
        {"ticker": "MSFT", "name": "Microsoft Corporation"},
    ]

    return (
        <>
        <SearchBar />
        <AutoSuggestionList suggestionList={suggestionList} />
        </>
    );
};

export default SearchWrapper