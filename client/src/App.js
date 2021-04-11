import React from 'react';
import './App.css';
import SearchWrapper from './components/SearchWrapper';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <SearchWrapper />
      </div>
    );
  }
}

export default App;
