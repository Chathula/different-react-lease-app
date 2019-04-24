import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import NavBar from './components/navBar';
import LeaseView from './components/leaseView';
import LeaseTable from './components/leaseTable';
import Home from './components/pages/home';
import Lease from './components/pages/lease';
import store from './store';

describe('Check components rendering', () => {
  it('renders NavBar without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<NavBar />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders LeaseView without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MemoryRouter><LeaseView tenant='Tester' leaseId='lease-a' /></MemoryRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders LeaseTable without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LeaseTable data={[]} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders Home without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><Home loading={true} /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders Lease without crashing', () => {
    const div = document.createElement('div');
    const defaultProps = {
        match: { params: { code: 123 } },
    };

    ReactDOM.render(<Provider store={store}><Lease {...defaultProps} loading={true} /></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});