import React from "react";
import { Container, Row, Col, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Icon } from "@iconify/react";
import iconMap from "../assets/data"; // Import the iconMap from your icons.js
import { quickcontact } from "../assets/data";
import { navbar } from "../assets/data";
import { carousel } from "../assets/data";
import "bootstrap/dist/css/bootstrap.min.css";

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
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
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
            title={config.dropdown.title}
            id="navbarScrollingDropdown"
            className="active"
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
        className="text-white font-open-sans text-xl ms-3 !bg-customorange rounded-0 py-4 d-none px-lg-5 d-lg-block"
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

const iconSizes = {
  home: { width: '72px', height: '72px' },
  tool: { width: '64px', height: '64px' }
};

function CarouselFadeExample() {
  return (
    <div>
      <Carousel fade interval={5000} controls={true} indicators={false}>
        {Object.keys(carousel).map((key) => {
          const item = carousel[key];
          const IconComponent = iconMap[item.icon]; // Get the icon component from the map
          
          // Get the icon size based on the type
          const iconSize = iconSizes[item.icon] || { width: '64px', height: '64px' }; // Default size

          return (
            <Carousel.Item key={key}>
              <img src={item.image} alt={`Slide ${key}`} />
              <div
                className="position-absolute top-0 start-0 d-flex w-100 h-100 align-items-center"
                style={{ background: "rgba(24, 29, 56, .7)" }}
              >
                <Carousel.Caption className="mb-12p" style={{ maxWidth: "900px" }}>
                  <div className="align-items-center d-flex justify-content-center">
                    {IconComponent && (
                      <IconComponent
                        className="me-3 text-customorange mb-4 d-none d-sm-block"
                        style={{ width: iconSize.width, height: iconSize.height }}
                      />
                    )}
                  </div>
                  <div className="d-flex align-items-center justify-content-center ">
                    <div>
                      <h3 className="text-white mb-md-4 justify-content-center font-roboto font-bold text-72px uppercase">
                        {item.heading}
                      </h3>
                    </div>
                  </div>
                  <button className="btn  py-md-3 px-md-5 mt-2 !bg-customorange text-white uppercase !font-semibold rounded-0 font-open-sans">
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
}

// function CarouselFadeExample() {
//   return (
//     <div>
//       <Carousel fade interval={5000} controls={true} indicators={false}>
//         {Object.keys(carousel).map((key) => {
//           const item = carousel[key];
//           const IconComponent = iconMap[item.icon]; // Get the icon component from the map

//           return (
//             <Carousel.Item key={key}>
//               <img src={item.image} alt={`Slide ${key}`} />
//               <div
//                 className="position-absolute top-0 start-0 d-flex w-100 h-100 align-items-center"
//                 style={{ background: "rgba(24, 29, 56, .7)" }}
//               >
//                 <Carousel.Caption style={{ maxWidth: "900px" }}>
//                   <div className="align-items-center d-flex justify-content-center">
//                     {IconComponent && (
//                       <IconComponent className="me-3 text-customorange text-4x mb-4 d-none d-sm-block" />
//                     )}
//                   </div>
//                   <div className="d-flex align-items-center justify-content-center ">
//                     <div>
//                       <h3 className="text-white justify-content-center font-roboto font-bold text-72px uppercase">
//                         {item.heading}
//                       </h3>
//                     </div>
//                   </div>
//                   <button className="btn btn-primary mt-3 font-open-sans">
//                     {item.caption}
//                   </button>
//                 </Carousel.Caption>
//               </div>
//             </Carousel.Item>
//           );
//         })}
//       </Carousel>
//     </div>
//   );
// }

const MainComponent = () => {
  return (
    <>
      <ContactSection />
      <NavbarComponent />
      <CarouselFadeExample />
    </>
  );
};

export default MainComponent;
