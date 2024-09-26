import React ,{useState}from "react";
import { useLocation, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Row, Col, Form, Card } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import data from "./data.json"; // Import JSON data
import { Icon } from "@iconify/react";
import iconMap from "../assets/data"; // Adjust import path for your icon map
import { BsGeoAlt } from 'react-icons/bs';
import buildingsIcon from "@iconify/icons-bi/buildings";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram, FaPhoneAlt, FaEnvelope, FaAngleRight } from 'react-icons/fa';
import './ContactInfo.css';
// Import images
import carousel_1 from "../assets/img/carousel-1.jpg";
import carousel_2 from "../assets/img/carousel-2.jpg";
import about from "../assets/img/about.jpg";
import signature from "../assets/img/signature.jpg";
import service_1 from "../assets/img/service-1.jpg";
import service_2 from "../assets/img/service-2.jpg";
import service_3 from "../assets/img/service-3.jpg";
import service_4 from "../assets/img/service-4.jpg";
import service_5 from "../assets/img/service-5.jpg";
import service_6 from "../assets/img/service-6.jpg";
import portfolio_1 from '../assets/img/portfolio-1.jpg';
import portfolio_2 from '../assets/img/portfolio-2.jpg';
import portfolio_3 from '../assets/img/portfolio-3.jpg';
import portfolio_4 from '../assets/img/portfolio-4.jpg';
import portfolio_5 from '../assets/img/portfolio-5.jpg';
import portfolio_6 from '../assets/img/portfolio-6.jpg';
import team_1 from "../assets/img/team-1.jpg";
import team_2 from "../assets/img/team-2.jpg";
import team_3 from "../assets/img/team-3.jpg";
import team_4 from "../assets/img/team-4.jpg";
import testimonial from "../assets/img/testimonial.jpg";
import testimonial_1 from "../assets/img/testimonial-1.jpg";
import testimonial_2 from "../assets/img/testimonial-2.jpg";
import blog_1 from "../assets/img/blog-1.jpg";
import blog_2 from "../assets/img/blog-2.jpg";
import blog_3 from "../assets/img/blog-3.jpg";
import user from "../assets/img/user.jpg";

