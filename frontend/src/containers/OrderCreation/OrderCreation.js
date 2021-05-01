import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import React, {useEffect, useState} from 'react';
import paymentTypes from './paymentTypes';
import './OrderCreation.css';
import {connect} from 'react-redux';
import {updateOrder} from '../../state/order/orderActions';


function OrderCreation(props) {

  const [validated, setValidated] = useState(false);

  useEffect(() => {
    props.updateOrder({
      path: 'sender',
      value: props.user.address,
    })
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setValidated(true)
    if (e.currentTarget.checkValidity() === false) { // event.currentTarget = form
      e.stopPropagation();
      return;
    }
  }

  console.log(JSON.stringify(props.user, null, 2))

  return (
    <div className="Login">
      <Container>
        <Row className="justify-content-center">
          <Col sm="16" md="12" lg="10" xl="8">
            <h4>
              <span style={{color: 'var(--primary)'}}>
                {props.services.name}
              </span> Delivery Services
            </h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
              <Row className="justify-content-center">
                <Col sm="10" md="8" lg="7" xl="6">
                  <h4>Sender</h4>
                  <Form.Group size="lg" controlId="senderName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      disabled
                      value={props.user.firstName + ' ' + props.user.lastName}
                    />
                  </Form.Group>
                  <Form.Group size="lg" controlId="senderCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      value={props.order.sender.city}
                      onChange={(e) => props.updateOrder({
                        path: 'sender',
                        value: {...props.order.sender, city: e.target.value},
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your city
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group size="lg" controlId="senderStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      required
                      value={props.order.sender.street}
                      onChange={(e) => props.updateOrder({
                        path: 'sender',
                        value: {...props.order.sender, street: e.target.value},
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your street
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group size="lg" controlId="senderHouseNr">
                    <Form.Label>House Number</Form.Label>
                    <Form.Control
                      required
                      value={props.order.sender.houseNr}
                      onChange={(e) => props.updateOrder({
                        path: 'sender',
                        value: {...props.order.sender, houseNr: e.target.value},
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your house number
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group size="lg" controlId="senderZipCode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      required
                      value={props.order.sender.zipCode}
                      onChange={(e) => props.updateOrder({
                        path: 'sender',
                        value: {...props.order.sender, zipCode: e.target.value},
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your zip code
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col sm="10" md="8" lg="7" xl="6">
                  <h4>Recipient</h4>
                  <Form.Group size="lg" controlId="recipientName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      required
                      value={props.order.recipientName}
                      onChange={(e) => props.updateOrder({
                        path: 'recipientName',
                        value: e.target.value,
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide recipient&apos;s name
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group size="lg" controlId="recipientCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      required
                      value={props.order.recipient.city}
                      onChange={(e) => props.updateOrder({
                        path: 'recipient',
                        value: {...props.order.recipient, city: e.target.value},
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide recipient&apos;s city
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group size="lg" controlId="recipientStreet">
                    <Form.Label>Street</Form.Label>
                    <Form.Control
                      required
                      value={props.order.recipient.street}
                      onChange={(e) => props.updateOrder({
                        path: 'recipient',
                        value: {...props.order.recipient, street: e.target.value},
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide recipient&apos;s street
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group size="lg" controlId="recipientHouseNr">
                    <Form.Label>House Number</Form.Label>
                    <Form.Control
                      required
                      value={props.order.recipient.houseNr}
                      onChange={(e) => props.updateOrder({
                        path: 'recipient',
                        value: {...props.order.recipient, houseNr: e.target.value},
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide recipient&apos;s house number
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group size="lg" controlId="recipientZipCode">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      required
                      value={props.order.recipient.zipCode}
                      onChange={(e) => props.updateOrder({
                        path: 'recipient',
                        value: {...props.order.recipient, zipCode: e.target.value},
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide recipient&apos;s zip code
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Form.Label><b>Select your payment type:</b></Form.Label>
                {
                  paymentTypes.map(p =>
                    <Row
                      key={p.value}
                      className={`select-element text-center 
                      ${props.order.paymentType === p.value ? 'selected' : ''}`}
                      onClick={() => props.updateOrder({
                        path: 'paymentType',
                        value: p.value,
                      })}
                      noGutters={true}
                    >
                      <Col sm="16" md="12" lg="10" xl="8">
                        <Form.Check
                          id={p.value}
                          type="checkbox"
                          aria-label={p.value}
                          checked={props.order.paymentType === p.value}
                          readOnly={true}
                        />
                      </Col>
                      <Col sm="16" md="12" lg="10" xl="8"> {p.displayName} </Col>
                    </Row>
                  )
                }
              </Row>
              <Button block size="lg" type="submit">
                Order
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>);
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    services: state.services,
    order: state.order
  }
}

export default connect(mapStateToProps, {updateOrder})(OrderCreation);