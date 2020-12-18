import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../../components/Layout/Layout'
import { Form, Button, Container, Row, Col } from 'react-bootstrap'
import Input from '../../components/UI/Input/Input'
import { login } from '../../store/actions/authActions'
import { Redirect } from 'react-router-dom'

const Signin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [error, setError] = useState('')

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)

    const userLogin = (e) => {
        e.preventDefault()
        const user = {
            email, password
        }
        dispatch(login(user))
    }

    if (auth.authenticated) {
        return <Redirect to="/" />
    }

    return (
        <Layout>
            <Container style={{ marginTop: "80px" }}>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={userLogin}>
                            <Input
                                controlId="email"
                                label="Email Address"
                                type="email"
                                placeholder="Enter email"
                                message="We'll never share your email with anyone else."
                                value={email}
                                onChange={(event) => {setEmail(event.target.value)}}
                            />
                            <Input
                                controlId="password"
                                label="Password"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(event) => {setPassword(event.target.value)}}
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


export default Signin