import { ApiClient } from "./Api";

export async function getTickerDict() {
    const apiClient = new ApiClient();
    const result = await apiClient.getTickerDict().then(res => 
        JSON.parse(res));
    return result;
}

export async function getAutoSuggestionList(tickerDict, searchTerm) {
    const apiClient = new ApiClient();
    const suggestions = await apiClient.getSuggestion(searchTerm);
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
    const apiClient = new ApiClient();
    const suggestions = await apiClient.getSuggestion(searchTerm);

    if(suggestions !== undefined && suggestions !== '') {
        return suggestions[0];
    }
}