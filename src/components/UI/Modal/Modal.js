import React from 'react'
import { Modal, Button } from 'react-bootstrap'

const NewModal = (props) => {
    return (
        <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
            size={props.size}
        >
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={props.saveChanges}>Add</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default NewModal