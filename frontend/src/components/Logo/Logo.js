import Row from 'react-bootstrap/Row';
import React from 'react';
import './Logo.css';

export default function Logo(props) {
  return (
    <Row className={`justify-content-center ${props.small ? '' : 'py-5'}`} noGutters={true}>
      {/* TODO: Replace this garbage with an actual logo if we get around to making one */}
      <h1 className={`display-4 my-0 ${props.small ? 'logo-text-sm' : 'logo-text'}`} >Courier</h1>
      <h1 className={`display-4 my-0 bg-primary text-white ${props.small ? 'logo-text-sm' : 'logo-text'}`}>App</h1>
    </Row>
  );
}