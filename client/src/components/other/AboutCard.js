import { React } from 'react';
import { Card, CardContent, CardHeader, Divider, IconButton, Table, TableBody, TableCell, TableRow, Typography } from '@material-ui/core';
import { ExpandLess } from '@material-ui/icons';

function AboutCard(props) {
  const companyOverview = props.companyOverview;
  const numberFormatter = new Intl.NumberFormat('en-US')

  return (
    <Card>
      <CardHeader
        title="About"
        action={
          <IconButton>
            <ExpandLess 
              aria-label="expand-less"
            />
          </IconButton>
        }
      />
      <CardContent>
        <Typography variant="caption" paragraph={true}>
          {companyOverview.Description}
        </Typography>
        <Divider />
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>SECTOR</TableCell>
              <TableCell align="right">
                {companyOverview.Sector}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>INDUSTRY</TableCell>
              <TableCell align="right">
                {companyOverview.Industry}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>HEADQUARTERS</TableCell>
              <TableCell align="right">
                  {formatAddress(companyOverview.Address)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>EMPLOYEES</TableCell>
              <TableCell align="right">
                {numberFormatter.format(companyOverview.FullTimeEmployees)}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function formatAddress(unformattedAddress) {
  if(!unformattedAddress.includes(',')){
    return;
  }
  
  let address = unformattedAddress.split(',');
  return (
    <>
      <Typography variant="body2">
        {address[0]}
      </Typography>
      <Typography variant="body2">
        {address[1] + ', ' + address[2]}
      </Typography>
      <Typography variant="body2">
        {address[3]}
      </Typography>
    </>
    );
}

export default AboutCard