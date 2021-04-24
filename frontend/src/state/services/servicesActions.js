import { SET_SERVICES } from './servicesTypes'
import { setError } from '../error/errorActions'
import axios from '../../utils/axios'

const PACKAGE_TYPES = ['SELECT', 'MAX_WEIGHT']
function setServices(payload) {
  payload.packageType = PACKAGE_TYPES[payload.packageType] // BE will return enum index
  return {
    type: SET_SERVICES,
    payload: payload,
  }
}

export function loadServices(companyId) {
  return async dispatch => {
    try {
      const res = await axios.get(`/CourierCompany/courier/${companyId}`);
      dispatch(setServices(res.data));
      return res;
    } catch (error) {
      dispatch(setError({ error: true, message: `Error while loading services: ${error}` }));
      return error;
    }
  }
}