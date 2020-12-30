import React from 'react'
import { Form } from 'react-bootstrap'

const Input = (props) => {
    let input = null
    switch (props.type) {
        case "select":
            input = (
                <Form.Group>
                    <label for={props.id}>{props.label}</label>
                    <select
                        name={props.id}
                        id={props.id}
                        className="form-control"
                        value={props.value}
                        onChange={props.onChange}>
                        <option disabled selected value="">{props.placeholder}</option>
                        <option value="">None</option>
                        {props.options.length > 0 ? props.options.map(option => {
                            return <option
                                key={option.name}
                                value={option.id}
                            >{option.name}</option>
                        }) : null
                    }
                    </select>
                </Form.Group>
            )
            break
        default:
            input = (
                <Form.Group controlId={props.controlId}>
                    {props.label && <Form.Label>{props.label}</Form.Label>}
                    <Form.Control
                        type={props.type}
                        placeholder={props.placeholder}
                        value={props.value}
                        onChange={props.onChange} />
                    {props.message ? <Form.Text className="text-muted"> {props.message} </Form.Text> : null}
                </Form.Group>
            )
    }
    return input
}

export default Input