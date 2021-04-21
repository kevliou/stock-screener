import { React, useState, useEffect } from 'react';
import { ApiClient } from '../services/Api';

function StockOverview(props) {
    const ticker = props.selectedTicker;
    const [companyOverview, setCompanyOverview] = useState({});
    useEffect(() => {
        async function setOverview() {
            if (ticker !== undefined) {
                const apiClient = new ApiClient();
                setCompanyOverview(await apiClient.getCompanyOverview(ticker));
            }
        }
        
        setOverview();
    }, [ticker]);

    console.log(companyOverview);

    return(
        <div>
        </div>
    );
}

export default StockOverview