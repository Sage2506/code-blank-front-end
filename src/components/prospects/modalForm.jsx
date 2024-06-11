import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import api from "../../services/codeblank_api";

export class ProspectModalForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attachmentIsMissing: false,
      attachments: [],
      rfcIsValid: true,
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
    let { name, middle_name, last_name, street, ext_number, neighborhood, zip_code, phone_number, rfc, status } = this.props.prospect;
    let isValid = true;
    if (!!this.props.prospect.id) {
      if (status === "2" && this.props.prospect.rejection_reason.length === 0) { isValid = false }
      if (isValid) {
        this.props.submit([...this.state.attachments])
        this.setState({
          attachmentIsMissing: false,
          attachments: [],
          rfcIsValid: true,
          statusReadOnly: false,
          validated: false
        });
      }
    } else {
      if (
        name?.length === 0 ||
        middle_name?.length === 0 ||
        street?.length === 0 ||
        ext_number?.length === 0 ||
        neighborhood?.length === 0 ||
        zip_code?.length < 5 ||
        phone_number?.length > 10 ||
        phone_number?.length < 7 ||
        rfc?.length < 12) {
        isValid = false
      }


      const rfcRegExp = /^([A-Z,Ñ,&]{3,4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])[A-Z|\d]{3})$/;
      const testResult = rfcRegExp.test(rfc)
      if (testResult) {
        this.setState({ rfcIsValid: true })
      } else {
        this.setState({ rfcIsValid: false })
        isValid = false
      }
      let hasAtLeastOneAttachment = false;
      this.state.attachments.forEach(attachment => {
        if (attachment.attachment_name.length !== 0) { hasAtLeastOneAttachment = true }
      })
      if (!hasAtLeastOneAttachment) {
        isValid = false
        this.setState({ attachmentIsMissing: true })
      } else {
        this.setState({ attachmentIsMissing: false })
      }
      if (isValid) {
        this.props.submit([...this.state.attachments])
        this.setState({
          attachmentIsMissing: false,
          attachments: [],
          rfcIsValid: true,
          statusReadOnly: false,
          validated: false
        });
      }
    }
  }

  validateLettersOnly = (event) => {
    let regexp = /^[a-zA-Z]+$/;
    if (event.key === " ") return true;
    this.validateRegexp(event, regexp)
  }

  validateNumbersOnly = (event) => {
    let regexp = /^[0-9]+$/;
    this.validateRegexp(event, regexp)
  }

  validateLettersAndNumbersOnly = (event) => {
    let regexp = /^[a-zA-Z0-9]+$/;
    if (event.key === " ") return true;
    this.validateRegexp(event, regexp)
  }

  validateSpecialChars = (event) => {
    let regexp = /^[a-zA-Z0-9,#:.]+$/;
    if (event.key === " ") return true;
    this.validateRegexp(event, regexp)
  }

  validateRegexp = (event, regexp) => {
    if (event.key === "Tab" || event.key === "Backspace") {
      return true
    }
    const result = regexp.test(event.key)
    if (result) {
      return true
    } else {
      event.preventDefault()
      return false;
    }
  }

  handleFileInputChange = (e, idx) => {
    const file = e.target.files[0];
    const fileName = e.target.files[0].name;
    let { attachments } = this.state
    attachments[idx] = { attachment_name: fileName, attachment: file }
    this.setState({ attachments });
  }

  isFormClear = () => {
    let clear = true
    let { name, middle_name, last_name, street, ext_number, neighborhood, zip_code, phone_number, rfc, files } = this.props.prospect;
    if (
      name?.length > 0 ||
      middle_name?.length > 0 ||
      street?.length > 0 ||
      ext_number?.length > 0 ||
      neighborhood?.length > 0 ||
      zip_code?.length > 0 ||
      phone_number?.length > 0 ||
      rfc?.length > 0
    ) { clear = false }
    if (clear) {
      this.state.attachments.forEach(attachment => {
        if (attachment.attachment_name.length > 0) {
          clear = false
        }
      })
    }
    return clear;
  }

  handleClose = () => {
    if (!!this.props.prospect.id || this.isFormClear()) {
      this.close();
    } else {
      const result = window.confirm("Al salir se perderá toda la captura!\n¿Seguro que desea salir?");
      if (result) {
        this.close();
      }
    }
  }

  close = () => {
    this.setState({ validated: false })
    this.props.close()
  }

  render() {
    let { validated } = this.state
    let { showModal, prospect, handleInputChange } = this.props;
    let { name, middle_name, last_name, street, ext_number, neighborhood, zip_code, phone_number, rfc, files, status, statusReadOnly, rejection_reason } = prospect;
    return (
      <Modal show={showModal} onHide={() => this.handleClose()} >
        <Modal.Header closeButton>
          <Modal.Title>Prospecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {!prospect.id &&
            <Form noValidate onSubmit={this.submit} >
              <Form.Group controlId="name" className="mb-3">
                <Form.Control
                  className={(validated && name?.length === 0) ? "is-invalid" : ""}
                  maxLength={150}
                  onChange={handleInputChange}
                  onKeyDown={this.validateLettersOnly}
                  onPaste={(e: any) => { e.preventDefault(); return false; }}
                  placeholder="Nombre"
                  type="text"
                  value={name || ""}
                />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="middle_name" className="mb-3">
                <Form.Control
                  className={(validated && middle_name?.length === 0) ? "is-invalid" : ""}
                  maxLength={150}
                  onChange={handleInputChange}
                  onKeyDown={this.validateLettersOnly}
                  onPaste={(e: any) => { e.preventDefault(); return false; }}
                  placeholder="Apellido materno"
                  type="text"
                  value={middle_name || ""}
                />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="last_name" className="mb-3">
                <Form.Control
                  maxLength={150}
                  onChange={handleInputChange}
                  onKeyDown={this.validateLettersOnly}
                  onPaste={(e: any) => { e.preventDefault(); return false; }}
                  placeholder="Apellido paterno"
                  type="text"
                  value={last_name || ""}
                />
              </Form.Group>
              <Form.Group controlId="street" className="mb-3">
                <Form.Control
                  className={(validated && street?.length === 0) ? "is-invalid" : ""}
                  maxLength={150}
                  onChange={handleInputChange}
                  onKeyDown={this.validateSpecialChars}
                  onPaste={(e: any) => { e.preventDefault(); return false; }}
                  placeholder="Calle"
                  type="text"
                  value={street || ""}
                />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="ext_number" className="mb-3">
                <Form.Control
                  className={(validated && ext_number?.length === 0) ? "is-invalid" : ""}
                  maxLength={150}
                  onChange={handleInputChange}
                  onKeyDown={this.validateNumbersOnly}
                  onPaste={(e: any) => { e.preventDefault(); return false; }}
                  placeholder="Numero"
                  type="text"
                  value={ext_number || ""}
                />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="neighborhood" className="mb-3">
                <Form.Control
                  className={(validated && neighborhood?.length === 0) ? "is-invalid" : ""}
                  maxLength={150}
                  onChange={handleInputChange}
                  onKeyDown={this.validateSpecialChars}
                  onPaste={(e: any) => { e.preventDefault(); return false; }}
                  placeholder="Colonia"
                  type="text"
                  value={neighborhood || ""}
                />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="zip_code" className="mb-3">
                <Form.Control
                  className={(validated && zip_code?.length === 0) ? "is-invalid" : ""}
                  maxLength={10}
                  onChange={handleInputChange}
                  onKeyDown={this.validateNumbersOnly}
                  onPaste={(e: any) => { e.preventDefault(); return false; }}
                  placeholder="Codigo postal"
                  type="text"
                  value={zip_code || ""}
                />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="phone_number" className="mb-3">
                <Form.Control
                  className={(validated && phone_number?.length < 7) ? "is-invalid" : ""}
                  maxLength={10}
                  minLength={7}
                  onChange={handleInputChange}
                  onKeyDown={this.validateNumbersOnly}
                  onPaste={(e: any) => { e.preventDefault(); return false; }}
                  placeholder="Telefono"
                  type="text"
                  value={phone_number || ""}
                />
                <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="rfc" className="mb-3">
                <Form.Control
                  className={(validated && !this.state.rfcIsValid) ? "is-invalid" : ""}
                  maxLength={13}
                  minLength={13}
                  onChange={handleInputChange}
                  placeholder="RFC"
                  type="text"
                  value={rfc || ""}
                />
                <Form.Control.Feedback type="invalid">
                  {this.state.rfcIsValid ? 'Este campo es obligatorio' : 'Por favor introduzca un RFC valido'}
                </Form.Control.Feedback>

              </Form.Group>
              <h2 className="is-invalid">Documentos</h2>
              {this.state.attachmentIsMissing && <div className="invalid-feedback">
                Por favor adjuntar almenos un archivo
              </div>}
              <Button onClick={() => this.addFileField()} className="mb-3" >Agregar</Button>
              {this.state.attachments.map((attachment, index) =>
                <Row key={`fileInput${index}`}>
                  {!attachment.attachment &&
                    <Form.Group as={Col} xs={8} controlId="attachment" className="mb-3" >
                      <Form.Control type="file" onChange={(event) => this.handleFileInputChange(event, index)} />
                    </Form.Group>
                  }
                  {!!attachment.attachment_name &&
                    <Form.Group as={Col} xs={8} controlId="attachment" className="mb-3" >
                      <Form.Control value={attachment.attachment_name} readOnly />
                    </Form.Group>
                  }
                  <Button as={Col} xs={4} className="mb-3 btn-danger" onClick={() => this.removeFileField(index)}>Eliminar</Button>
                </Row>
              )}
            </Form>
          }
          {!!prospect.id &&
            <Form>
              <p className="capitalize">Nombre: {name}</p>
              <p className="capitalize">Apellido paterno: {middle_name}</p>
              <p className="capitalize">Apellido materno {last_name}</p>
              <p className="capitalize">Calle: {street}</p>
              <p>Numero: {ext_number}</p>
              <p className="capitalize">Colonia: {neighborhood}</p>
              <p>Codigo postal: {zip_code}</p>
              <p>Telefono: {phone_number}</p>
              <p className="uppercase">RFC: {rfc}</p>
              <p className="capitalize">documentos:</p>
              {!!files && files.map(file =>
                <p key={`file_${file.id}`}>
                  <a href={`${api.baseURL}uploads/${file.name}`} target="_blank" >
                    {file.name}
                  </a>
                </p>
              )}
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
              {status === "2" && !statusReadOnly &&
                <Form.Group controlId="rejection_reason">
                  <Form.Control
                    className={(validated && rejection_reason?.length === 0) ? "is-invalid" : ""}
                    onChange={handleInputChange}
                    value={rejection_reason}
                    onKeyDown={this.validateSpecialChars}
                    placeholder="Motivo de rechazo"
                    type="text"
                  />
                  <Form.Control.Feedback type="invalid">
                  Este campo es obligatorio
                </Form.Control.Feedback>
                </Form.Group>
              }
              {status === 2 && statusReadOnly &&
                <p>{rejection_reason}</p>
              }
            </Form>
          }
        </Modal.Body>
        <Modal.Footer>
        <Button variant="danger" onClick={() => this.handleClose()}>
            Salir
          </Button>
          <Button variant="success" onClick={() => this.submit()}>
            Enviar
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