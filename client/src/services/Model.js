import { PredictiveSearchAPI } from "./Api";

export async function getTickerDict() {
    const predictiveSearchAPI = new PredictiveSearchAPI();
    const result = await predictiveSearchAPI.getTickerDict().then(res => 
        JSON.parse(res));
    return result;
}

export async function getAutoSuggestionList(tickerDict, searchTerm) {
    const predictiveSearchAPI = new PredictiveSearchAPI();
    const suggestions = await predictiveSearchAPI.getSuggestion(searchTerm);
    const result = [];

    if(suggestions !== undefined && suggestions !== '') {
        suggestions.forEach( el => {
            const item = {
                'ticker': el,
                'name': tickerDict[el],
            };
            result.push(item);
        });
        return result;
    }
}

export async function getFirstAutoSuggestionTicker(tickerDict, searchTerm) {
    const predictiveSearchAPI = new PredictiveSearchAPI();
    const suggestions = await predictiveSearchAPI.getSuggestion(searchTerm);

    if(suggestions !== undefined && suggestions !== '') {
        return suggestions[0];
    }
}