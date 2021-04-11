import React from 'react';
import TextField from '@material-ui/core/TextField';

class SearchBar extends React.Component {
    render() {
        return (
            <TextField 
                id="standard-basic"
                label="Test"
                placeholder="Search for US stocks"
            />
        );
    }
}

export default SearchBar