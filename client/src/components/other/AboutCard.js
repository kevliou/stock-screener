import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Divider, Button, Typography } from '@material-ui/core';
import DataTable from './DataTable';
import './AboutCard.css';

function AboutCard(props) {
  const description = props.description;
  const aboutList = props.aboutList;

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
        {headerDescription}
        <Divider />
        <DataTable list={aboutList} />
      </CardContent>
    </Card>
  );
}

export default AboutCard