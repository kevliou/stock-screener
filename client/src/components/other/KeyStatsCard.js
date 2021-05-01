import React from 'react';
import { Card, CardHeader, CardContent } from '@material-ui/core';
import DataTable from './DataTable';
import './KeyStatsCard.css';

function KeyStatsCard(props) {
  const keyStatList = props.keyStatList;

  return (
    <Card>
      <CardHeader
        title="Key stats"
      />
      <CardContent className="content">
        <DataTable list={keyStatList} />
      </CardContent>
    </Card>
  );
}

export default KeyStatsCard