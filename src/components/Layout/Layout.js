import React from 'react'
import Header from './Header/Header.js'
import { NavLink } from 'react-router-dom'
import { Row, Col, Container } from 'react-bootstrap'
import './Layout.css'

const layout = (props) => {
    return (
        <React.Fragment>
            <Header/>
            {props.sidebar ? (
                <Container fluid>
                    <Row >
                        <Col md={2} className="sidebar">
                            <ul>
                                <li><NavLink to="/" exact>Home</NavLink></li>
                                <li><NavLink to="/products">Products</NavLink></li>
                                <li><NavLink to="/orders">Orders</NavLink></li>
                                <li><NavLink to="/category">Category</NavLink></li>
                            </ul>
                        </Col>
                        <Col md={10} className="content">{props.children}</Col>
                    </Row>
                </Container>
            ): props.children }
        </React.Fragment>
    )
}

export default layout