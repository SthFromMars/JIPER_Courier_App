import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {getUserInfo} from '../../state/auth/authActions';
import {checkValidity} from '../../utils/jwt';

class PrivateRoute extends React.Component {
  render() {
    if(!this.props.loggedIn) {
      const token = localStorage.getItem('token')
      if(!checkValidity(token)) {
        return (
          <Redirect to="/" />
        );
      } else {
        //TODO: fix this endpoint being called twice
        this.props.getUserInfo(token);
        return null;
      }
    } else {
      return (
        <div>{this.props.children}</div>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.loggedIn,
});

export default connect(mapStateToProps, { getUserInfo })(PrivateRoute);
