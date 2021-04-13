
export function addCompanyName(tickerDict, tickerList) {
    tickerList.forEach(el => 
        el['name'] = tickerDict[el.ticker]);
    
    console.log(tickerDict);
    console.log(tickerList);
    return tickerList;
}