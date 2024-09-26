import React from "react";
import { Form, Button, Container, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Signin = () => {
  return (
    <Container fluid className="min-h-custom-screen flex items-center justify-center bg-cover bg-center bg-registerbg">
      <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg backdrop-blur-md max-w-lg w-full">
        <h2 className="text-center text-gray-800 mb-6 text-2xl font-semibold">
          User Login
        </h2>
        <Form>
          <Row className="mb-3">
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" required />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required />
          </Form.Group>
          <Button type="submit" className="w-full border-0 !bg-customorange text-white">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Signin;
