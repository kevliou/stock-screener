import { PredictiveSearchAPI } from "./Api";

export async function getAutoSuggestionList(tickerDict, searchTerm){
    const predictiveSearchAPI = new PredictiveSearchAPI();
    const suggestions = await predictiveSearchAPI.getSuggestion(searchTerm);
    const result = [];

    if(suggestions !== undefined && suggestions !== '') {
        suggestions.forEach( el => {
            let item = {};
            item.ticker = el;
            item.name = tickerDict[el];
            result.push(item);
        });
        return result;
    }
}