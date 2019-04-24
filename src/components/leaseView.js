import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

export default (props) => {
  return (
    <Col bsPrefix="col card-col">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{props.tenant}</Card.Title>
          <NavLink to={`/lease/${props.leaseId}`}><Button className="visit-btn" variant="primary">Visit</Button></NavLink> 
        </Card.Body>
      </Card>
    </Col>
  );
}