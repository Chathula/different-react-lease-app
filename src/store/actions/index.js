import {
  SET_LOADING,
  SET_LEASE_LIST,
  SET_LEASE
} from '../types';
import { axios } from '../../config';

export const fetchLeaseList = () => {
  return async dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: true
    });

    try {
      const { data } = await axios.get('/leases');
      
      dispatch({
        type: SET_LEASE_LIST,
        payload: data
      });

      dispatch({
        type: SET_LOADING,
        payload: false
      });
    } catch (err) {
      dispatch({
        type: SET_LOADING,
        payload: false
      });
    }

  }
}

export const fetchLeaseData = (leaseId) => {
  return async dispatch => {
    dispatch({
      type: SET_LOADING,
      payload: true
    });

    try {
      const { data } = await axios.get(`/leases/${leaseId}`);
      
      dispatch({
        type: SET_LEASE,
        payload: data
      });

      dispatch({
        type: SET_LOADING,
        payload: false
      });
    } catch (err) {
      dispatch({
        type: SET_LOADING,
        payload: false
      });
    }

  }
}