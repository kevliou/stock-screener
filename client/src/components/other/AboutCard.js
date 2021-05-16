import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Divider, Button, Typography } from '@material-ui/core';
import TransitionManager from '../transition/TransitionManager';
import DataTable from './DataTable';
import { useApi } from '../ApiHook';
import './AboutCard.css';

function AboutCard(props) {
  const selectedTicker = props.selectedTicker;
  const formatNumber = props.formatNumber;
  
  const [aboutData, aboutLoading, aboutError] = useApi('/getOverview', selectedTicker);
  const [aboutList, setAboutList] = useState(undefined);
  const [description, setDescription] = useState('');

  // Update About card
  useEffect(() => {
    if (aboutData !== undefined) {
      const wholeNumber = new Intl.NumberFormat('en-US');

      setDescription(aboutData.description);

      setAboutList(new Map([
        ['sector', aboutData.sector],
        ['industry', aboutData.industry],
        ['headquarters', formatAddress(aboutData)],
        ['employees', formatNumber(aboutData.employees, wholeNumber)]
      ]));
    } else {
      setAboutList(undefined);
    }
  }, [aboutData, formatNumber]);

  // Show more/ show less logic
  const [isHidden, setIsHidden] = useState(true);
  const [headerDescription, setHeaderDescription] = useState(null);
  useEffect(() => {
    let ellipsisStyle = {
      display: (isHidden) ? 'inline' : 'none'
    }
  
    let moreTextStyle = {
      display: (isHidden) ? 'none' : 'inline'
    }
  
    let buttonText = (isHidden) ? 'Show more' : 'Show less';

    function handleButtonClick() {
      setIsHidden(!isHidden);
    }

    const truncateLength = 350;

    if (description.length > truncateLength) {
      setHeaderDescription(
        <>
          <Typography variant="subtitle1">
            {description.slice(0, truncateLength)}
            <span style={ellipsisStyle}>...</span>
            <span style={moreTextStyle}>{description.slice(truncateLength)}</span>
          </Typography>
          <Button
            variant="contained"
            size="small"
            disableElevation={true}
            onClick={handleButtonClick}
            className="button"
          >
            <Typography variant="subtitle1">
              {buttonText}
            </Typography>
          </Button>
        </>
      );
    } else {
      setHeaderDescription(
        <Typography variant="subtitle1" paragraph={true}>
          {(description !== '0' && description !== '') ? description : 'No description'}
        </Typography>
      );
    }
  }, [description, isHidden]);

  return (
    <Card>
      <CardHeader
        title="About"
      />
      <CardContent className="content">
        <TransitionManager 
          content= {
            <>
              {headerDescription}
              <Divider />
              <DataTable list={aboutList} />
            </>
          }
          isLoading={aboutLoading}
          loadingMessage="Loading"
          error={aboutError}
        />
      </CardContent>
    </Card>
  );
}

function formatAddress(data) {
  return (
    <>
      <Typography variant="body2">
        {data.address}
      </Typography>
      { data.address2 &&
        <Typography variant="body2">
          {data.address2}
        </Typography>
      }
      <Typography variant="body2">
        {data.city + ', ' + data.state}
      </Typography>
      <Typography variant="body2">
        {data.country}
      </Typography>
    </>
  )
}

export default AboutCard