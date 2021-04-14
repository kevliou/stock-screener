import React from 'react';
import {TextField} from '@material-ui/core/index';

class SearchBar extends React.Component {

    handleChange = (e) => {
        this.props.updateSuggestions(e.target.value);
    }

    render() {
        return (
            <TextField 
                id="standard-basic"
                placeholder="Search for US stocks"
                onChange={this.handleChange}
                variant="outlined"
                fullWidth
            />
        );
    }
}

export default SearchBar