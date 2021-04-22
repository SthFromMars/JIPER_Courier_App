import React from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';

// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Services.css';
import PropTypes from 'prop-types';
import { loadServices } from '../../state/services/servicesActions'


class Services extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    await this.props.loadServices(1)
    console.log(this.props)
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }


  render() {
    return <Container className="py-5">
      <Row className="justify-content-center">
        <Col sm="10" md="10" lg="8" xl="8">
          <h4>
            <span style={{color: 'var(--primary)'}}>
              {this.props.services.name}
            </span> Delivery Services</h4>
          <Form>
            { this.props.services.packageType === 'SELECT' &&
              <div>
                <Form.Label><b>Select your package size:</b></Form.Label>
                {
                  this.props.services.packages.map(p => <Form.Check
                    key={p.id}
                    id={p.id}
                    type="checkbox"
                    label={`${p.name}:  ${p.length}L x ${p.width}W x ${p.height}H cm, ${p.weight} kg - €${p.price.toFixed(2)}`}
                  />)
                }
              </div>
            }
          </Form>
        </Col>
      </Row>
    </Container>
  }
}

const mapStateToProps = (state) => {
  return {
    services: state.services
  }
}

Notification.propTypes = {
  services: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { loadServices })(Services)