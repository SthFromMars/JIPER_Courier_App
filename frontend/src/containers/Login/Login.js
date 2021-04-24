import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../state/auth/authActions'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Login.css';
import Logo from '../../components/Logo/Logo';
import { useHistory } from 'react-router-dom';

function Login(props) {
  // Not the ideal loggedIn handling, but will suffice for now
  const history = useHistory();
  const isLoggedIn = useSelector(state => state.auth.loggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      history.push('/home')
    }
  },[isLoggedIn])

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false); 

  async function handleSubmit(event) {
    event.preventDefault();
    setValidated(true)
    if (event.currentTarget.checkValidity() === false) { // event.currentTarget = form
      event.stopPropagation();
      return;
    }
    // eslint-disable-next-line react/prop-types
    props.login({ email, password });
  }

  return (
    <div className="Login">
      <Container>
        <Logo/>
        <Row className="justify-content-center">
          <Col sm="8" md="6" lg="5" xl="4">
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
            <div className="caption">
              Don&apos;t have an account yet?&nbsp;<Link to="/register">Click here to register</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}


export default connect(null, {login})(Login)