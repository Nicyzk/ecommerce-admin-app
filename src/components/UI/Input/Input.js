import React from 'react'
import { Form } from 'react-bootstrap'

const input = (props) => {
    return (
        <Form.Group controlId={props.controlId}>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control 
            type={props.type} 
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.onChange} />
            {props.message ? <Form.Text className="text-muted"> {props.message} </Form.Text>: null}
        </Form.Group>
    )
}

export default input