import React from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import Layout from '../../components/Layout/Layout'
import classes from './Home.module.css'

const Home = () => {
    return (
        <Layout>
            <Container fluid>
                <Row >
                    <Col md={2} className={classes.sidebar}>Side Bar</Col>
                    <Col md={10} className={classes.container}>Container</Col>
                </Row>
            </Container>
        </Layout>
    )
}

export default Home