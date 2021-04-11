import React from 'react';
import SearchBar from './SearchBar';
import AutoSuggestionList from './AutoSuggestionList';
import axios from 'axios';

class SearchWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {suggestionList: props.suggestionList};
    }

    callAPI() {
        axios.get('http://localhost:5000/api/getList')
            .then( res => 
                this.setState({ suggestionList: res.data}));
    }
    
    componentDidMount() {
        this.callAPI();
    }

    render () {
        return (
            <>
            <SearchBar />
            <AutoSuggestionList suggestionList={this.state.suggestionList} />
            </>
        );
    }
}

export default SearchWrapper