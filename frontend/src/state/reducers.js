import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import errorReducer from './error/errorReducer';
import orderReducer from './order/orderReducer'
import servicesReducer from './services/servicesReducer';

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  order: orderReducer,
  services: servicesReducer,
});
