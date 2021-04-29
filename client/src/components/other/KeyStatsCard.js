import React from 'react';
import { Card, CardHeader, CardContent, Table, TableBody, TableRow, TableCell } from '@material-ui/core';

function KeyStatsCard(props) {
  const companyOverview = props.companyOverview;
  const quote = props.quote;
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
  });

  return (
    <Card>
      <CardHeader
        title="Key stats"
      />
      <CardContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>PREVIOUS CLOSE</TableCell>
              <TableCell align="right">
                {Number.parseFloat(quote['08. previous close']).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DAY RANGE</TableCell>
              <TableCell align="right">
                {currencyFormatter.format(quote['04. low']) + " - " +
                  currencyFormatter.format(quote['03. high'])}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>YEAR RANGE</TableCell>
              <TableCell align="right">
                {currencyFormatter.format(companyOverview['52WeekLow']) + " - " +
                  currencyFormatter.format(companyOverview['52WeekHigh'])}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>MARKET CAP</TableCell>
              <TableCell align="right">
                {abbreviateNumber(companyOverview.MarketCapitalization) + ' USD'}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>VOLUME</TableCell>
              <TableCell align="right">
                {abbreviateNumber(quote['06. volume'])}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>P/E RATIO</TableCell>
              <TableCell align="right">
                {Number.parseFloat(companyOverview.PERatio).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>DIVIDEND YIELD</TableCell>
              <TableCell align="right">
                {Number.parseFloat(companyOverview.DividendYield * 100).toFixed(2) + "%"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>EPS</TableCell>
              <TableCell align="right">
                {Number.parseFloat(companyOverview.EPS).toFixed(2)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>EXCHANGE</TableCell>
              <TableCell align="right">
                {companyOverview.Exchange}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function abbreviateNumber(amount) {
  if (amount < 1000) {
    return amount;
  }

  const digits = Math.floor(Math.log10(amount) + 1);

  // Adjustment down if exactly divisible by 3, e.g. 100,000 = 100K not 0.1M
  const thousands = Math.floor(digits / 3) - (digits % 3 === 0);
  const symbol = "KMBT".charAt(thousands - 1);
  const roundedNum = (amount / Math.pow(10, thousands * 3)).toFixed(2);

  return roundedNum + symbol;
}

export default KeyStatsCard