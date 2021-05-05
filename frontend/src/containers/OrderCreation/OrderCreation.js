import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from 'react';
import paymentTypes from './paymentTypes';
import './OrderCreation.css';
import {connect} from 'react-redux';
import {resetOrder, updateOrder} from '../../state/order/orderActions';
import axios from '../../utils/axios';
import {setError} from '../../state/error/errorActions';
import CheckCircle from '../../assets/checkCircle.svg'
import {withRouter} from 'react-router-dom';


function OrderCreation(props) {
  // check if required order fields are set
  if(
    (!props.order.packageId && props.order.packageId !==0) ||
    !props.order.services ||
    (!props.services.id && props.services.id !==0)
  ) {
    props.history.push('/services')
  }


  const [validated, setValidated] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false);

  useEffect(() => {
    props.updateOrder({
      path: 'senderAddress',
      value: {
        city: props.user.address.city,
        street: props.user.address.street,
        houseNr: props.user.address.houseNr,
        zipCode: props.user.address.zipCode,
      },
    })
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setValidated(true)
    if (e.currentTarget.checkValidity() === false) { // event.currentTarget = form
      e.stopPropagation();
      return;
    }
    try {
      await axios.post('/User/neworder', {
        ...props.order,
        userId: props.user.id,
        courierCompanyId: props.services.id,
      });
      setOrderCreated(true);
      setValidated(false);
    } catch (error) {
      props.setError({ error: true, message: `Order creation error: ${error}` });
    }
  }

  return (
    <Container className="py-5">
      <Modal show={orderCreated} >
        <Modal.Header>
          <Modal.Title>Order creation successful</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="justify-content-center">
            <img className={'checkmark'} src={CheckCircle} alt="Checkmark" />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => {
            props.history.push('/orders')
            props.resetOrder()
          }}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        <Row className="justify-content-center">
          <Col sm="20" md="14" lg="12" xl="10">
            <h4>
              <span style={{color: 'var(--primary)'}}>
                {props.services.name}
              </span> Delivery Services
            </h4>
            <Form noValidate validated={validated} onSubmit={handleSubmit} >
              <Row className="justify-content-between">
                <Col sm="9" md="7" lg="6" xl="5">
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
                      value={props.order.senderAddress.city}
                      onChange={(e) => props.updateOrder({
                        path: 'senderAddress',
                        value: {...props.order.senderAddress, city: e.target.value},
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
                      value={props.order.senderAddress.street}
                      onChange={(e) => props.updateOrder({
                        path: 'senderAddress',
                        value: {...props.order.senderAddress, street: e.target.value},
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
                      value={props.order.senderAddress.houseNr}
                      onChange={(e) => props.updateOrder({
                        path: 'senderAddress',
                        value: {...props.order.senderAddress, houseNr: e.target.value},
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
                      value={props.order.senderAddress.zipCode}
                      onChange={(e) => props.updateOrder({
                        path: 'senderAddress',
                        value: {...props.order.senderAddress, zipCode: e.target.value},
                      })}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your zip code
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col  sm="9" md="7" lg="6" xl="5">
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
                      value={props.order.recipientAddress.city}
                      onChange={(e) => props.updateOrder({
                        path: 'recipientAddress',
                        value: {...props.order.recipientAddress, city: e.target.value},
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
                      value={props.order.recipientAddress.street}
                      onChange={(e) => props.updateOrder({
                        path: 'recipientAddress',
                        value: {...props.order.recipientAddress, street: e.target.value},
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
                      value={props.order.recipientAddress.houseNr}
                      onChange={(e) => props.updateOrder({
                        path: 'recipientAddress',
                        value: {...props.order.recipientAddress, houseNr: e.target.value},
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
                      value={props.order.recipientAddress.zipCode}
                      onChange={(e) => props.updateOrder({
                        path: 'recipientAddress',
                        value: {...props.order.recipientAddress, zipCode: e.target.value},
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
                      className={`select-element justify-content-between payment-type-row
                      ${props.order.paymentType === p.value ? 'selected' : ''}`}
                      onClick={() => props.updateOrder({
                        path: 'paymentType',
                        value: p.value,
                      })}
                      noGutters={true}
                    >
                      <Col className={'check-col'}>
                        <Form.Check
                          id={p.value}
                          type="checkbox"
                          aria-label={p.value}
                          checked={props.order.paymentType === p.value}
                          readOnly={true}
                        />
                      </Col>
                      <Col> {p.displayName}</Col>
                    </Row>
                  )
                }
              </Row>
              <Row className="pt-3 justify-content-between">
                <Button onClick={ () => props.history.goBack()}>Back</Button>
                <Button type="submit">Submit</Button>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>);
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    services: state.services,
    order: state.order
  }
}

export default connect(mapStateToProps, {updateOrder, setError, resetOrder})(withRouter(OrderCreation));