import {
  SET_LOADING,
  SET_LEASE_LIST,
  SET_LEASE
} from '../types';

const initialState = {
  loading: false,
  leases: [],
  lease: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_LEASE_LIST:
      return { ...state, leases: [...action.payload] };

    case SET_LEASE:
      return { ...state, lease: {...action.payload } };

    default:
      return state;
  }
}