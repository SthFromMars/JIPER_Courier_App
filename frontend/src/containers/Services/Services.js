import React from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Services.css';
import PropTypes from 'prop-types';
import { loadServices } from '../../state/services/servicesActions'
import { updateOrder } from '../../state/order/orderActions'
import { withRouter } from 'react-router-dom'


class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await this.props.loadServices(1)
    // Preselect the first package if none selected already
    if (this.props.services.packages.length && !this.props.order.packageId) {
      this.props.updateOrder({ path: 'packageId', value: this.props.services.packages[0].id })
    }
  }

  // eslint-disable-next-line no-unused-vars
  handleChange(value, path, event) {
    this.props.updateOrder({path, value})
  }

  // eslint-disable-next-line no-unused-vars
  handleServicesChange(id, event) {
    const selectedServices = this.props.order.services
    const idx = selectedServices.indexOf(id)

    let newServices = [];
    if (idx !== -1) {
      newServices = selectedServices
      newServices.splice(idx, 1)
    } else {
      newServices = [...selectedServices, id]
    }

    this.handleChange(newServices, 'services')
  }

  // eslint-disable-next-line no-unused-vars
  handleNext(event) { // TODO: add routing or remove this when implementing next part
    this.props.history.push('/order_creation')
  }


  render() {
    return <Container className="py-5">
      <Row className="justify-content-center">
        <Col sm="10" md="10" lg="8" xl="8">
          <h4>
            <span style={{color: 'var(--primary)'}}>
              {this.props.services.name}
            </span> Delivery Services</h4>
          <Form style={{ padding: '5%' }}>
            { this.props.services.packageType === 'SELECT' &&
              <div>
                <Form.Label><b>Select your package type:</b></Form.Label>
                <Row className="text-center pb-1" style={{ fontSize: '12px' }} noGutters={true}> 
                  <Col></Col>
                  <Col> Name </Col>
                  <Col> Length </Col>
                  <Col> Width </Col>
                  <Col> Height </Col>
                  <Col> Weigth </Col>
                  <Col> Price </Col>
                </Row>
                {
                  this.props.services.packages.map(p => <Row 
                    key={p.id} 
                    className={`select-element text-center 
                    ${this.props.order.packageId === p.id ? 'selected' : ''}`} 
                    onClick={(evt) => this.handleChange(p.id, 'packageId', evt)} 
                    noGutters={true}
                  > 
                    <Col>
                      <Form.Check 
                        id={p.id} 
                        type="checkbox" 
                        aria-label={p.id}
                        checked={this.props.order.packageId === p.id}
                        readOnly={true}
                      />
                    </Col>
                    <Col> {p.name} </Col>
                    <Col> {p.length} </Col>
                    <Col> {p.width} </Col>
                    <Col> {p.height} </Col>
                    <Col> {p.weight} </Col>
                    <Col> <b>€{p.price.toFixed(2)}</b> </Col>
                  </Row>
                  )
                }
                <div className="text-right pt-1" style={{ fontSize: '10px' }}>
                  All 3 dimensions and weight of you packackge should be lower or equal to the selected package type
                </div>
              </div>
            }
            {/* This doesn't exactly align with the other columns (because there's 7 of them), leaving as is for now
            You can probably align them with some css nightmare incantation but i can't think of one now */}
            <div>
              <Form.Label><b>Additional services:</b></Form.Label>
              <Row className="text-center pb-1" style={{ fontSize: '12px' }} noGutters={true}> 
                <Col></Col>
                <Col xs={8} className="text-left"> Name </Col>
                <Col> Price </Col>
              </Row>
              {
                this.props.services.services.map(s => <Row 
                  key={s.id} 
                  className={`select-element text-center align-items-center
                  ${this.props.order.services.includes(s.id) ? 'selected' : ''}`} 
                  onClick={(evt) => this.handleServicesChange(s.id, evt)} 
                  noGutters={true}
                > 
                  <Col>
                    <Form.Check 
                      id={s.id} 
                      type="checkbox" 
                      aria-label={s.id}
                      checked={this.props.order.services.includes(s.id)}
                      readOnly={true}
                    />
                  </Col>
                  <Col xs={8} className="text-left" style={{ fontSize: '15px' }}> {s.name} </Col>
                  <Col> <b>€{s.price.toFixed(2)}</b> </Col>
                </Row>
                )
              }
            </div>
          </Form>
        </Col>
      </Row>
      <Row className="justify-content-center pt-3">
        <Button onClick={ (evt) => this.handleNext(evt) }>Next</Button>
      </Row>
    </Container>
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.services,
    order: state.order
  }
}

Notification.propTypes = {
  services: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { loadServices, updateOrder })(withRouter(Services))