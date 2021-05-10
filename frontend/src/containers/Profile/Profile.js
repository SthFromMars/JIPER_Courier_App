import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { updateUserInfo } from '../../state/auth/authActions'
import { Link } from 'react-router-dom';
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
      disabled: true
    };
    this.regex = {
      email: /^.+@.+$/,
      phoneNumber: /^\+?[0-9]+$/,
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
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
        }
      })
    );
  }

  // eslint-disable-next-line no-unused-vars
  toggleEdit(evt) {
    this.setState((state) => ({...state, disabled: !this.state.disabled}))
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
        fieldsNew.password = {value, isValid: Boolean(value)};
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

  handleSubmit(event) {
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
    const payload = { userId: this.props.auth.user.id, address: {} };
    Object.keys(this.state.fields).forEach(key => {
      if(key === 'city' || key === 'street' || key === 'houseNr' || key === 'zipCode'){
        payload.address[key] = this.state.fields[key].value;
      } else {
        payload[key] = this.state.fields[key].value;
      }
    })
    this.props.updateUserInfo(payload);
    this.toggleEdit(null)
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
                    className={`${this.state.disabled ? 'light-up-btn' : 'light-up-btn--on'}` }
                    variant="outline-primary" 
                    onClick={this.toggleEdit}
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
                      disabled={this.state.disabled}
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
                      disabled={this.state.disabled}
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
                      disabled={this.state.disabled}
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
                      disabled={this.state.disabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid phone number
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

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
                      disabled={this.state.disabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a password
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
                      disabled={this.state.disabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please repeat your password
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
                      disabled={this.state.disabled}
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
                      disabled={this.state.disabled}
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
                      disabled={this.state.disabled}
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
                      disabled={this.state.disabled}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your zip code
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
                
              {
                !this.state.disabled &&
                  <Button block size="lg" type="submit">
                    Update
                  </Button>
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

// TODO register - updateuserinfo
export default connect(mapStateToProps, { updateUserInfo })(Profile)