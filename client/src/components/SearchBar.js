import React from 'react';
import TextField from '@material-ui/core/TextField';

const SearchBar = ((keyboard) => {
    return (
        <TextField 
            id="standard-basic"
            label="Test"
            placeholder="Search for stocks listed on NYSE, NASDAQ, and AMEX"
        />
    );
});

export default SearchBar