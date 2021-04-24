import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Navbar from 'react-bootstrap/Navbar'
import Logo from '../Logo/Logo'
import { connect } from 'react-redux'

class Navigationbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        { this.props.auth.loggedIn &&
          <Navbar bg="dark" variant="dark" className="justify-content-between">
            <Navbar.Brand>
              <Logo class="py-0" small={true}/>
            </Navbar.Brand>
            <div className="row align-items-center" style={{ color: 'white', fontSize: '18px' }}>
              <div>{ this.props.auth.user.firstName }</div>
              {/* Circle with first name letter */}
              <div 
                className="center-text ml-2 mr-3" 
                style={{ backgroundColor: 'var(--primary)', fontSize: '24px', width: '32px', height: '32px', textAlign: 'center', borderRadius: '50%' }}
              >
                { this.props.auth.user.firstName.slice(0,1) }
              </div>
            </div>
          </Navbar>
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
}

Navigationbar.propTypes = {
  auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, null)(Navigationbar)
