import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

export class ProspectModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachments: [],
      statusReadOnly: false,
      validated: false
    }
  }

  addFileField = () => {
    this.setState({ attachments: [...this.state.attachments, { attachment: "", attachment_name: "" }] })
  }

  removeFileField = (idx) => {
    let { attachments } = this.state
    attachments.splice(idx, 1)
    this.setState({ attachments })
  }

  submit = () => {
    this.setState({ validated: true });
    let { name, middle_name, last_name, street, ext_number, neighborhood, zip_code, phone_number, rfc } = this.props.prospect;
    if (
      name?.length > 0 &&
      middle_name?.length > 0 &&
      street?.length > 0 &&
      ext_number?.length > 0 &&
      neighborhood?.length > 0 &&
      zip_code?.length > 0 &&
      phone_number?.length > 0 &&
      rfc?.length > 0) {
      this.props.submit([...this.state.attachments])
      this.setState({ validated: false, attachments: [] })
    } else {
      console.log("something is missing")
    }
  }

  handleFileInputChange = (e, idx) => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;
    let { attachments } = this.state
    attachments[idx] = { attachment_name: fileName, attachment: file }
    this.setState({ attachments });
  }

  close = () => {
    this.setState({ validated: false })
    this.props.close()
  }

  render() {
    let { validated } = this.state
    let { showModal, prospect, handleInputChange } = this.props;
    let { name, middle_name, last_name, street, ext_number, neighborhood, zip_code, phone_number, rfc, files, status, statusReadOnly } = prospect;
    return (
      <Modal show={showModal} onHide={() => this.close()} >
        <Modal.Header closeButton>
          <Modal.Title>Formulario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!prospect.id &&
            <Form onSubmit={this.submit} validated={validated}>
              <Form.Group controlId="name">
                <Form.Control
                  type="text"
                  required
                  value={name || ""}
                  placeholder="Nombre"
                  maxLength={150}
                  onChange={handleInputChange}
                  isValid={name?.length > 0} />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="middle_name">
                <Form.Control
                  type="text"
                  required
                  value={middle_name || ""}
                  placeholder="Apellido materno"
                  onChange={handleInputChange}
                  maxLength={150}
                  isValid={middle_name?.length > 0} />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="last_name">
                <Form.Control
                  type="text"
                  value={last_name || ""}
                  placeholder="Apellido paterno"
                  maxLength={150}
                  onChange={handleInputChange} />
              </Form.Group>
              <Form.Group controlId="street">
                <Form.Control
                  type="text"
                  required
                  value={street || ""}
                  placeholder="Calle"
                  onChange={handleInputChange}
                  maxLength={150}
                  isValid={street?.length > 0} />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="ext_number">
                <Form.Control
                  type="text"
                  required
                  value={ext_number || ""}
                  placeholder="Numero"
                  onChange={handleInputChange}
                  maxLength={150}
                  isValid={ext_number?.length > 0} />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="neighborhood">
                <Form.Control
                  type="text"
                  required
                  value={neighborhood || ""}
                  placeholder="Colonia"
                  onChange={handleInputChange}
                  maxLength={150}
                  isValid={neighborhood?.length > 0} />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="zip_code">
                <Form.Control
                  type="text"
                  required
                  value={zip_code || ""}
                  placeholder="Codigo postal"
                  onChange={handleInputChange}
                  maxLength={10}
                  isValid={zip_code?.length > 0} />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="phone_number">
                <Form.Control
                  type="text"
                  required
                  value={phone_number || ""}
                  placeholder="Telefono"
                  onChange={handleInputChange}
                  maxLength={10}
                  minLength={7}
                  isValid={phone_number?.length > 0} />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="rfc">
                <Form.Control
                  type="text"
                  required
                  value={rfc || ""}
                  placeholder="RFC"
                  onChange={handleInputChange}
                  maxLength={12}
                  minLength={12} />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>

              </Form.Group>
              <Button onClick={() => this.addFileField()}>Documento (+)</Button>
              {this.state.attachments.map((attachment, index) =>
                <Row key={`fileInput${index}`}>
                  {!attachment.attachment &&
                    <Form.Group as={Col} xs={8} controlId="attachment" className="mb-3">
                      <Form.Control type="file" onChange={(event) => this.handleFileInputChange(event, index)} />
                    </Form.Group>
                  }
                  {!!attachment.attachment_name &&
                    <Form.Group as={Col} xs={8} controlId="attachment" className="mb-3">
                      <Form.Control value={attachment.attachment_name} readOnly className="mb-3" />
                    </Form.Group>
                  }
                  <Button as={Col} xs={4} onClick={() => this.removeFileField(index)}> remover</Button>
                </Row>
              )}
            </Form>
          }
          {!!prospect.id &&
            <Form>
              <p>Nombre: {name}</p>
              <p>Apellido paterno: {middle_name}</p>
              <p>Apellido materno {last_name}</p>
              <p>Calle: {street}</p>
              <p>Numero: {ext_number}</p>
              <p>Colonia: {neighborhood}</p>
              <p>Codigo postal: {zip_code}</p>
              <p>Telefono: {phone_number}</p>
              <p>RFC: {rfc}</p>

              {!!files && files.map(file =>
                <p key={`file_${file.id}`}>
                  <a href={`http://localhost:4200/uploads/${file.name}`} target="_blank" >
                    {file.name}
                  </a>
                </p>
              )}
              {statusReadOnly.toString()}
              <Form.Group controlId="status">
                <Form.Select value={status} disabled={statusReadOnly}
                  onChange={handleInputChange}>
                  <option value={0}>
                    Enviado
                  </option>
                  <option value={1}>
                    Autorizado
                  </option>
                  <option value={2}>
                    Rechazado
                  </option>
                </Form.Select>
              </Form.Group>

            </Form>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.submit()}>
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