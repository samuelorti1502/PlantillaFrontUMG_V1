import { useState, useContext } from 'react';
import {Button, Modal} from 'react-bootstrap';
import { ContentContext } from './context';
//import Modal from 'react-bootstrap/Modal';

function Example() {
  const {show, handleShow, handleClose} = useContext(ContentContext)

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Nuevo Usuario
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;