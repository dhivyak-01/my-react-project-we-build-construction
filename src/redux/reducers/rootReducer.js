import { combineReducers } from 'redux';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  cart: cartReducer,  // Make sure cartReducer is included here
});

export default rootReducer;
