import React, { useEffect, useState } from 'react';
import { Typography } from '@material-ui/core';
import { ArrowUpward, ArrowDownward } from '@material-ui/icons';
import './PriceChangePercent.css';

function PriceChangePercent(props) {
  const isChangePositive = props.isChangePositive;
  const percentChange = props.percentChange;

  const [percentText, setPercentText] = useState('');
  useEffect(() => {
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      signDisplay: 'never'
    });

    if (percentChange !== null) {
      setPercentText(formatter.format(percentChange));
    }
  }, [percentChange])

  let negativeStyle = {
    backgroundColor: 'rgb(254,232,230)',
    color: 'rgb(184,37,47)',
  }

  let positiveStyle = {
    backgroundColor: 'rgb(229,244,234)',
    color: 'rgb(58,147,98)',
  }

  return (
    <div 
      className="percent-box"
      style={(isChangePositive)
        ? positiveStyle
        : negativeStyle
      }
      aria-label={ (isChangePositive)
        ? `Up by ${percentText}`
        : `Down by ${percentText}`
      }
    >
      { (isChangePositive)
        ? <ArrowUpward 
            className="direction-icon"
            aria-hidden="true"
          />
        : <ArrowDownward 
            className="direction-icon"
            aria-hidden="true"
          />
      }
      <Typography className="percent-change">
        {percentText}
      </Typography>
    </div>
  );
}

export default PriceChangePercent