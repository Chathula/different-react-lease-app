import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

const middlewares = [thunk];

function configureStore(initialState={}) {
  return createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
}

export default configureStore();