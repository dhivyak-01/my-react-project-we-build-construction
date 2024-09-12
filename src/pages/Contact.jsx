import React from 'react';
import { Container } from 'react-bootstrap';

const Contact = () => {
  return (
    <div className="container-fluid bg-gray-800 py-5 page-header">
      <Container>
        <h1 className="display-3 text-uppercase text-white mb-3 font-roboto !font-bold">Testimonial</h1>
        <div className="d-inline-flex text-white">
          <h6 className="text-uppercase m-0">
            <a href="/" className="text-customorange font-roboto hover:text-gray-400 no-underline">Home</a>
          </h6>
          <h6 className="text-white m-0 px-3">/</h6>
          <h6 className="text-uppercase font-roboto text-white m-0 pt-1">Testimonial</h6>
        </div>
      </Container>
    </div>
  );
};

export default Contact;
