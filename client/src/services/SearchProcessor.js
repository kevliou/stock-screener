export class SearchProcessor {
  constructor() {
    this.tickerLookup = require('../data/ticker-dictionary.json');
    this.suggestions = require('../data/autocomplete-suggestions.json');
  }

  getSuggestion(searchTerm) {
    const formattedSearch = this.formatSearch(searchTerm);
    const suggestionList = this.suggestions[formattedSearch];

    if (suggestionList !== undefined) {
      let results = []
      suggestionList.forEach(el => {
        let entry = {
          name: this.tickerLookup[el],
          ticker:el
        };
        results.push(entry);
      });

      return results;
    }
  }

  getFirstSuggestion(searchTerm) {
    const formattedSearch = this.formatSearch(searchTerm);
    const firstSuggestionTicker = this.suggestions[formattedSearch]?.[0];

    if (firstSuggestionTicker !== undefined) {
      let entry = {
        name:this.tickerLookup[firstSuggestionTicker],
        ticker: firstSuggestionTicker
      }

      return entry;
    }
  }

  formatSearch(unformattedName) {
    // Upper case Company Name and remove any non-alphanumerics except for spaces between words
    let name = String(unformattedName).toUpperCase();
    return name.replace(/[^0-9a-z\s]/gi, '').trim();
  }
}