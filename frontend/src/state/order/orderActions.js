import { UPDATE_ORDER } from './orderTypes'


// ORDER

/**
 * Update a specific part of the order state order[key] = value
 */
export function updateOrder({ key, value }) {
  return {
    type: UPDATE_ORDER, 
    payload: { key, value }
  }
}
