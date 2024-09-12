// src/test/testy.jsx
import React from 'react';
import { Carousel } from 'react-bootstrap';
import { tmonials } from './json';  // Named import
import 'bootstrap/dist/css/bootstrap.min.css';


const Testimonials = () => {
  return (
    <div className="container-fluid bg-light py-6 px-5">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
        <h1 className="display-5 text-uppercase mb-4">
          What Our <span className="text-primary">Happy Clients</span> Say!!!
        </h1>
      </div>
      <div className="row gx-0 align-items-center">
        <div className="col-xl-4 col-lg-5 d-none d-lg-block">
          <img className="img-fluid w-100 h-100" src="img/testimonial.jpg" alt="Testimonial" />
        </div>
        <div className="col-xl-8 col-lg-7 col-md-12">
          <div className="bg-light p-3">
            <Carousel>
              {tmonials.map((testimonial) => (
                <Carousel.Item key={testimonial.id}>
                  <div className="row gx-4 align-items-center">
                    <div className="col-xl-4 col-lg-5 col-md-5">
                      <img
                        className="img-fluid w-100 h-100 bg-light p-lg-3 mb-4 mb-md-0"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                    </div>
                    <div className="col-xl-8 col-lg-7 col-md-7">
                      <h4 className="text-uppercase mb-0">{testimonial.name}</h4>
                      <p>{testimonial.profession}</p>
                      <p className="fs-5 mb-0">
                        <i className="fa fa-2x fa-quote-left text-primary me-2" aria-hidden="true"></i>
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;  // Default export for the Testimonials component
