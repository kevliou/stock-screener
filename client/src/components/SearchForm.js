import { React, useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import AutoSuggestion from './AutoSuggestion';
import { getFirstAutoSuggestionTicker, getTickerDict } from '../services/Model';

function SearchForm(props) {
    const [tickerDict, setTickerDict] = useState({});
    useEffect(() => {
        async function getDict() {
            setTickerDict(await getTickerDict());
        }

        getDict();
    }, []);

    const selectedTicker = props.selectedTicker;
    const updateSelectedTicker = props.updateSelectedTicker;

    const [searchValue, setSearchValue] = useState('');
    function updateSearchValue(value) {
        setSearchValue(value);
    }
    function clearSearchValue(value) {
        setSearchValue('');
        updateSelectedTicker('');
    }
    function updateTicker(value) {
        updateSelectedTicker(value);
    }

    // Retrieve first auto selection item on pressing enter
    async function handleEnter(value) {
        let firstSuggestion = await getFirstAutoSuggestionTicker(tickerDict, value);
        if (firstSuggestion !== undefined) {
            setSearchValue(firstSuggestion);
            updateSelectedTicker(firstSuggestion);
        }
    }

    // Hide autosuggestion dropdown if search bar is empty, or is equal to selected ticker
    let suggestionDropDown;
    if (searchValue !== '' && searchValue !== selectedTicker) {
        suggestionDropDown = 
            <AutoSuggestion 
                tickerDict = {tickerDict}
                searchValue = {searchValue} 
                updateSearchValue = {updateSearchValue}
                updateTicker = {updateTicker}
            />
    }

    return (
        <>
            <SearchBar 
                searchValue = {searchValue}
                updateSearchValue = {updateSearchValue}
                clearSearchValue = {clearSearchValue}
                handleEnter = {handleEnter}
            />
            {suggestionDropDown}
        </>
    );
}

export default SearchForm