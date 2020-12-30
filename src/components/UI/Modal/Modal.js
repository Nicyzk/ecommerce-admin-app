import React from 'react'
import { Modal, Button } from 'react-bootstrap'
import classes from './Modal.module.css'

const NewModal = (props) => {


    return (
        <Modal
            className={classes.modal}
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
            size={props.size}
        >
            <Modal.Header className={classes.modalHeader} closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
            {props.buttons ? props.buttons.map(btn => <Button variant={btn.variant} onClick={btn.onClick}>{btn.label}</Button>) : [
            <Button variant="secondary" onClick={props.handleClose}>
                Close
            </Button>,
            <Button variant="primary" onClick={props.saveChanges}>Save Changes</Button>]
            }
            </Modal.Footer>
        </Modal>
    )
}

export default NewModal