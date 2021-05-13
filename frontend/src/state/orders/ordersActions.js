import { SET_ORDERS, RESET_ORDERS } from './ordersTypes'
import axios from '../../utils/axios'
import { setError } from '../error/errorActions'

export function loadOrderHistory() {
  return async (dispatch) => {
    try {
      const res = await axios.get('/User/orders');
      dispatch(setOrders(res.data));
      return res;
    } catch (error) {
      dispatch(setError({ error: true, message: `Error while loading order history: ${error}` }));
      return error;
    }
  }
}

export function setOrders(orders) {
  return {
    type: SET_ORDERS, 
    payload: orders
  }
}

export function resetOrders() {
  return {
    type: RESET_ORDERS
  }
}
