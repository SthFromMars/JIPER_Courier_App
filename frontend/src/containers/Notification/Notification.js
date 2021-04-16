/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import Toast from 'react-bootstrap/Toast';
import PropTypes from 'prop-types';
import { setError } from '../../state/error/errorActions'


// eslint-disable-next-line no-unused-vars
function Notification(props) {
  const clearError = () => { props.dispatch(setError({ error: false })) }

  return (
    <div>
      <Toast
        color="red"
        onClose={ clearError }
        show={ props.error }
        style={{
          border: '2px solid var(--red)',
          position: 'absolute',
          top: 10,
          right: 10,
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
        }}>{props.message}</Toast.Body>
      </Toast>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    error: state.error.error,
    message: state.error.message
  }
}

Notification.propTypes = {
  error: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Notification)