import { combineReducers } from 'redux';

import authReducer from './authReducer';
import blogReducer from './blogReducer';
import resReducer from './resReducer';

export const reducer = combineReducers({
  auth: authReducer,
  blog: blogReducer,
  res: resReducer
});