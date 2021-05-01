import React from 'react';
import { Card, CardContent, CardHeader, Divider, Typography } from '@material-ui/core';
import DataTable from './DataTable';
import './AboutCard.css';

function AboutCard(props) {
  const description = props.description;
  const aboutList = props.aboutList;

  return (
    <Card>
      <CardHeader
        title="About"
      />
      <CardContent className="content">
        <Typography variant="subtitle1" paragraph={true}>
          {description}
        </Typography>
        <Divider />
        <DataTable list={aboutList} />
      </CardContent>
    </Card>
  );
}

export default AboutCard