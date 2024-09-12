import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import requestCallBackData from "./callbackjson"

const RequestCallBack = () => {
  return (
    <Container fluid className="py-6 px-5">
      <Row className="gx-5">
        <Col lg={4} className="mb-5 mb-lg-0">
          <div className="mb-4">
            <h1 className="text-4xl font-bold uppercase mb-4">
              {requestCallBackData.header.title}
              <span className="text-customorange"> {requestCallBackData.header.highlight}</span>
            </h1>
          </div>
          <p className="mb-5">{requestCallBackData.description}</p>
          <Button variant="" className="py-3 px-5 !bg-customorange text-white">
            {requestCallBackData.buttonText}
          </Button>
        </Col>
        <Col lg={8}>
          <div className="bg-gray-100 text-center p-5 rounded-lg">
            <Form>
              <Row className="g-3">
                {requestCallBackData.formFields.map((field, index) => (
                  <Col xs={12} sm={field.type === "textarea" ? 12 : 6} key={index}>
                    {field.type === "textarea" ? (
                      <Form.Control
                        as="textarea"
                        rows={field.rows}
                        placeholder={field.placeholder}
                        className="border-0 py-3"
                      />
                    ) : (
                      <Form.Control
                        type={field.type}
                        placeholder={field.placeholder}
                        style={field.style}
                        className="border-0 py-3"
                      />
                    )}
                  </Col>
                ))}
                <Col xs={12}>
                  <Button variant="!bg-customorange" className="w-full py-3 !bg-customorange text-white">
                    {requestCallBackData.submitButtonText}
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RequestCallBack;
