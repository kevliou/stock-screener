import React, { useState, useEffect, useCallback } from 'react';
import SearchBar from './SearchBar';
import AutoSuggestionList from './AutoSuggestionList';
import {getList, getTickerDict} from '../services/Api';
import { addCompanyName } from '../services/Model';

function SearchWrapper() {
    const [tickerDict, setTickerDict] = useState({});

    useEffect(() => {
        getTickerDict().then(res => 
            setTickerDict(JSON.parse(res)))
    });
    
    const [suggestionList, setList] = useState(
        [{'ticker':'APPL', 'name': 'Apple'}]);

    const updateSuggestions = useCallback((name) => {
        console.log(suggestionList);
        suggestionList[0].name = name;
    });
    
    return (
        <>
        <SearchBar updateSuggestions = {updateSuggestions} />
        <AutoSuggestionList suggestionList={suggestionList} />
        </>
    );
}

export default SearchWrapper