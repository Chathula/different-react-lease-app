import React, { Component } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-recur';

import LeaseTable from '../leaseTable';
import { fetchLeaseData, fetchLeaseList } from '../../store/actions';

class Lease extends Component {

  state = {
    leaseId: null,
    leaseDays: []
  };

  componentDidMount() {
    const { params: { leaseId } } = this.props.match;
    this.setState({
      leaseId
    });

    if (this.props.leases.length === 0) {
      this.props.getLeaseList();
    }
    this.props.getLeaseData(leaseId);
    this.generateLeaseData();
  }

  componentDidUpdate(prevProps, nextProps) {
    if (this.props.location !== prevProps.location) {
      const { params: { leaseId } } = this.props.match;
      this.setState({
        leaseId
      });

      if (this.props.leases.length === 0) {
        this.props.getLeaseList();
      }
      this.props.getLeaseData(leaseId);
    }

    if (typeof this.props.lease.rent !== 'undefined' && this.props.lease.id !== prevProps.lease.id) {
      this.generateLeaseData();
    }
  }

  generateLeaseData = () => {
    const { lease } = this.props;

    if (typeof lease !== 'undefined' && typeof lease.rent !== 'undefined') {
      const leaseDays = [];

      const nextPayment = moment(lease.start_date, 'YYYY-MM-DD');
      const firstPaymentDay = getNextDay(nextPayment, getDayNumber(lease.payment_day.toLowerCase()));

      const paymentDays = moment().recur(firstPaymentDay.format('YYYY-MM-DD'), lease.end_date).every(getFrequently(lease.frequency)).days().all("L");

      if (!moment(paymentDays[paymentDays.length - 1], 'MM/DD/YYYY').isSame(lease.end_date)) {
        paymentDays.push(moment(lease.end_date).format('MM/DD/YYYY')); 
      }
      
      let from, to, days, amount;
      for (const [index, payDay] of paymentDays.entries()) {
        from = moment(lease.start_date);
        to = moment(payDay, 'MM/DD/YYYY');

        if (index !== 0) {
          from = moment(paymentDays[index - 1], 'MM/DD/YYYY');
          to = moment(payDay, 'MM/DD/YYYY');
        }

        days = (index === 0) ? to.diff(from, 'days') + 1 : to.diff(from, 'days');
        amount = `$${Number(((days / 7) * lease.rent).toFixed(1))}`;
        
        const dataObj = {
          from: (index === 0) ? from.format('MMMM, Do YYYY') : from.add(1, 'd').format('MMMM, Do YYYY'),
          to: to.format('MMMM, Do YYYY'),
          days,
          amount
        };

        leaseDays.push(dataObj);
      }

      this.setState({
        leaseDays
      });
    
  }
  
}

  renderLeaseDataTable = () => {
    if (this.props.loading || this.state.leaseDays.length === 0) {
      return (
        <Spinner animation="border" role="status" bsPrefix="spinner-border loading-spinner">
          <span className="sr-only">Loading...</span>
        </Spinner>
      );
    } else {
      return (
        <Col bsPrefix="col lease-table">
          <LeaseTable data={this.state.leaseDays} />
        </Col>
      );
    }
  }

  getTitle = () => {
    if (this.props.leases.length !== 0 && !this.props.loading && this.state.leaseDays.length !== 0) {
      const selectedLease = this.props.leases.find(lease => lease.id === this.state.leaseId);
      return (typeof selectedLease !== 'undefined') ? <h1 className="page-title">Tenant: {selectedLease.tenant}</h1> : '';
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col>
            {this.getTitle()}
          </Col>
        </Row>
        <Row>
          {this.renderLeaseDataTable()}
        </Row>
      </Container>
    );
  }
}

function getFrequently(frequency) {
  const frequents = {
    weekly: 7,
    fortnightly: 14,
    monthly: 28
  };

  return frequents[frequency];
}

function getDayNumber(day) {
  const days = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5
  };

  return days[day];
}

function getNextDay(momentDate, dayINeed) {
  if (momentDate.isoWeekday() <= dayINeed) { 
    return momentDate.isoWeekday(dayINeed);
  } else {
    return momentDate.add(1, 'weeks').isoWeekday(dayINeed);
  }
}

const mapStateToProps = state => {
  return state.leaseReducer;
}

const mapDispatchToProps = dispatch => {
  return {
    getLeaseList: () => dispatch(fetchLeaseList()),
    getLeaseData: (leaseId) => dispatch(fetchLeaseData(leaseId))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lease);