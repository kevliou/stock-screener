import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import AutoSuggestionList from './AutoSuggestionList';
import { PredictiveSearchAPI } from '../services/Api';
import { getAutoSuggestionList } from '../services/Model';

function SearchWrapper() {
    const [tickerDict, setTickerDict] = useState({});
    
    useEffect(() => {    
        const predictiveSearchAPI = new PredictiveSearchAPI();

        predictiveSearchAPI.getTickerDict().then(res => 
            setTickerDict(JSON.parse(res)))
    }, []);
    
    const [suggestionList, setSuggestionList] = useState(
        [{'ticker':'APPL', 'name': 'Apple'}]);

    const [isInputEmpty, setIsInputEmpty] = useState(true);

    const updateSuggestions = async (searchTerm) => {
        setSuggestionList(await getAutoSuggestionList(tickerDict, searchTerm));
        setIsInputEmpty(searchTerm === '' ? true : false);
    };
    
    let suggestionDropDown;
    if (!isInputEmpty) {
        suggestionDropDown = <AutoSuggestionList suggestionList={suggestionList} />
    }

    return (
        <>
        <SearchBar updateSuggestions = {updateSuggestions} />
        {suggestionDropDown}
        </>
    );
}

export default SearchWrapper