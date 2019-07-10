import { combineReducers } from 'redux';

import authReducer from './authReducer';
import blogReducer from './blogReducer';

export const reducer = combineReducers({
  auth: authReducer,
  blog: blogReducer
});