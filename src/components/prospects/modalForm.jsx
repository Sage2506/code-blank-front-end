import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button } from "react-bootstrap";

export class ProspectModalForm extends Component {

  render() {
    let { showModal, prospect, submit, close, handleInputChange } = this.props;
    let { name, middle_name, last_name, street, ext_number, neighborhood, zip_code, phone_number, rfc } = prospect;
    return (
      <Modal show={showModal} onHide={close} >
        <Modal.Header closeButton>
          <Modal.Title>Formulario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Control
                type="text"
                value={name}
                placeholder="Describe a dish name"
                onChange={handleInputChange}
                isValid={name !== ""} />
            </Form.Group>
            <Form.Group controlId="middle_name">
              <Form.Control
                type="text"
                value={middle_name}
                placeholder="Describe a dish middle_name"
                onChange={handleInputChange}
                isValid={middle_name !== ""} />
            </Form.Group>
            <Form.Group controlId="last_name">
              <Form.Control
                type="text"
                value={last_name}
                placeholder="Describe a dish last_name"
                onChange={handleInputChange}
                isValid={last_name !== ""} />
            </Form.Group>
            <Form.Group controlId="street">
              <Form.Control
                type="text"
                value={street}
                placeholder="Describe a dish street"
                onChange={handleInputChange}
                isValid={street !== ""} />
            </Form.Group>
            <Form.Group controlId="ext_number">
              <Form.Control
                type="text"
                value={ext_number}
                placeholder="Describe a dish ext_number"
                onChange={handleInputChange}
                isValid={ext_number !== ""} />
            </Form.Group>
            <Form.Group controlId="neighborhood">
              <Form.Control
                type="text"
                value={neighborhood}
                placeholder="Describe a dish neighborhood"
                onChange={handleInputChange}
                isValid={neighborhood !== ""} />
            </Form.Group>
            <Form.Group controlId="zip_code">
              <Form.Control
                type="text"
                value={zip_code}
                placeholder="Describe a dish zip_code"
                onChange={handleInputChange}
                isValid={zip_code !== ""} />
            </Form.Group>
            <Form.Group controlId="phone_number">
              <Form.Control
                type="text"
                value={phone_number}
                placeholder="Describe a dish phone_number"
                onChange={handleInputChange}
                isValid={phone_number !== ""} />
            </Form.Group>
            <Form.Group controlId="rfc">
              <Form.Control
                type="text"
                value={rfc}
                placeholder="Describe a dish rfc"
                onChange={handleInputChange}
                isValid={rfc !== ""} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => submit()}>
            Accept
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

const mapStateToProps = store => ({
})

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProspectModalForm)