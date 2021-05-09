import { combineReducers } from 'redux'
import authReducer from './auth/authReducer'
import errorReducer from './error/errorReducer'
import orderReducer from './order/orderReducer'
import servicesReducer from './services/servicesReducer'
import ordersReducer from './orders/ordersReducer'
import notificationReducer from './notification/notificationReducer'

export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  order: orderReducer,
  services: servicesReducer,
  orders: ordersReducer,
  notification: notificationReducer,
});
