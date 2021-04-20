import React, { useState } from 'react';
import { connect } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Register.css';
import Logo from '../../components/Logo';
import { register } from '../../state/auth/authActions'

function Register(props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [validated, setValidated] = useState(false);
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [houseNr, setHouseNr] = useState('');
  const [zipCode, setZipCode] = useState('');


  function handleSubmit(event) {
    event.preventDefault();
    setValidated(true)
    if (event.currentTarget.checkValidity() === false) { // event.currentTarget = form
      event.stopPropagation();
      return;
    }
    props.register({firstName, lastName, email, phoneNumber, password,
      address: {
        city, street, houseNr, zipCode
      }})
  }

  return (
    <div className="Register">
      <Container>
        <Logo/>
        <Row className="justify-content-center">
          <Col sm="16" md="12" lg="10" xl="8">
            <h4>Register</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit} >

              <Row>
                <Col sm="10" md="8" lg="7" xl="6">
                  <Form.Group size="lg" controlId="firstName">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                      autoFocus
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
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
                      required
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
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
                      required
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                      required
                      type="password"
                      value={passwordRepeat}
                      onChange={(e) => setPasswordRepeat(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                  Please provide repeat your password
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col sm="10" md="8" lg="7" xl="6">
                  <Form.Group size="lg" controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
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
                      required
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
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
                      required
                      value={houseNr}
                      onChange={(e) => setHouseNr(e.target.value)}
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
                      required
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
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
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default connect(null, {register})(Register)