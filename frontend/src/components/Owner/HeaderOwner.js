import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import {useNavigate} from "react-router-dom";

export default function HeaderOwner() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        localStorage.removeItem('role'); // Remove token from localStorage
        navigate('/login'); // Redirect to login page
    };

    return (
        <div>
            <Navbar collapseOnSelect expand="lg" bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="#">Owner</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/owner/vehicles">Vehicles</Nav.Link>
                            <Nav.Link href="/owner/requests">My requests</Nav.Link>
                        </Nav>
                        <Nav>
                            <Button variant="outline-light" className="my-2 my-sm-0" onClick={handleLogout}>Sign out</Button>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}
