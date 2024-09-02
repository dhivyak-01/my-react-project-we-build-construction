import React from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupForm = () => {
  return (
    <Container className="min-h-screen flex items-center justify-center bg-cover bg-center bg-registerbg" >
      <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg backdrop-blur-md max-w-lg w-full">
        <h2 className="text-center text-gray-800 mb-6 text-2xl font-semibold">SignUp Form</h2>
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="fname">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="Johnny" required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lname">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Nelson" required />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="dob">
                <Form.Label>Date</Form.Label>
                <Form.Control type="date" required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Gender</Form.Label>
                <div className="d-flex flex-column">
                  <Form.Check type="radio" id="Male" label="Male" name="gender" value="Male" required />
                  <Form.Check type="radio" id="Female" label="Female" name="gender" value="Female" required />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" required />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="phoneno">
                <Form.Label>Phone No</Form.Label>
                <Form.Control type="tel" required />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>city</Form.Label>
            <Form.Control as="select" required>
              <option disabled selected>Select city</option>
              <option value="Full Stack">...........</option>
              <option value="Frontend">...........</option>
              <option value="Backend">...........</option>
              <option value="Machine Learning">...........</option>
              <option value="Digital Marketing">...........</option>
            </Form.Control>
          </Form.Group>
          <Button type="submit" className="w-full !bg-customorange border-0 text-white">Submit</Button>
        </Form>
      </div>
    </Container>
  );
};

export default SignupForm;
