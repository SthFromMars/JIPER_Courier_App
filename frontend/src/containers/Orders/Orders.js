import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import './Orders.css';
import PropTypes from 'prop-types';
import { loadOrderHistory } from '../../state/orders/ordersActions'



class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    // TODO: might need to update this once we decide on the statuses
    this.statusToStyle = {
      'Submitted': 'secondary',
      'On The Way': 'info',
      'Completed': 'success'
    }
  }

  async componentDidMount() {
    await this.props.loadOrderHistory()
    console.log(this.props.orders)
  }

  yyyymmdd(dateString) {
    const d = new Date(dateString)
    return `${d.getFullYear()}-${_padLeft(d.getMonth()+1)}-${_padLeft(d.getDate())}`

    function _padLeft(str) {
      return ('0' + str).slice(-2)
    }
  }

  render() {
    return <Container className="py-5">
      <Row noGutters={true}>
        <Col className="text-left py-3">
          <Link 
            className="text-left navigation-block-btn btn btn-outline-primary" 
            style={{ color: 'black' }} 
            to="/home"
          >
            <b>Back</b>
          </Link>
        </Col>
      </Row>
      <Row noGutters={true}>
        <Col className="text-center pb-3">
          <h4 className="text-primary">Order History</h4>
        </Col>
      </Row>
      {/* Bootstrap accordion will cause some warnings in console, this is currently being fixed
      https://github.com/react-bootstrap/react-bootstrap/issues/5075 */}
      { this.props.orders.history.length ?
        <Accordion defaultActiveKey="0">
          <Card className="gray-bg">
            <Card.Header className="pt-1 pb-2">
              <Row>
                <Col className="col-xs-4 col-md-3 col-lg-2 text-center align-self-center">
                  <h5 className="text-secondary mb-0">Date</h5>
                </Col>
                <Col className="text-left mb-0 align-self-center" >
                  <h5 className="text-secondary mb-0">Sent to</h5>
                </Col>
                <Col className="col-xs-4 col-md-3 col-lg-2 text-center mb-0 align-self-center">
                  <h5 className="text-secondary mb-0">Order Status</h5>
                </Col>
                <Col className="col-md-2 col-lg-1 text-center mb-0 align-self-center">
                  <h5 className="text-secondary mb-0">Paid</h5>
                </Col>
              </Row>
            </Card.Header>
          </Card>
          {
            this.props.orders.history.map((o, i) =>
              <Card key={o.id}>
                <Accordion.Toggle as={Card.Header} eventKey={String(i)}>
                  <Row>
                    <Col className="col-xs-4 col-md-3 col-lg-2 text-center align-self-center">
                      <h6 className="mb-0">{this.yyyymmdd(o.date)}</h6>
                    </Col>
                    <Col className="text-left">
                      <h6 className="mb-0">{o.recipientName}</h6>
                    </Col>
                    <Col className="col-xs-4 col-md-3 col-lg-2 text-center">
                      <Badge variant={this.statusToStyle[o.status]}><h6 className="mb-0">{o.status}</h6></Badge>
                    </Col>
                    <Col className="col-md-2 col-lg-1 text-center mb-0 align-self-center">
                      <h5 className={`${o.paid ? 'text-success' : 'text-secondary'} mb-0`}><b>€</b></h5>
                    </Col>
                  </Row>
                </Accordion.Toggle>
                <Accordion.Collapse eventKey={String(i)}>
                  <Card.Body>
                    <Row>
                      <Col className="col-12 col-md-6 pb-2">
                        <div className="text-secondary"><b>From:</b></div>
                        <div>{o.senderName}</div>
                        <div>{o.sender.city}, {o.sender.street}, {o.sender.houseNr}, zip: {o.sender.zipCode}</div>
                      </Col>
                      <Col className="col-12 col-md-6 pb-2">
                        <div className="text-secondary"><b>To:</b></div>
                        <div>{o.recipientName}</div>
                        <div>{o.recipient.city}, {o.recipient.street}, {o.recipient.houseNr}, zip: {o.recipient.zipCode}</div>
                      </Col>
                      <Col className="col-12 col-md-6 pb-2">
                        <div className="text-secondary"><b>Package:</b></div>
                        <div><b>{o.package.name}</b>: {o.package.length} x {o.package.height} x {o.package.width}, {o.package.weight} kg - <b>€{o.package.price.toFixed(2)}</b></div>
                      </Col>
                      {
                        !!o.services.length &&
                          <Col className="col-12 col-md-6 pb-2">
                            <div className="text-secondary"><b>Services:</b></div>
                            {
                              o.services.map((s) => 
                                <div key={s.id}>{s.name} - <b>€{s.price.toFixed(2)}</b></div>
                              )
                            }
                          </Col>
                      }
                      <Col className="col-12 col-md-6 pb-2">
                        <div className="text-secondary"><b>Total:</b></div>
                        <div>€{o.price.toFixed(2)}</div>
                      </Col>
                      <Col className="col-12 col-md-6 pb-2">
                        <div className="text-secondary"><b>Payment method:</b></div>
                        <div>{o.paymentType}</div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            )
          }
        </Accordion>
        : <Row noGutters={true}>
          <Col className="text-center">
            <h5>No previous orders found.</h5>
          </Col>
        </Row>
      }
    </Container>
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.orders
  }
}

Notification.propTypes = {
  orders: PropTypes.array.isRequired
};

export default connect(mapStateToProps, { loadOrderHistory })(Orders)