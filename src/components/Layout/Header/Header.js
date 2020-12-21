import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Nav, Navbar, Container } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { logout } from '../../../store/actions/authActions'

const Header = () => {
  const auth = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const authLinks = (
    <Nav>
      <li className="nav-item">
        <NavLink to="/signin" className="nav-link">Sign in</NavLink>
      </li>
      <li className="nav-item">
        <NavLink to="/signup" className="nav-link">Sign up</NavLink>
      </li>
    </Nav> 
  )
  const loggedInLinks = (
    <Nav>
      <li className="nav-item">
        <span 
        style={{ cursor: "pointer" }} 
        onClick={() => {dispatch(logout())}} 
        className="nav-link">Sign Out</span>
      </li>
    </Nav> 
  )

  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
      <Container fluid>
        {/* <Navbar.Brand href="#home">SEQUOIA</Navbar.Brand> */}
        <Link to="/" className="navbar-brand">SEQUOIA</Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
          </Nav>
          {auth.authenticated ? loggedInLinks : authLinks}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header