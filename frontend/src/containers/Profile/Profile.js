import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { setUserData, getUserInfo } from '../../state/auth/authActions'
import { Link } from 'react-router-dom';
import axios from '../../utils/axios';
import { setError } from '../../state/error/errorActions';
import { showSuccess } from '../../state/notification/notificationActions'
import './Profile.css'

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields: {
        firstName: {value: '', isValid: false},
        lastName: {value: '', isValid: false},
        email: {value: '', isValid: false},
        phoneNumber: {value: '', isValid: false},
        password: {value: '', isValid: false},
        passwordRepeat: {value: '', isValid: false},
        city: {value: '', isValid: false},
        street: {value: '', isValid: false},
        houseNr: {value: '', isValid: false},
        zipCode: {value: '', isValid: false},
      },
      validated: false,
      conflict: false, // Optimistic lock error was thrown while updating
      updateUserInfoDisabled: true,
      updatePasswordDisabled: true,
    }
    this.regex = {
      email: /^.+@.+$/,
      phoneNumber: /^\+?[0-9]+$/,
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.toggleUpdateUserInfo = this.toggleUpdateUserInfo.bind(this)
    this.toggleUpdatePassword = this.toggleUpdatePassword.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.fetchChanges = this.fetchChanges.bind(this)
    this.disableEdit = this.disableEdit.bind(this)
  }

  loadFromAuth() {
    const auth = this.props.auth.user
    this.setState((state) => 
      ({
        ...state, 
        fields: {
          firstName: {value: auth.firstName || '', isValid: true},
          lastName: {value: auth.lastName || '', isValid: true},
          email: {value: auth.email || '', isValid: true},
          phoneNumber: {value: auth.phoneNumber || '', isValid: true},
          password: {value: auth.password || '', isValid: true},
          passwordRepeat: {value: auth.password || '', isValid: true},
          city: {value: auth?.address?.city || '', isValid: true},
          street: {value: auth?.address?.street || '', isValid: true},
          houseNr: {value: auth?.address?.houseNr || '', isValid: true},
          zipCode: {value: auth?.address?.zipCode || '', isValid: true},
        },
        conflict: false,
      })
    );
  }

  componentDidMount() {
    this.loadFromAuth()
  }

  // eslint-disable-next-line no-unused-vars
  async fetchChanges(evt) {
    await this.props.getUserInfo()
    this.loadFromAuth()
  }

  // eslint-disable-next-line no-unused-vars
  toggleUpdateUserInfo(evt) {
    this.setState((state) => ({ ...state, updateUserInfoDisabled: !this.state.updateUserInfoDisabled }))
  }

  // eslint-disable-next-line no-unused-vars
  toggleUpdatePassword(evt) {
    const paswReset = { isValid: this.state.updatePasswordDisabled ? false : true, value: '' }
    this.setState((state) => ({ 
      ...state,
      updatePasswordDisabled: !this.state.updatePasswordDisabled,
      // On toggle reset password fields
      fields: {
        ...this.state.fields,
        password: paswReset,
        passwordRepeat: paswReset
      }
    }))
  }

  // eslint-disable-next-line no-unused-vars
  disableEdit(evt) {
    this.setState((state) => ({
      ...state,
      updateUserInfoDisabled: true,
      updatePasswordDisabled: true,
    }))
  }

  handleFieldChange(event){
    const {value, name} = event.target;
    const fieldsNew = {...this.state.fields};
    switch (name) {
      case 'phoneNumber':
      case 'email':
        fieldsNew[name] = {
          value: value,
          isValid: this.regex[name].test(value)
        }
        break;
      case 'password':
        fieldsNew.password = {value, isValid: value.length >= 3 && Boolean(value)};
        fieldsNew.passwordRepeat.isValid = value === this.state.fields.passwordRepeat.value && this.state.fields.passwordRepeat.value
        break;
      case 'passwordRepeat':
        fieldsNew.passwordRepeat = {
          value,
          isValid: this.state.fields.password.value === value && value,
        };
        break;
      default:
        fieldsNew[name] = {value, isValid: Boolean(value)};
    }
    this.setState((state) => ({...state, fields: fieldsNew}))
  }

  async handleSubmit(event) {
    event.preventDefault();
    this.setState((state) => {
      return {...state, validated: true};
    });
    let formValidity = true;
    Object.values(this.state.fields).forEach(value => {
      formValidity = formValidity && value.isValid;
    })
    if (!formValidity ) {
      event.stopPropagation();
      return;
    }
    const payload = { 
      xmin: this.props.auth.user.xmin, // version
      address: {},
      overwrite: this.state.conflict, // submit called while conflct true -> overwrite
    };
    Object.keys(this.state.fields).forEach(key => {
      if (this.state.fields[key].value) { // Only consider fields if they are truthy
        if(key === 'city' || key === 'street' || key === 'houseNr' || key === 'zipCode'){
          payload.address[key] = this.state.fields[key].value;
        } else {
          payload[key] = this.state.fields[key].value;
        }
      }
    })
    
    try {
      const res = await axios.post('/User/updateinfo', payload);
      this.props.setUserData(res.data);
      this.props.showSuccess('Information updated')
      this.disableEdit(null)
      this.loadFromAuth()
    } catch (error) {
      // 409 - HTTP Conflict, we use this to signify an Optimistic Lock exception occuring
      if (error.response.status === 409 && error.response.data === 'OPTIMISTIC_LOCK_ERROR') {
        this.setState((state) => ({...state, conflict: true}))
      } else {
        this.props.setError({ error: true, message: `Update error: ${error}` })
      }
    }
  }

  render() {
    return <div className="Profile">
      <Container>
        <Row noGutters={true}>
          <Col className="text-left py-3">
            <Link 
              className="navigation-block-btn btn light-up-btn" 
              style={{ color: 'black' }} 
              to="/home"
            >
              <b>Back</b>
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col sm="16" md="12" lg="10" xl="8">
            <Form noValidate onSubmit={this.handleSubmit}>
              <Row noGutters={true} className="py-1">
                <Col className="text-left">
                  <h4>User information</h4>
                </Col>
                <Col className="text-right">
                  <Button 
                    className={`${this.state.updateUserInfoDisabled ? 'light-up-btn' : 'light-up-btn--on'}` }
                    variant="outline-primary" 
                    onClick={this.toggleUpdateUserInfo}
                  >
                    Edit
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col sm="10" md="8" lg="7" xl="6">
                  <Form.Group size="lg" controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      autoFocus
                      name={'firstName'}
                      value={this.state.fields.firstName.value}
                      isValid={this.state.validated && this.state.fields.firstName.isValid}
                      isInvalid={this.state.validated && !this.state.fields.firstName.isValid}
                      onChange={this.handleFieldChange}
                      disabled={this.state.updateUserInfoDisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your first name
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm="10" md="8" lg="7" xl="6">
                  <Form.Group size="lg" controlId="lastName">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                      name={'lastName'}
                      value={this.state.fields.lastName.value}
                      isValid={this.state.validated && this.state.fields.lastName.isValid}
                      isInvalid={this.state.validated && !this.state.fields.lastName.isValid}
                      onChange={this.handleFieldChange}
                      disabled={this.state.updateUserInfoDisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your last name
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm="10" md="8" lg="7" xl="6">
                  <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      name={'email'}
                      value={this.state.fields.email.value}
                      isValid={this.state.validated && this.state.fields.email.isValid}
                      isInvalid={this.state.validated && !this.state.fields.email.isValid}
                      onChange={this.handleFieldChange}
                      disabled={this.state.updateUserInfoDisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid email
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm="10" md="8" lg="7" xl="6">
                  <Form.Group size="lg" controlId="phoneNumber">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      name={'phoneNumber'}
                      value={this.state.fields.phoneNumber.value}
                      isValid={this.state.validated && this.state.fields.phoneNumber.isValid}
                      isInvalid={this.state.validated && !this.state.fields.phoneNumber.isValid}
                      onChange={this.handleFieldChange}
                      disabled={this.state.updateUserInfoDisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid phone number
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col sm="10" md="8" lg="7" xl="6">
                  <Form.Group size="lg" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      name={'city'}
                      value={this.state.fields.city.value}
                      isValid={this.state.validated && this.state.fields.city.isValid}
                      isInvalid={this.state.validated && !this.state.fields.city.isValid}
                      onChange={this.handleFieldChange}
                      disabled={this.state.updateUserInfoDisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your city
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm="10" md="8" lg="7" xl="6">
                  <Form.Group size="lg" controlId="street">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      name={'street'}
                      value={this.state.fields.street.value}
                      isValid={this.state.validated && this.state.fields.street.isValid}
                      isInvalid={this.state.validated && !this.state.fields.street.isValid}
                      onChange={this.handleFieldChange}
                      disabled={this.state.updateUserInfoDisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your street
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm="10" md="8" lg="7" xl="6">
                  <Form.Group size="lg" controlId="houseNr">
                    <Form.Label>House Number</Form.Label>
                    <Form.Control
                      name={'houseNr'}
                      value={this.state.fields.houseNr.value}
                      isValid={this.state.validated && this.state.fields.houseNr.isValid}
                      isInvalid={this.state.validated && !this.state.fields.houseNr.isValid}
                      onChange={this.handleFieldChange}
                      disabled={this.state.updateUserInfoDisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your house number
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm="10" md="8" lg="7" xl="6">
                  <Form.Group size="lg" controlId="zipCode">
                    <Form.Label>Zip code</Form.Label>
                    <Form.Control
                      name={'zipCode'}
                      value={this.state.fields.zipCode.value}
                      isValid={this.state.validated && this.state.fields.zipCode.isValid}
                      isInvalid={this.state.validated && !this.state.fields.zipCode.isValid}
                      onChange={this.handleFieldChange}
                      disabled={this.state.updateUserInfoDisabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your zip code
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row noGutters={true} className="py-3">
                <Col className="text-left">
                  <h4>Password</h4>
                </Col>
                <Col className="text-right">
                  <Button 
                    className={`${this.state.updatePasswordDisabled ? 'light-up-btn' : 'light-up-btn--on'}` }
                    variant="outline-primary" 
                    onClick={this.toggleUpdatePassword}
                  >
                    Update
                  </Button>
                </Col>
              </Row>
              { !this.state.updatePasswordDisabled &&
                <Row>
                  <Col sm="10" md="8" lg="7" xl="6">
                    <Form.Group size="lg" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        name={'password'}
                        value={this.state.fields.password.value}
                        isValid={this.state.validated && this.state.fields.password.isValid}
                        isInvalid={this.state.validated && !this.state.fields.password.isValid}
                        onChange={this.handleFieldChange}
                        disabled={this.state.updatePasswordDisabled}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a password that is 3 characters or longer
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col sm="10" md="8" lg="7" xl="6">
                    <Form.Group size="lg" controlId="passwordRepeat">
                      <Form.Label>Repeat your password</Form.Label>
                      <Form.Control
                        type="password"
                        name={'passwordRepeat'}
                        value={this.state.fields.passwordRepeat.value}
                        isValid={this.state.validated && this.state.fields.passwordRepeat.isValid}
                        isInvalid={this.state.validated && !this.state.fields.passwordRepeat.isValid}
                        onChange={this.handleFieldChange}
                        disabled={this.state.updatePasswordDisabled}
                      />
                      <Form.Control.Feedback type="invalid">
                        Please repeat your password
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              }
                
              {
                (!this.state.updatePasswordDisabled || !this.state.updateUserInfoDisabled) && 
                  <Row noGutters={true}>
                    { this.state.conflict ?
                      <Col>
                        {/* TODO: this could be a component */}
                        <Row className="py-2" noGutters={true}>
                          <Col className="warning-block py-1 px-2">
                            <b>Conflict detected!</b>
                            <div>It appears this information was updated elsewhere, you can either fetch the new changes or save the current changes regardless (this might overwrite some information)</div>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button block size="lg" variant="info" onClick={this.fetchChanges}>
                              Fetch changes
                            </Button>
                          </Col>
                          <Col>
                            <Button block size="lg" type="submit"  variant="warning">
                              Overwrite
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                      : <Button block size="lg" type="submit">
                        Update
                      </Button>
                    }
                  </Row>
              }
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

Profile.propTypes = {
  auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { setUserData, setError, showSuccess, getUserInfo })(Profile)