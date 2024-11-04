import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import buildingsIcon from "@iconify/icons-bi/buildings";
import iconMap from "../assets/data";
import {
  quickcontact,
  navbar,
  contactrouter,
  footerData,
  footerBottomData,
} from "../assets/data";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Form,
} from "react-bootstrap";

const ContactSection = () => {
  return (
    <Container fluid className="px-5 hidden lg:block">
      <Row className="gx-5">
        {quickcontact.map((contact, index) => {
          const iconKey =
            contact.location_icon_1 ||
            contact.email_icon_2 ||
            contact.phone_icon_3;
          const IconComponent = iconMap[iconKey] || null;

          const heading =
            contact.heading_1 || contact.heading_2 || contact.heading_3;
          const description =
            contact.description_1 ||
            contact.description_2 ||
            contact.description_3;

          return (
            <Col
              key={contact.id}
              lg={4}
              className={`text-center py-3 px-4 ${
                index === 1 ? "border-x" : ""
              }`}
            >
              <div className="d-flex align-items-center justify-content-center">
                {IconComponent && (
                  <IconComponent className="text-customorange leading-7 text-40px me-3" />
                )}
                <div className="text-start">
                  <h6 className="uppercase font-roboto text-16px font-bold text-customblack mt-1">
                    {heading}
                  </h6>
                  <p className="text-customwhite font-open-sans text-16px mb-0">
                    {description}
                  </p>
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

const NavbarComponent = () => {
  const location = useLocation();
  const config = navbar[0];

  const isActive = (path) =>
    location.pathname === path ||
    (path === "/index" && location.pathname === "/");

  return (
    <Navbar
      variant="dark"
      expand="lg"
      className="sticky-top shadow-sm bg-light-radial p-0 bg-navebg"
      style={{ height: "97px" }}
    >
      <Navbar.Brand as={Link} to="/index" className="text-white">
        <div className="d-flex display-4 align-items-center">
          <Icon
            icon={iconMap.building_1}
            className="text-customorange ms-5 me-2 display-4"
          />
          <div className="text-white text-custom-1 sm:text-custom-2 md:text-custom-3 lg:text-custom-4 xl:text-custom-5 font-semibold font-roboto mb-0">
            {config.brand}
          </div>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="navbarScroll"
        style={{ marginRight: "23px" }}
      />
      <Navbar.Collapse
        id="navbarScroll"
        className="bg-light-radial bg-navebg"
        style={{ paddingLeft: "44px", paddingRight: "44px" }}
      >
        <Nav className="uppercase gap-4 d-flex ms-auto py-0 text-lg">
          {config.links.map((link, index) => (
            <Nav.Link
              key={index}
              as={Link}
              to={link.to}
              className={`nav-item nav-link !text-white hover:!text-customorange ${
                isActive(link.to) ? "active" : ""
              }`}
            >
              {link.label}
            </Nav.Link>
          ))}

          <NavDropdown
            title={
              <span className={`text-white hover:!text-customorange`}>
                {config.dropdown.title}
              </span>
            }
            id="navbarScrollingDropdown"
          >
            {config.dropdown.items.map((item, index) => (
              <NavDropdown.Item
                key={index}
                as={Link}
                to={item.to}
                className={`NavDropdownItem hover:!bg-Dropdownbg ${
                  isActive(item.to) ? "active" : ""
                }`}
              >
                {item.label}
              </NavDropdown.Item>
            ))}
          </NavDropdown>

          {config.links1.map((link, index) => (
            <Nav.Link
              key={index}
              as={Link}
              to={link.to}
              className={`hover:!text-customorange !text-white uppercase nav-item nav-link ${
                isActive(link.to) ? "active" : ""
              }`}
            >
              {link.label}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
      <NavDropdown
        title="Signin/Signup"
        id="signup-signin-dropdown"
        className="NavDropdownbtn text-white font-open-sans text-xl ms-3 !bg-customorange rounded-0 py-4 d-none px-5 d-lg-block"
        style={{ height: "97px", fontSize: "large", lineHeight: "49px" }}
      >
        {config.button.map((btn, index) => (
          <NavDropdown.Item
            key={index}
            as={Link}
            to={btn.to}
            className={`NavDropdownItem hover:!bg-Dropdownbg ${
              isActive(btn.to) ? "active" : ""
            }`}
          >
            {btn.label}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </Navbar>
  );
};

const Aboute = () => {
  return (
    <div className="container-fluid bg-gray-800 py-5 page-header d-flex flex-column justify-content-center align-items-center text-center">
      <Container>
        <h1 className="display-3 text-uppercase text-white mb-3 font-roboto !font-bold">
          CONTACT
        </h1>
        <div className="d-inline-flex text-white">
          <h6 className="text-uppercase m-0">
            <a
              href="/"
              className="text-customorange font-roboto hover:text-gray-400 no-underline"
            >
              Home
            </a>
          </h6>
          <h6 className="text-white m-0 px-3">/</h6>
          <h6 className="text-uppercase font-roboto text-white m-0 pt-1">
            CONTACT
          </h6>
        </div>
      </Container>
    </div>
  );
};

const ContactUs = () => {
  const { title, mapEmbedURL, buttonText } = contactrouter.contactSection;
  const [formData, setFormData] = useState({
    name: "", // Name
    email: "", // Email
    subject: "", // Subject
    message: "", // Message
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(`Changing ${name} to ${value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with data:", formData);

    try {
      const response = await fetch("http://localhost:5000/api/message/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`Network response was not ok: ${errorDetails}`);
      }

      const result = await response.json();
      console.log("Request submitted successfully:", result);
      alert("Your request has been submitted successfully!");
    } catch (error) {
      console.error("Error submitting request:", error);
      alert(`Error submitting your request: ${error.message}`);
    }
  };

  return (
    <Container fluid className="py-6 px-5">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
        <h1 className="display-5 text-uppercase mb-4 font-roboto !font-semibold">
          {title.split("Feel Free").map((part, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                <span className="text-customorange">Feel Free</span>
              )}
              {part}
            </React.Fragment>
          ))}
        </h1>
      </div>
      <Row className="gx-0 align-items-center">
        <Col lg={6} className="mb-5 mb-lg-0" style={{ height: "600px" }}>
          <iframe
            className="w-full h-full"
            src={mapEmbedURL}
            frameBorder="0"
            style={{ border: "0" }}
            allowFullScreen
            aria-hidden="false"
            tabIndex="0"
          ></iframe>
        </Col>
        <Col lg={6}>
          <div className="contact-form bg-light p-5">
            <Form onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Name"
                    onChange={handleChange}
                    style={{ height: "55px" }}
                    className="border-0"
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    onChange={handleChange}
                    style={{ height: "55px" }}
                    className="border-0"
                  />
                </Col>
                <Col xs={12}>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    placeholder="Subject"
                    onChange={handleChange}
                    style={{ height: "55px" }}
                    className="border-0"
                  />
                </Col>
                <Col xs={12}>
                  <Form.Control
                    as="textarea"
                    name="message"
                    value={formData.message}
                    rows={4}
                    placeholder="Your message"
                    onChange={handleChange}
                    className="border-0"
                  />
                </Col>
                <Col xs={12}>
                  <Button
                    className="w-full py-3 !bg-customorange border-0 text-uppercase"
                    variant="primary"
                    type="submit"
                  >
                    {buttonText}
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

const Footer = () => {
  const {
    quickLinks = [],
    popularLinks = [],
    icons = [],
    brand = {},
  } = footerData || {};

  return (
    <div className="footer container-fluid position-relative bg-navebg bg-light-radial text-white-50 py-6 px-5">
      <Container>
        <Row className="g-5 ">
          <Col lg={6} className=" pe-lg-5">
            <a href="index.html" className="navbar-brand">
              <h1 className="mb-4 display-4 !font-semibold font-roboto text-uppercase text-white d-flex justify-content-start">
                <Icon
                  icon={buildingsIcon}
                  className="me-2 !text-customorange"
                />
                {brand.name}
              </h1>
            </a>
            <p className="font-open-sans">{brand.description}</p>
            <p className="d-flex justify-content-start">
              {React.createElement(
                icons.find((icon) => icon.name === "location")?.component,
                { className: "me-2 mt-1.5" }
              )}
              {brand.address}
            </p>
            <p className="d-flex justify-content-start">
              {React.createElement(
                icons.find((icon) => icon.name === "footerphone")?.component,
                { className: "me-2 mt-1.5" }
              )}
              {brand.phone}
            </p>
            <p className="d-flex justify-content-start">
              {React.createElement(
                icons.find((icon) => icon.name === "envelope")?.component,
                { className: "me-2 mt-1.5" }
              )}
              {brand.email}
            </p>
            <div className="d-flex justify-content-start mt-4">
              {["twitter", "facebook", "linkedin", "instagram"].map(
                (name, index) => (
                  <a
                    className="btn btn-lg !bg-customorange btn-lg-square rounded-0 me-2"
                    href={`#${name}`}
                    key={index}
                  >
                    {React.createElement(
                      icons.find((icon) => icon.name === name)?.component,
                      { className: "text-white" }
                    )}
                  </a>
                )
              )}
            </div>
          </Col>
          <Col lg={6} className=" pe-lg-5">
            <Row className="g-5">
              <Col sm={6}>
                <h4 className="text-white text-uppercase mb-4">Quick Links</h4>
                <div className="d-flex flex-column justify-content-start">
                  {quickLinks.map((link, index) => (
                    <a
                      className="text-white-50 mb-2 d-flex align-items-center no-underline"
                      href={link.link}
                      key={index}
                    >
                      {React.createElement(
                        icons.find((icon) => icon.name === "angle_right")
                          ?.component,
                        { className: "me-2" }
                      )}
                      {link.text}
                    </a>
                  ))}
                </div>
              </Col>
              <Col sm={6}>
                <h4 className="text-white text-uppercase mb-4">
                  Popular Links
                </h4>
                <div className="d-flex flex-column justify-content-start">
                  {popularLinks.map((link, index) => (
                    <a
                      className="text-white-50 mb-2 d-flex align-items-center no-underline"
                      href={link.link}
                      key={index}
                    >
                      {React.createElement(
                        icons.find((icon) => icon.name === "angle_right")
                          ?.component,
                        { className: "me-2" }
                      )}
                      {link.text}
                    </a>
                  ))}
                </div>
              </Col>
              <Col sm={12}>
                <h4 className="text-white text-uppercase mb-4">Newsletter</h4>
                <Form className="w-100 d-flex">
                  <Form.Control
                    type="text"
                    placeholder="Your Email Address"
                    className="border-light rounded-0"
                    style={{ padding: "20px 30px" }}
                  />
                  <Button
                    variant=""
                    className="px-4 !bg-customorange text-white !font-semibold text-open-sans uppercase rounded-0"
                  >
                    Sign Up
                  </Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const FooterBottom = () => {
  return (
    <Container
      fluid
      className="bg-navebg bg-light-radial text-white footer-border-color px-0"
    >
      <Row className="d-flex flex-column flex-md-row justify-content-between">
        <Col md={7} className="py-4 px-5 text-center text-md-start">
          <p className="mb-0">
            ©{" "}
            <a className="text-customorange" href="#">
              {footerBottomData.siteName}
            </a>
            . All Rights Reserved.
          </p>
        </Col>
        <Col
          md={5}
          className="py-4 px-5 bg-customorange footer-shape position-relative text-center text-md-end"
        >
          <p className="mb-0">
            {footerBottomData.designCredit.text}{" "}
            <a className="text-dark" href={footerBottomData.designCredit.link}>
              {footerBottomData.designCredit.linkText}
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

const Contact = () => {
  return (
    <>
      <ContactSection />
      <NavbarComponent />
      <Aboute />
      <ContactUs />
      <Footer />
      <FooterBottom />
    </>
  );
};
export default Contact;
