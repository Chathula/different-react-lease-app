import React, { Component, Fragment } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import LeaseView from '../leaseView';
import { fetchLeaseList } from '../../store/actions';

class Home extends Component {
  componentDidMount() {
    this.props.getLeaseList();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <h1 className="page-title">Lease List</h1>
          </Col>
        </Row>
        <Row>
          {renderLeaseList.call(this)}
        </Row>
      </Container>
    );
  }
}

function renderLeaseList () {
  if (this.props.loading) {
    return (
      <Spinner animation="border" role="status" bsPrefix="spinner-border loading-spinner">
        <span className="sr-only">Loading...</span>
      </Spinner>
    );
  } else {
    return (
      <Fragment>
        {this.props.leases.map((lease) =>
          <LeaseView tenant={lease.tenant} leaseId={lease.id} key={lease.id} />
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return state.leaseReducer;
}

const mapDispatchToProps = dispatch => {
  return {
    getLeaseList: () => dispatch(fetchLeaseList())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);