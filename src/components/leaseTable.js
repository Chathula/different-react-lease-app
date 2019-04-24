import React from 'react';
import { Table } from 'react-bootstrap';

export default (props) => {
  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>From</th>
          <th>To</th>
          <th>Days</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {props.data.length > 0 && props.data.map((lease, index) =>
          <tr key={index}>
            <td>{lease.from}</td>
            <td>{lease.to}</td>
            <td>{lease.days}</td>
            <td>{lease.amount}</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
}