import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { checkValidity } from '../../utils/jwt';

class PublicRoute extends React.Component {
  render() {
    const token = localStorage.getItem('token')
    if(this.props.loggedIn || checkValidity(token)) {
      return (
        <Redirect to="/home"/>
      );
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

export default connect(mapStateToProps)(PublicRoute);
