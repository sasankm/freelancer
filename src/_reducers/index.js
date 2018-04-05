import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { user } from './users.reducer.js';

const rootReducer = combineReducers({
  authentication,
  user
});

export default rootReducer;