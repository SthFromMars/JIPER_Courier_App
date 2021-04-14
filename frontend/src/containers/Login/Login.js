import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);


  function handleSubmit(event) {
    event.preventDefault();
    if (event.currentTarget.checkValidity() === false) { // event.currentTarget = form
      event.stopPropagation();
    }
    setValidated(true);
    console.log(email, password)
  }

  return (
    <div className="Login">
      <Container>
        <Row className="py-5 justify-content-center">
          {/* logo goes here */}
        </Row>
        <Row className="justify-content-center">
          <Col sm="6" md="6" lg="5" xl="4">
            <h4>Login</h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
              <Form.Group size="lg" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  autoFocus
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email
                </Form.Control.Feedback>
              </Form.Group>
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
              <Button block size="lg" type="submit">
              Login
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}