import React from 'react';
import TextField from '@material-ui/core/TextField';

class SearchBar extends React.Component {
    constructor(props){
        super(props);
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.props.updateSuggestions(e.target.value);
    }

    render() {
        return (
            <TextField 
                id="standard-basic"
                label="Test"
                placeholder="Search for US stocks"
                onChange={this.handleChange}
            />
        );
    }
}

export default SearchBar