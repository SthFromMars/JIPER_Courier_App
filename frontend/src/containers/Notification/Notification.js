/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';
import { setError } from '../../state/error/errorActions'
import { clearNotification } from '../../state/notification/notificationActions'


// eslint-disable-next-line no-unused-vars
function Notification(props) {
  const clearError = () => { props.setError({ error: false }) }

  return (
    <div style={{
      position: 'absolute',
      top: 70,
      right: 10,
    }}>
      <Toast
        color={ props.notification.color}
        onClose={ props.clearNotification }
        delay={2500}
        autohide
        show={ props.notification.show }
        style={{
          border: `2px solid var(--${props.notification.color})`,
        }}>
        <Toast.Header
          style={{
            borderBottom: '2px solid var(--green)',
            fontSize: '13pt'
          }}
        >
          <strong className="mr-auto"
            style={{
              color: `var(--${props.notification.color})`,
            }}
          >
            Success
          </strong>
        </Toast.Header>
        <Toast.Body style={{
          fontSize: '10.5pt'
        }}>{props.notification.message}</Toast.Body>
      </Toast>
      <Toast
        color="red"
        onClose={ clearError }
        show={ props.error }
        style={{
          border: '2px solid var(--red)',
        }}>
        <Toast.Header
          style={{
            borderBottom: '2px solid var(--red)',
            fontSize: '13pt'
          }}
        >
          <strong className="mr-auto"
            style={{
              color: 'var(--red)',
            }}
          >
            Error
          </strong>
        </Toast.Header>
        <Toast.Body style={{
          fontSize: '10.5pt'
        }}>{props.errorMessage}</Toast.Body>
      </Toast>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    error: state.error.error,
    errorMessage: state.error.message,
    notification: state.notification,
  }
}

Notification.propTypes = {
  error: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  notification: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { setError, clearNotification })(Notification)