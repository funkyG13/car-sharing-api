import React from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function NotAuthorized() {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/');
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-md-center">
                <Col xs lg="6">
                    <Alert variant="danger">
                        <Alert.Heading>Not Authorized</Alert.Heading>
                        <p>
                            You do not have permission to view this page.
                        </p>
                        <Button onClick={handleLoginClick}>Go to Main Page</Button>
                    </Alert>
                </Col>
            </Row>
        </Container>
    );
}
