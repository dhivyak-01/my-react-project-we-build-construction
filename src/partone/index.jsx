import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import data from "./data.json"; // Import JSON data
import { Icon } from "@iconify/react";
import iconMap from "../assets/data"; // Adjust import path for your icon map

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

const NavbarComponent = () => {
  const location = useLocation();
  const config = data.navbar[0];

  const isActive = (path) =>
    location.pathname === path ||
    (path === "/" && location.pathname === "/index");

  return (
    <Navbar
      variant="dark"
      expand="lg"
      className="sticky-top shadow-sm bg-light-radial p-0 bg-navebg"
      style={{ height: "97px" }}
    >
      <Navbar.Brand as={Link} to="/" className="text-white">
        <div className="d-flex display-4 align-items-center">
          <Icon
            icon={iconMap[config.icon]}
            className="text-customorange ms-5 me-2 display-4"
          />
          <div className="text-white text-custom-1 sm:text-custom-2 md:text-custom-3 lg:text-custom-4 xl:text-custom-5 font-semibold font-roboto mb-0">
            {config.brand}
          </div>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" style={{ marginRight: "23px" }} />
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
              className={`nav-item nav-link !text-white hover:!text-customorange ${isActive(link.to) ? "active" : ""}`}
            >
              {link.label}
            </Nav.Link>
          ))}

          <NavDropdown
            title={<span className="text-white hover:!text-customorange">{config.dropdown.title}</span>}
            id="navbarScrollingDropdown"
          >
            {config.dropdown.items.map((item, index) => (
              <NavDropdown.Item
                key={index}
                as={Link}
                to={item.to}
                className={`NavDropdownItem hover:!bg-Dropdownbg ${isActive(item.to) ? "active" : ""}`}
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
              className={`hover:!text-customorange !text-white uppercase nav-item nav-link ${isActive(link.to) ? "active" : ""}`}
            >
              {link.label}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
      <NavDropdown
        title={config.quoteButton.label}
        id="signup-signin-dropdown"
        className="NavDropdownbtn text-white font-open-sans text-xl ms-3 !bg-customorange rounded-0 py-4 d-none px-5 d-lg-block"
        style={{ height: "97px", fontSize: "large", lineHeight: "49px" }}
      >
        {config.button.map((btn, index) => (
          <NavDropdown.Item
            key={index}
            as={Link}
            to={btn.to}
            className={`NavDropdownItem hover:!bg-Dropdownbg ${isActive(btn.to) ? "active" : ""}`}
          >
            {btn.label}
          </NavDropdown.Item>
        ))}
      </NavDropdown>
    </Navbar>
  );
};

const ContactSection = () => {
  return (
    <Container fluid className="px-5 hidden lg:block">
      <Row className="gx-5">
        {data.contactInfo.map((contact, index) => {
          // Determine which icon to use
          const iconKey =
            contact.location_icon || contact.email_icon || contact.phone_icon;
          const IconComponent = iconMap[iconKey] || null;

          return (
            <Col
              key={contact.id}
              lg={4}
              className={`text-center py-3 px-4 ${index === 1 ? "border-x" : ""}`}
            >
              <div className="d-flex align-items-center justify-content-center">
                {IconComponent && (
                  <IconComponent className="text-customorange leading-7 text-40px me-3" />
                )}
                <div className="text-start">
                  <h6 className="uppercase font-roboto text-16px font-bold text-customblack mt-1">
                    {contact.heading}
                  </h6>
                  <p className="text-customwhite font-open-sans text-16px mb-0">
                    {contact.description}
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

const iconSizes = {
  home: { width: "72px", height: "72px" },
  tool: { width: "64px", height: "64px" },
};

const CarouselFadeExample = () => {
  return (
    <div>
      <Carousel fade interval={5000} controls={true} indicators={false}>
        {Object.keys(data.carousel).map((key) => {
          const item = data.carousel[key];
          const IconComponent = iconMap[item.icon]; // Get the icon component from the map

          // Get the icon size based on the type
          const iconSize = iconSizes[item.icon] || {
            width: "64px",
            height: "64px",
          }; // Default size

          // Get image source
          const imageSrc = {
            carousel_1,
            carousel_2,
          }[item.image] || item.image;

          return (
            <Carousel.Item key={key}>
              <img src={imageSrc} alt={`Slide ${key}`} />
              <div
                className="position-absolute top-0 start-0 d-flex w-100 h-100 align-items-center"
                style={{ background: "rgba(24, 29, 56, .7)" }}
              >
                <Carousel.Caption
                  className="mb-12p"
                  style={{ maxWidth: "900px" }}
                >
                  <div className="align-items-center d-flex justify-content-center">
                    {IconComponent && (
                      <IconComponent
                        className="me-3 text-customorange mb-4 d-none d-sm-block"
                        style={{
                          width: iconSize.width,
                          height: iconSize.height,
                        }}
                      />
                    )}
                  </div>
                  <div className="d-flex align-items-center justify-content-center">
                    <div>
                      <h1 className="text-white display-2 mb-md-4 font-roboto !font-semi-bold uppercase">
                        {item.heading}
                      </h1>
                    </div>
                  </div>
                  <button className="btn py-md-3 px-md-5 mt-2 !bg-customorange text-white uppercase !font-semibold rounded-0 font-open-sans">
                    {item.caption}
                  </button>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
    </div>
  );
};

const TheLeader = () => {
  const leader = data.theleader[0]; // Access the first object in the array

  const renderPoints = () => {
    return (
      <>
        <p className="mb-2 flex items-center">
          {React.createElement(iconMap[leader.icon], {
            className: "me-3 text-customorange",
          })}{" "}
          <div className="text-customwhite font-open-sans font-semibold">
            {leader.ponit_1}
          </div>
        </p>
        <p className="mb-2 flex items-center">
          {React.createElement(iconMap[leader.icon], {
            className: "me-3 text-customorange",
          })}{" "}
          <div className="text-customwhite font-open-sans font-semibold">
            {leader.ponit_2}
          </div>
        </p>
        <p className="mb-2 flex items-center">
          {React.createElement(iconMap[leader.icon], {
            className: "me-3 text-customorange",
          })}{" "}
          <div className="text-customwhite font-open-sans font-semibold">
            {leader.ponit_3}
          </div>
        </p>
      </>
    );
  };

  return (
    <Container fluid className="py-6 px-5">
      <Row className="g-5">
        <Col className="col-lg-7">
          <h1 className="uppercase display-5 !font-semibold mb-4 font-roboto">
            {leader.title.split("Leader")[0]}
            <span className="text-customorange">the Leader</span>
            {leader.title.split("Leader")[1]}
          </h1>
          <h4 className="uppercase text-customwhite !font-bold mb-4 font-roboto">
            {leader.description_1}
          </h4>
          <p className="text-customwhite font-open-sans">
            {leader.description_2}
          </p>
          <Row className="gx-5 py-2">
            <Col className="col-sm-6 mb-2">{renderPoints()}</Col>
            <Col className="col-sm-6 mb-2">{renderPoints()}</Col>
          </Row>
          <p className="mb-4 font-open-sans text-customwhite">
            {leader.description_3}
          </p>
          {signature && <img src={signature} alt="Signature" />}
        </Col>
        <Col className="col-lg-5 pb-5" style={{ minHeight: "400px" }}>
          <div
            className="relative bg-dark-radial h-full ms-5"
            style={{
              backgroundImage:
                "-webkit-repeating-radial-gradient(center center, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) 1px, transparent 1px, transparent 100%)",
              backgroundSize: "3px 3px",
              color: "#777777",
            }}
          >
            <img
              className="absolute w-full h-full mt-5 ms-n5 object-cover"
              src={about} // Ensure this path is correct
              alt="Leader in Construction"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
};


const images = {
  "service-1": service_1,
  "service-2": service_2,
  "service-3": service_3,
  "service-4": service_4,
  "service-5": service_5,
  "service-6": service_6,
};


const Thebest = () => {
  return (
    <Container fluid className="bg-light py-6 px-5">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
        <h1 className="display-5 text-uppercase mb-4 font-roboto !font-semibold">
          We Provide <span className="text-customorange">The Best</span>{" "}
          Construction Services
        </h1>
      </div>
      <Row className="g-5">
        {data.thebest.fields.map((field) => (
          <div className="col-lg-4 col-md-6" key={field.id}>
            <div className="service-item bg-white d-flex flex-column align-items-center text-center rounded">
              <img
                src={images[field.image]}
                alt={field.contenttitle}
                className="img-fluid"
              />
              <div className="service-icon bg-white ">
                {iconMap[field.icon]
                  ? React.createElement(iconMap[field.icon], {
                      className: `text-customorange ${
                        field.icon === "building_2"
                          ? "w-[42px] h-[48px]"
                          : field.icon === "home"
                          ? "w-[54px] h-[48px]"
                          : "w-[48px] h-[48px]"
                      }`,
                    })
                  : null}
              </div>
              <div className="px-4 pb-4">
                <h4 className="text-uppercase mb-3 font-roboto !font-bold">
                  {field.contenttitle}
                </h4>
                <p className="font-open-sans text-customwhite">
                  {field.content}
                </p>
                <div className="d-flex justify-content-center">
                  <Button
                    className="bg-white border-0 !text-customorange font-open-sans text-uppercase font-semibold d-flex align-items-center"
                    href="#"
                  >
                    <span>{field.button} </span>
                    <i
                      className={`bi bi-arrow-right ${
                        iconSizes[field.arrowicon]
                      } text-customorange ml-2`}
                    >
                      {iconMap[field.arrowicon]
                        ? React.createElement(iconMap[field.arrowicon], {
                            className: `${
                              iconSizes[field.arrowicon]
                            } text-customorange`,
                          })
                        : null}
                    </i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Row>
    </Container>
  );
};


const MainComponentpartone = () => {
  return (
    <>
      <ContactSection />
      <NavbarComponent />
      <CarouselFadeExample />
      <TheLeader />
      <Thebest />
    </>
  );
};

export default MainComponentpartone;
