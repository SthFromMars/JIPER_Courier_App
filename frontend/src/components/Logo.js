import Row from 'react-bootstrap/Row';
import React from 'react';
import './Logo.css';

export default function Logo() {
  return (
    <Row className="py-5 justify-content-center">
      {/* TODO: Replace this garbage with an actual logo if we get around to making one */}
      <h1 className="display-4 logo-text " >Courier</h1>
      <h1 className="display-4 logo-text bg-primary text-white">App</h1>
    </Row>
  );
}