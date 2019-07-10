import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk'
import { reducer } from '../reducers/reducers';

const store = createStore(
  reducer,
  applyMiddleware(ReduxThunk)
);

export default store;