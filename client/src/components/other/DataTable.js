import { Table, TableBody, TableCell, TableRow } from '@material-ui/core';
import React from 'react';
import './DataTable.css';

function DataTable(props) {
  const list = props.list;

  let tableEntries = [];
  if (list !== undefined) {
    list.forEach((value, key) => {
      tableEntries.push(
        <TableRow key={key}>
          <TableCell className="label">{key}</TableCell>
          <TableCell align="right">{value}</TableCell>
        </TableRow>
      );
    });
  }

  return (
    <Table>
      <TableBody>
        {tableEntries}
      </TableBody>
    </Table>
  );
}

export default DataTable