import { UPDATE_ORDER, RESET_ORDER } from './orderTypes'


// ORDER

/**
 * Update a specific part of the order state order[key] = value
 */
export function updateOrder({ path, value }) {
  return {
    type: UPDATE_ORDER, 
    payload: { path, value }
  }
}

export function resetOrder() {
  return {
    type: RESET_ORDER, 
  }
}
