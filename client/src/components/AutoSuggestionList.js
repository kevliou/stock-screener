import React from 'react';

const AutoSuggestionList = ({suggestionList=[]}) => {
    console.log(suggestionList);

    return (
        <>
            { suggestionList.map( (data, i) => {
                if (data) {
                    return (
                        <div key={data.ticker}>
                            <h3> Ticker: {data.ticker} </h3>
                            <h3> Name: {data.name} </h3>
                        </div>
                    )
                }
            })}
        </>
    );
}

export default AutoSuggestionList