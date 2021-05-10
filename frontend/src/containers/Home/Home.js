import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import './Home.css';
import { withRouter } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  

  // eslint-disable-next-line no-unused-vars
  goTo(route, event) {
    const { history } = this.props;
    if(history) history.push(route);
  }

  render() {
    return <Container className="py-5">
      <Row noGutters={true} className="justify-content-center">
        <Col sm="8" md="6" lg="5" xl="4">
          <Button
            className="text-left navigation-block-btn"
            variant="outline-primary"
            block
            onClick={(evt) => this.goTo('/services', evt)}
          >
            <div style={{ color: 'black' }}>
              <b>New Order</b>
            </div>
            <div style={{ color: 'black' }}>
              Place a new courier order
            </div>
          </Button>
        </Col>
      </Row>
      <Row noGutters={true} className="justify-content-center mt-2">
        <Col sm="8" md="6" lg="5" xl="4">
          <Button
            className="text-left navigation-block-btn"
            variant="outline-primary"
            block
            onClick={(evt) => this.goTo('/orders', evt)}
          >
            <div style={{ color: 'black' }}>
              <b>Order History</b>
            </div>
            <div style={{ color: 'black' }}>
              View previous orders
            </div>
          </Button>
        </Col>
      </Row>
      <Row noGutters={true} className="justify-content-center mt-2">
        <Col sm="8" md="6" lg="5" xl="4">
          <Button
            className="text-left navigation-block-btn"
            variant="outline-primary"
            block
            onClick={(evt) => this.goTo('/profile', evt)}
          >
            <div style={{ color: 'black' }}>
              <b>Profile</b>
            </div>
            <div style={{ color: 'black' }}>
              Change your email, password or address
            </div>
          </Button>
        </Col>
      </Row>
    </Container>
  }
}

const routedHome = withRouter(Home);
export default connect()(routedHome)