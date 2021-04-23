import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Register.css';
import Logo from '../../components/Logo';
import { register } from '../../state/auth/authActions'
import {Link, useHistory} from 'react-router-dom';

function Register(props) {
  // Not the ideal loggedIn handling, but will suffice for now
  const history = useHistory();
  const isLoggedIn = useSelector(state => state.auth.loggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      history.push('/services') // TODO: replace with home
    }
  },[isLoggedIn])

  const [fields, setFields] = useState({
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
  })
  const [validated, setValidated] = useState(false);
  const regex = {
    email: /^.+@.+$/,
    phoneNumber: /^\+?[0-9]+$/,
  }

  function handleFieldChange(event){
    const {value, name} = event.target;
    const fieldsNew = {...fields};
    switch (name) {
      case 'phoneNumber':
      case 'email':
        fieldsNew[name] = {
          value: value,
          isValid: regex[name].test(value)
        }
        break;
      case 'password':
        fieldsNew.password = {value, isValid: Boolean(value)};
        fieldsNew.passwordRepeat.isValid = value === fields.passwordRepeat.value && fields.passwordRepeat.value
        break;
      case 'passwordRepeat':
        fieldsNew.passwordRepeat = {
          value,
          isValid: fields.password.value === value && value,
        };
        break;
      default:
        fieldsNew[name] = {value, isValid: Boolean(value)};
    }
    setFields(fieldsNew);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setValidated(true);
    let formValidity = true;
    Object.values(fields).forEach(value => {
      formValidity = formValidity && value.isValid;
    })
    if (!formValidity ) { // event.currentTarget = form
      event.stopPropagation();
      return;
    }
    const payload = {address: {}};
    Object.keys(fields).forEach(key => {
      if(key === 'city' || key === 'street' || key === 'houseNr' || key === 'zipCode'){
        payload.address[key] = fields[key].value;
      } else {
        payload[key] = fields[key].value;
      }
    })
    props.register(payload);
  }

  return (
    <div className="Register">
      <Container>
        <Logo/>
        <Row className="justify-content-center">
          <Col sm="16" md="12" lg="10" xl="8">
            <h4>Register</h4>
            <Form noValidate onSubmit={handleSubmit} >

              <Row>
                <Col sm="10" md="8" lg="7" xl="6">
                  <Form.Group size="lg" controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      autoFocus
                      name={'firstName'}
                      value={fields.firstName.value}
                      isValid={validated && fields.firstName.isValid}
                      isInvalid={validated && !fields.firstName.isValid}
                      onChange={handleFieldChange}
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
                      value={fields.lastName.value}
                      isValid={validated && fields.lastName.isValid}
                      isInvalid={validated && !fields.lastName.isValid}
                      onChange={handleFieldChange}
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
                      value={fields.email.value}
                      isValid={validated && fields.email.isValid}
                      isInvalid={validated && !fields.email.isValid}
                      onChange={handleFieldChange}
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
                      value={fields.phoneNumber.value}
                      isValid={validated && fields.phoneNumber.isValid}
                      isInvalid={validated && !fields.phoneNumber.isValid}
                      onChange={handleFieldChange}
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
                      value={fields.password.value}
                      isValid={validated && fields.password.isValid}
                      isInvalid={validated && !fields.password.isValid}
                      onChange={handleFieldChange}
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
                      value={fields.passwordRepeat.value}
                      isValid={validated && fields.passwordRepeat.isValid}
                      isInvalid={validated && !fields.passwordRepeat.isValid}
                      onChange={handleFieldChange}
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
                      value={fields.city.value}
                      isValid={validated && fields.city.isValid}
                      isInvalid={validated && !fields.city.isValid}
                      onChange={handleFieldChange}
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
                      value={fields.street.value}
                      isValid={validated && fields.street.isValid}
                      isInvalid={validated && !fields.street.isValid}
                      onChange={handleFieldChange}
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
                      value={fields.houseNr.value}
                      isValid={validated && fields.houseNr.isValid}
                      isInvalid={validated && !fields.houseNr.isValid}
                      onChange={handleFieldChange}
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
                      value={fields.zipCode.value}
                      isValid={validated && fields.zipCode.isValid}
                      isInvalid={validated && !fields.zipCode.isValid}
                      onChange={handleFieldChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your zip code
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Button block size="lg" type="submit">
                Register
              </Button>

            </Form>
            <div className="caption">
              Already have an account?&nbsp;<Link to="/login">Click here to log in</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default connect(null, {register})(Register)