import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import Input from '../../components/UI/Input/Input'
import { signup } from '../../store/actions/signupActions'


const Signup = () => {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const auth = useSelector(state => state.auth)
    const signupState = useSelector(state => state.signup)
    const dispatch = useDispatch()
    const userSignup = (e) => {
        e.preventDefault()
        const user = {
            firstName, lastName, email, password
        }
        dispatch(signup(user))
    }

    if (auth.authenticated) {
        return <Redirect to="/" />
    }

    if (signupState.loading) {
        return <p>Loading...</p>
    }

    return (
        <Layout>
            <Container style={{ marginTop: "80px" }}>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userSignup}>
                            <Row>
                                <Col>
                                    <Input
                                        controlId="firstName"
                                        label="First Name"
                                        type="text"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={ (event) => setFirstName(event.target.value)}
                                    />
                                </Col>
                                <Col>
                                    <Input
                                        controlId="lastName"
                                        label="Last Name"
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={ (event) => setLastName(event.target.value) }
                                    /></Col>
                            </Row>
                            <Input
                                controlId="email"
                                label="Email Address"
                                type="email"
                                placeholder="Enter email"
                                message="We'll never share your email with anyone else."
                                value={email}
                                onChange={ (event) => setEmail(event.target.value) }
                            />
                            <Input
                                controlId="password"
                                label="Password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={ (event) => setPassword(event.target.value) }
                            />
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Signup