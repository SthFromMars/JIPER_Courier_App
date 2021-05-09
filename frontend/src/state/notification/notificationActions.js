import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from './notificationTypes'


export function showSuccess(message) {
  return {
    type: SET_NOTIFICATION,
    payload: {
      show: true,
      message: message,
      header: 'Success',
      color: 'success'
    }
  };
}

export function showInfo(message) {
  return {
    type: SET_NOTIFICATION,
    payload: {
      show: true,
      message: message,
      header: 'Info',
      color: 'info'
    }
  };
}

export function showWarning(message) {
  return {
    type: SET_NOTIFICATION,
    payload: {
      show: true,
      message: message,
      header: 'Warning',
      color: 'warning'
    }
  };
}

export function clearNotification() {
  return {
    type: CLEAR_NOTIFICATION
  };
}