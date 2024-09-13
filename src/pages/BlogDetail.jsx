import React from "react";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import buildingsIcon from "@iconify/icons-bi/buildings";
import iconMap from "../assets/data";
// import {  } from "../assets/data";
import {
  quickcontact,
  navbar,
  blogDatadatail,
  plainTextData,
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
  InputGroup,
  FormControl,
  Image,
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
          about
        </h1>
        <div className="d-inline-flex text-white justify-content-center align-items-center">
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
            about
          </h6>
        </div>
      </Container>
    </div>
  );
};

const Blog = () => {
  const { blogDetail, comments, recentPosts, categories, tags } =
    blogDatadatail;

  return (
    <div className="container-fluid py-6 px-5">
      <Row className="g-5">
        <Col lg={8}>
          {/* Blog Detail */}
          <div className="mb-5">
            <Image
              src={blogDetail.image}
              className="img-fluid w-100 rounded mb-5"
            />
            <h1 className="text-uppercase mb-4">{blogDetail.title}</h1>
            {blogDetail.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          {/* Comments Section */}
          <div className="mb-5">
            <h3 className="text-uppercase mb-4">Comments</h3>
            {comments.map((comment) => (
              <div key={comment.id} className="d-flex mb-4">
                <Image
                  src={comment.image}
                  style={{ width: "45px", height: "45px" }}
                  roundedCircle
                />
                <div className="ps-3">
                  <h6>
                    <a href="#">{comment.user}</a>{" "}
                    <small>
                      <i>{comment.date}</i>
                    </small>
                  </h6>
                  <p>{comment.text}</p>
                  <Button variant="light" size="sm">
                    Reply
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Comment Form */}
          <div className="bg-light p-5">
            <h3 className="text-uppercase mb-4">Leave a comment</h3>
            <Form>
              <Row className="g-3">
                <Col xs={12} sm={6}>
                  <FormControl
                    type="text"
                    placeholder="Your Name"
                    className="bg-white border-0"
                    style={{ height: "55px" }}
                  />
                </Col>
                <Col xs={12} sm={6}>
                  <FormControl
                    type="email"
                    placeholder="Your Email"
                    className="bg-white border-0"
                    style={{ height: "55px" }}
                  />
                </Col>
                <Col xs={12}>
                  <FormControl
                    type="text"
                    placeholder="Website"
                    className="bg-white border-0"
                    style={{ height: "55px" }}
                  />
                </Col>
                <Col xs={12}>
                  <FormControl
                    as="textarea"
                    rows={5}
                    placeholder="Comment"
                    className="bg-white border-0"
                  />
                </Col>
                <Col xs={12}>
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 py-3"
                  >
                    Leave Your Comment
                  </Button>
                </Col>
              </Row>
            </Form>
          </div>
        </Col>

        {/* Sidebar */}
        <Col lg={4}>
          {/* Search Form */}
          <div className="mb-5">
            <InputGroup>
              <FormControl placeholder="Keyword" />
              <Button variant="primary">
                <i className="fa fa-search"></i>
              </Button>
            </InputGroup>
          </div>

          {/* Categories */}
          <div className="mb-5">
            <h3 className="text-uppercase mb-4">Categories</h3>
            <div className="d-flex flex-column justify-content-start bg-light p-4">
              {categories.map((category, index) => (
                <a key={index} className="h6 text-uppercase mb-4" href="#">
                  <i className="fa fa-angle-right me-2"></i>
                  {category}
                </a>
              ))}
            </div>
          </div>

          {/* Recent Posts */}
          <div className="mb-5">
            <h3 className="text-uppercase mb-4">Recent Posts</h3>
            <div className="bg-light p-4">
              {recentPosts.map((post) => (
                <div key={post.id} className="d-flex mb-3">
                  <Image
                    src={post.image}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <a
                    href="#"
                    className="h6 d-flex align-items-center bg-white text-uppercase px-3 mb-0"
                  >
                    {post.title}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-5">
            <h3 className="text-uppercase mb-4">Tag Cloud</h3>
            <div className="d-flex flex-wrap">
              {tags.map((tag, index) => (
                <Button key={index} variant="outline-dark" className="m-1">
                  {tag}
                </Button>
              ))}
            </div>
          </div>
          {/* Plain Text Section */}
          <div className="mb-5">
            <h3 className="text-uppercase mb-4">{plainTextData.title}</h3>
            <div className="bg-light rounded text-center p-4">
              <p>{plainTextData.content}</p>
              <Button
                href={plainTextData.buttonLink}
                variant="primary"
                className="py-2 px-4"
              >
                {plainTextData.buttonText}
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
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
    <div className="footer container-fluid position-relative bg-dark bg-light-radial text-white-50 py-6 px-5">
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
      className="bg-dark bg-light-radial text-white border-top !border-customorange px-0"
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

const Blogdetail = () => {
  return (
    <>
      <ContactSection />
      <NavbarComponent />
      <Aboute />
      <Blog />
      <Footer />
      <FooterBottom />
    </>
  );
};
export default Blogdetail;
