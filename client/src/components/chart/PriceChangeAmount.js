import React, { useEffect, useState } from 'react'
import { Typography } from '@material-ui/core';
import './PriceChangeAmount.css';

function PriceChangeAmount(props) {
  const isChangePositive = props.isChangePositive;
  const amountChange = props.amountChange;
  const dateRange = props.dateRange;

  const [amountText, setAmountText] = useState('');
  useEffect(() => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: 'always'
    });

    if (amountChange !== null){
      const dateLabel = (dateRange !== '1D') ? dateRange : 'Today';
      const changeString = formatter.format(amountChange) + ' ' + dateLabel;
      setAmountText(changeString);
    }
  }, [amountChange, dateRange]);

  let negativeStyle = {
    color: 'rgb(184,37,47)',
  }

  let positiveStyle = {
    color: 'rgb(58,147,98)',
  }

  return (
    <Typography 
      className="amount-change"
      style={ (isChangePositive)
        ? positiveStyle
        : negativeStyle
      }
    >
      {amountText}
    </Typography>
  );
}

export default PriceChangeAmount