const ContactSection = ({ data }) => {
    return (
      <div className="container mt-5">
        <div className="row">
          {data.contactInfo.map((info) => (
            <div className="col-md-4 mb-3" key={info.id}>
              <div className="d-flex align-items-center">
                <i className={`bi bi-${info.location_icon} me-3`}></i>
                <div>
                  <h5 className="h5">{info.heading}</h5>
                  <p className="text-muted">{info.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };



  const NavbarComponent = ({ data }) => {
    const { brand, links, dropdown } = data.navbar[0];
  
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">{brand}</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {links.map((link) => (
                <li className="nav-item" key={link.to}>
                  <a className="nav-link" href={link.to}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {dropdown.items.map((item) => (
                <li className="nav-item dropdown" key={item.to}>
                  <a
                    className="nav-link dropdown-toggle"
                    href={item.to}
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {dropdown.title}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <a className="dropdown-item" href={item.to}>
                        {item.label}
                      </a>
                    </li>
                  </ul>
                </li>
              ))}
              {data.navbar[0].button.map((button) => (
                <li className="nav-item" key={button.to}>
                  <a className="btn btn-outline-light" href={button.to}>
                    {button.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
  };


  const CarouselFadeExample = ({ data }) => {
    const carouselData = data['1']; // Assuming data uses key as ID
  
    return (
      <Carousel fade className="mt-5">
        <Carousel.Item key={carouselData.icon}>
          <img
            className="d-block w-100"
            src={`images/${carouselData.image}.jpg`} // Assuming images are in images folder
            alt={carouselData.heading}
          />
          <Carousel.Caption>
            <h3>{carouselData.heading}</h3>
            <p>{carouselData.caption}</p>
          </Carousel.Caption>
        </Carousel.Item>
        {/* Add more items as needed using data */}
      </Carousel>
    );
  };


  
  const TheLeader = ({ data }) => {
    const leaderData = data.theleader[0];
  
    return (
      <Container fluid className="py-6 px-5">
        <Row className="g-5">
          <Col lg={7}>
            <h1 className="display-5 text-uppercase mb-4">{leaderData.title}</h1>
            <h4 className="text-muted mb-4">{leaderData.description_1}</h4>
            <p className="text-muted">{leaderData.description_2}</p>
            <ul className="list-unstyled">
              <li className="d-flex align-items-center">
                <i className="bi bi-check me-3"></i>
                {leaderData.ponit_1}
              </li>
              <li className="d-flex align-items-center">
                <i className="bi bi-check me-3"></i>
                {leaderData.ponit_2}
              </li>
              <li className="d-flex align-items-center">
                <i className="bi bi-check me-3"></i>
                {leaderData.ponit_3}
              </li>
            </ul>
            <p className="text-muted">{leaderData.description_3}</p>
            <img src={leaderData.imagesign} alt="Signature" className="img-fluid" />
          </Col>
          <Col lg={5}>
            <div className="position-relative bg-dark h-100">
              <img src={leaderData.imagegirl} alt="Leader in Construction" className="img-fluid w-100 h-100 object-cover" />
            </div>
          </Col>
        </Row>
      </Container>
    );
  };
  
  
  const Thebest = ({ data }) => {
    const bestData = data.thebest;
  
    return (
      <Container fluid className="bg-light py-6 px-5">
        <div className="text-center mx-auto mb-5">
          <h1 className="display-5 text-uppercase mb-4">{bestData.title}</h1>
        </div>
        <Row className="g-5">
          {bestData.fields.map((field) => (
            <Col lg={4} md={6} key={field.id}>
              <div className="card text-center">
                <img src={`images/${field.image}.jpg`} alt={field.contenttitle} className="card-img-top" />
                <div className="card-body">
                  <h4 className="card-title">{field.contenttitle}</h4>
                  <p className="card-text">{field.content}</p>
                  <a href="#" className="btn btn-primary">Read More</a>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    );
  };
  
  
  const RequestCallBack = ({ data }) => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      date: '',
      time: '',
      message: ''
    });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here
      console.log(formData);
    };
  
    const { header, description, buttonText, formFields } = data.requestCallBackData;
  
    return (
      <Container fluid className="py-6 px-5">
        <Row className="gx-5">
          <Col lg={4} className="mb-5 mb-lg-0">
            <h1 className="display-5 text-uppercase mb-4">{header.title}</h1>
            <p className="text-muted">{description}</p>
            <Button variant="primary">{buttonText}</Button>
          </Col>
          <Col lg={8}>
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                {formFields.map((field) => (
                  <Col xs={12} sm={field.type === "textarea" ? 12 : 6} key={field.id}>
                    <Form.Control type={field.type} placeholder={field.placeholder} onChange={handleChange} />
                  </Col>
                ))}
                <Col xs={12}>
                  <Button variant="primary" type="submit">
                    {data.requestCallBackData.submitButtonText}
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  };
  
   
  const Popular = ({ data }) => {
    const popularData = data.popularData;
  
    return (
      <Container fluid className="bg-light py-6 px-5">
        <div className="text-center mx-auto mb-5">
          <h1 className="display-5 text-uppercase mb-4">{popularData.title}</h1>
        </div>
        <Row className="g-5">
          {popularData.fields.map((field) => (
            <Col lg={4} md={6} key={field.id}>
              <div className="card">
                <img src={`images/${field.image}.jpg`} alt={field.contenttitle} className="card-img-top" />
                <div className="card-body">
                  <h4 className="card-title">{field.contenttitle}</h4>
                  <p className="card-text">
                    <i className="bi bi-geo-alt me-2"></i>
                    {field.content}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    );
  };
  
  
  
  const Professional = ({ data }) => {
    const professionalData = data.professionalteam;
  
    return (
      <Container fluid className="bg-white py-6 px-5">
        <div className="text-center mx-auto mb-5">
          <h1 className="display-5 text-uppercase mb-4">{professionalData.title}</h1>
        </div>
        <Row className="g-5">
          {professionalData.fields.map((field) => (
            <Col xl={3} lg={4} md={6} key={field.id}>
              <div className="card">
                <img src={`images/${field.image}.jpg`} alt={field.contenttitle} className="card-img-top" />
                <div className="card-body">
                  <h4 className="card-title">{field.contenttitle}</h4>
                  <p className="card-text">{field.content}</p>
                  <ul className="list-unstyled">
                    {professionalData.icons.map((icon) => (
                      <li key={icon.name}>
                        <a href="#" className="text-muted">
                          <i className={`bi bi-${icon.name}`}></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    );
  };
  
  
const Testimonials = ({ data }) => {
  const testimonialData = data.tmonials;

  return (
    <div className="container-fluid bg-light py-6 px-3 px-sm-4 px-md-5">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: "800px" }}>
        <h1 className="display-5 text-uppercase mb-4 font-roboto !font-semibold">
          What Our <span className="text-customorange">Happy Clients</span> Say!!!
        </h1>
      </div>
      <div className="row gx-0 align-items-center position-relative">
        <div className="col-xl-4 col-lg-5 d-none d-lg-block position-relative">
          <img
            className="img-fluid w-100 h-100 background-image"
            src={testimonialData.imgage} // Ensure imgage matches the key in testimageMap
            alt="Background"
            style={{ objectFit: "cover", height: "100%" }}
          />
        </div>
        <div className="col-xl-8 col-lg-7 col-md-12 position-relative">
          <Carousel interval={5000} controls={true} indicators={false}>
            {testimonialData.fields.map((testimonial) => (
              <Carousel.Item key={testimonial.id}>
                <div className="row gx-0 align-items-center testimonial py-4 px-3 px-md-4">
                  <div className="col-md-5 d-flex justify-content-center mb-4 mb-md-0">
                    <img
                      className="img-fluid bg-customgray p-3"
                      src={testimonialData.image} // Ensure testimonial.image matches the key in testimageMap
                      alt={testimonial.name}
                      style={{
                        width: "100%",
                        maxWidth: "292px",
                        height: "auto",
                        objectFit: "cover"
                      }}
                      onError={(e) => {
                        e.target.src = 'path/to/default_image.jpg'; // Replace with your default image path
                      }}
                    />
                  </div>
                  <div className="col-md-7">
                    <h4 className="text-uppercase mb-2 font-roboto !font-semibold">
                      {testimonial.name}
                    </h4>
                    <p className="font-open-sans text-customwhite">
                      {testimonial.profession}
                    </p>
                    <p className="fs-5 mb-0 font-open-sans text-customwhite">
                      {testimonial.quote}
                    </p>
                    <ul className="list-unstyled">
                      {testimonialData.icons.map((icon) => (
                        <li key={icon.name}>
                          <i className="text-customorange me-2" aria-hidden="true">
                            {iconMap[icon.name]}
                          </i>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};




  const MainComponentparttwo = () => {
    return (
      <>
        <ContactSection />
        <NavbarComponent />
        <CarouselFadeExample />
        <TheLeader />
        <Thebest />
        <RequestCallBack />
        <Popular />
        <Professional />
        <Testimonials />
        {/* <BlogSection /> */}
        {/* <Footer /> */}
      </>
    );
  };

  export default MainComponentparttwo;

// import React from 'react';
// import { BiMap, BiMailSend, BiPhone } from 'react-icons/bi';
// import contactData from './data.json'; // Adjust the path if necessary
// import './ContactInfo.css'; // Ensure this path is correct

// const ContactInfo = () => {
//     const contactInfo = contactData.contactInfo;

//     const icons = {
//         location: <BiMap />,
//         email: <BiMailSend />,
//         phone: <BiPhone />
//     };

//     return (
//         <div className="contact-container">
//             {contactInfo.map(item => (
//                 <div className="contact-item" key={item.id}>
//                     {icons[item.location_icon] || icons[item.email_icon] || icons[item.phone_icon]}
//                     <div className="text">
//                         <h6 className="title">{item.heading}</h6>
//                         <span>{item.description}</span>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default ContactInfo;
