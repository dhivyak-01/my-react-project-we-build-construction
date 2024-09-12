import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Card,
} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { Icon } from "@iconify/react";
import iconMap from "../assets/data"; // Import the iconMap from your icons.js
import { quickcontact } from "../assets/data";
import { navbar } from "../assets/data";
import { carousel } from "../assets/data";
import { theleader } from "../assets/data";
import {
  thebest,
  popular,
  requestCallBackData,
  professional,
  tmonials,
  blogPosts,
  footerData,
  footerBottomData,
} from "../assets/data";
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

const iconSizes = {
  home: { width: "72px", height: "72px" },
  tool: { width: "64px", height: "64px" },
};

function CarouselFadeExample() {
  return (
    <div>
      <Carousel fade interval={5000} controls={true} indicators={false}>
        {Object.keys(carousel).map((key) => {
          const item = carousel[key];
          const IconComponent = iconMap[item.icon]; // Get the icon component from the map

          // Get the icon size based on the type
          const iconSize = iconSizes[item.icon] || {
            width: "64px",
            height: "64px",
          }; // Default size

          return (
            <Carousel.Item key={key}>
              <img src={item.image} alt={`Slide ${key}`} />
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
                  <div className="d-flex align-items-center justify-content-center ">
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
}

const TheLeader = () => {
  const leader = theleader[0]; // Access the first object in the array

  const renderPoints = () => {
    return (
      <>
        <p className="mb-2 flex items-center">
          {React.createElement(iconMap[leader.icon], {
            className: "me-3 text-customorange",
          })}{" "}
          {/* Ensure className is passed correctly */}
          <div className="text-customwhite font-open-sans font-semibold">
            {leader.ponit_1}
          </div>
        </p>
        <p className="mb-2 flex items-center">
          {React.createElement(iconMap[leader.icon], {
            className: "me-3 text-customorange",
          })}{" "}
          {/* Ensure className is passed correctly */}
          <div className="text-customwhite font-open-sans font-semibold">
            {leader.ponit_2}
          </div>
        </p>
        <p className="mb-2 flex items-center">
          {React.createElement(iconMap[leader.icon], {
            className: "me-3 text-customorange",
          })}{" "}
          {/* Ensure className is passed correctly */}
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
          {leader.imagesign && <img src={leader.imagesign} alt="Signature" />}
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
              src={leader.imagegirl}
              alt="Leader in Construction"
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
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
        {thebest.fields.map((field) => (
          <div className="col-lg-4 col-md-6" key={field.id}>
            <div className="service-item bg-white d-flex flex-column align-items-center text-center rounded">
              <img
                src={field.image}
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

const RequestCallBack = () => {
  return (
    <Container fluid className="py-6 px-5">
      <Row className="gx-5">
        <Col lg={4} className="mb-5 mb-lg-0">
          <div className="mb-4">
            <h1 className="text-4xl font-bold uppercase mb-4">
              {requestCallBackData.header.title}
              <span className="text-customorange">
                {" "}
                {requestCallBackData.header.highlight}
              </span>
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
                  <Col
                    xs={12}
                    sm={field.type === "textarea" ? 12 : 6}
                    key={index}
                  >
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
                  <Button
                    variant="!bg-customorange"
                    className="w-full py-3 !bg-customorange text-white"
                  >
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

const Popular = () => {
  return (
    <Container fluid className="bg-light py-6 px-5">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
        <h1 className="display-5 text-uppercase mb-4 font-roboto !font-semibold">
          Some Of Our<span className="text-customorange"> Popular</span> Dream
          Projects
        </h1>
      </div>
      <Row className="g-5">
        {popular.fields.map((field) => (
          <div className="col-lg-4 col-md-6" key={field.id}>
            <div className="position-relative">
              <img
                src={field.image}
                alt={field.contenttitle}
                className="mb-4"
              />
              <div className="service position-absolute bg-white p-4 t-0">
                <div className="text-start ">
                  <h4 className="uppercase font-roboto mb-3 !font-bold text-customblack">
                    {field.contenttitle}
                  </h4>
                  <p className="text-customwhite font-open-sans">
                    {/* {iconMap[field.location] ? React.createElement(iconMap[field.icon], { className: `text-customorange `}):null} */}
                    {field.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Row>
    </Container>
  );
};

const Professional = () => {
  return (
    <Container fluid className="bg-white py-6 px-5">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
        <h1 className="display-5 text-uppercase mb-4 font-roboto !font-semibold">
          We Are
          <span className="text-customorange"> Professional & Expert</span>{" "}
          Workers
        </h1>
      </div>
      <Row className="g-5">
        {professional.fields.map((field) => (
          <div className="col-xl-3 col-lg-4 col-md-6" key={field.id}>
            <Row className="g-0">
              <div className="col-10">
                <img src={field.image} alt={field.contenttitle} className="" />
              </div>
              <div className="col-2">
                <div className="h-full flex flex-col items-center justify-between bg-light p-4">
                  {professional.icons.map((icon, index) => (
                    <Button
                      variant="link"
                      href="#"
                      key={index}
                      className="!text-customwhite"
                    >
                      {React.createElement(icon.component)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="bg-customgray p-4 t-0">
                <div className="text-start ">
                  <h4 className="uppercase font-roboto !font-bold text-customblack">
                    {field.contenttitle}
                  </h4>
                  <p className="text-customwhite mb-0 font-open-sans">
                    {field.content}
                  </p>
                </div>
              </div>
            </Row>
          </div>
        ))}
      </Row>
    </Container>
  );
};

// const Testimonials = () => {
//   return (
//     <div className="container-fluid bg-light py-6 px-5">
//       <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
//         <h1 className="display-5 text-uppercase mb-4 font-roboto !font-semibold">
//           What Our <span className="text-customorange">Happy Clients</span> Say!!!
//         </h1>
//       </div>
//       <div className="row gx-0 align-items-center position-relative">
//         <div className="col-xl-4 col-lg-5 d-none d-lg-block position-relative">
//           <img
//             className="img-fluid w-100 h-100 background-image"
//             src={tmonials.imgage}
//             alt="Background"
//           />
//           {/* Overlay container for images */}
//           <div className="overlay-container position-absolute top-0 start-0 w-100 h-100">
//             <Carousel interval={5000} controls={true} indicators={false}>
//               {tmonials.fields.map((testimonial, index) => (
//                 <Carousel.Item key={index}>
//                   <div className="d-flex align-items-center justify-content-start position-relative">
//                     <img
//                       className="img-fluid testimonial-image bg-customgray p-lg-3 mb-4 mb-md-0"
//                       src={testimonial.image}
//                       alt={testimonial.name}
//                       style={{ marginLeft: '-90px' }} // Apply margin-left for overlay effect
//                     />
//                     <div className="testimonial-text ms-3">
//                       <h4 className="text-uppercase mb-0">{testimonial.name}</h4>
//                       <p>{testimonial.profession}</p>
//                       <p className="fs-5 mb-0">
//                         {tmonials.icons.map((icon) => (
//                           <i className="text-customorange me-2" aria-hidden="true" key={icon.name}>
//                             {React.createElement(icon.component)}
//                           </i>
//                         ))}
//                         {testimonial.quote}
//                       </p>
//                     </div>
//                   </div>
//                 </Carousel.Item>
//               ))}
//             </Carousel>
//           </div>
//         </div>
//         <div className="col-xl-8 col-lg-7 col-md-12">
//           {/* This column might be adjusted based on your layout requirements */}
//         </div>
//       </div>
//     </div>
//   );
// };

const Testimonials = () => {
  return (
    <div className="container-fluid bg-light py-6 px-3 px-sm-4 px-md-5">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: "800px" }}>
        <h1 className="display-5 text-uppercase mb-4 font-roboto !font-semibold">
          What Our <span className="text-customorange">Happy Clients</span>{" "}
          Say!!!
        </h1>
      </div>
      <div className="row gx-0 align-items-center position-relative">
        <div className="col-xl-4 col-lg-5 d-none d-lg-block position-relative">
          <img
            className="img-fluid w-100 h-100 background-image"
            src={tmonials.imgage}
            alt="Background"
            style={{ objectFit: "cover" }}
          />
        </div>
        <div
          className="col-xl-8 col-lg-7 col-md-12 position-absolute"
          style={{ left: "27%" }}
        >
          <Carousel interval={5000} controls={true} indicators={false}>
            {tmonials.fields.map((testimonial, index) => (
              <Carousel.Item key={index}>
                <div className="row gx-4 align-items-center testimonial py-4 px-3 px-md-4">
                  <div className="col-md-5 d-flex justify-content-center mb-4 mb-md-0">
                    <img
                      className="img-fluid bg-customgray p-3"
                      src={testimonial.image}
                      alt={testimonial.name}
                      style={{
                        width: "100%",
                        maxWidth: "292px",
                        height: "auto",
                        objectFit: "cover",
                      }}
                      onError={() =>
                        console.error(
                          `Failed to load image at ${testimonial.image}`
                        )
                      }
                    />
                  </div>
                  <div className="col-md-7">
                    <h4 className="text-uppercase mb-2">{testimonial.name}</h4>
                    <p>{testimonial.profession}</p>
                    <p className="fs-5 mb-0">
                      {tmonials.icons.map((icon, iconIndex) => (
                        <i
                          key={iconIndex}
                          className="text-customorange me-2"
                          aria-hidden="true"
                        >
                          {React.createElement(icon.component)}
                        </i>
                      ))}
                      {testimonial.quote}
                    </p>
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
// const Testimonials = () => {
//   return (
//     <div className="container-fluid bg-light py-6 px-3 px-sm-4 px-md-5">
//       <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
//         <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//           What Our <span className="text-primary">Happy Clients</span> Say!!!
//         </h1>
//       </div>
//       <div className="relative flex flex-wrap items-center">
//         <div className="hidden lg:block lg:w-1/3 relative">
//           <img
//             className="w-full h-full object-cover"
//             src={tmonials.imgage}
//             alt="Background"
//           />
//         </div>
//         <div className="lg:w-2/3 w-full lg:absolute lg:left-1/2 lg:-translate-x-1/2">
//           <Carousel interval={5000} controls={true} indicators={false}>
//             {tmonials.fields.map((testimonial, index) => (
//               <Carousel.Item key={index}>
//                 <div className="flex flex-wrap p-4 lg:p-8 bg-light">
//                   <div className="lg:w-1/3 w-full mb-4 lg:mb-0 flex justify-center">
//                     <img
//                       className="w-3/4 lg:w-3/5 h-auto object-cover bg-gray-100 p-4"
//                       src={testimonial.image}
//                       alt={testimonial.name}
//                       onError={() => console.error(`Failed to load image at ${testimonial.image}`)}
//                     />
//                   </div>
//                   <div className="lg:w-2/3 w-full">
//                     <h4 className="text-xl font-semibold text-gray-800 mb-2">{testimonial.name}</h4>
//                     <p className="text-gray-600">{testimonial.profession}</p>
//                     <p className="text-lg mt-2">
//                       <i className="fa fa-2x fa-quote-left text-primary mr-2"></i>
//                       {testimonial.quote}
//                     </p>
//                   </div>
//                 </div>
//               </Carousel.Item>
//             ))}
//           </Carousel>
//         </div>
//       </div>
//     </div>
//   );
// };

const BlogSection = () => {
  return (
    <Container fluid className="py-6 px-5">
      <div className="text-center mx-auto mb-5" style={{ maxWidth: "600px" }}>
        <h1 className="display-5 text-uppercase  mb-4 font-roboto !font-semibold">
          Latest <span className="text-customorange">Articles</span> From Our
          Blog Post
        </h1>
      </div>
      <Row className="g-5">
        {blogPosts.map((post) => {
          const IconComponent = iconMap[post.icon];
          const ArrowIconComponent = iconMap[post.arrowicon];

          return (
            <Col lg={4} md={6} key={post.id}>
              <Card className="bg-light">
                <Card.Img variant="top" src={post.image} />
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between mb-4">
                    <div className="d-flex align-items-center">
                      <img
                        className="rounded-circle me-2"
                        src={post.authorImage}
                        width="35"
                        height="35"
                        alt={post.authorName}
                      />
                      <span>{post.authorName}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <a
                        className="btn !text-customorange d-flex align-items-center"
                        href="#"
                      >
                        {IconComponent && (
                          <IconComponent className="bi bi-arrow-right" />
                        )}
                        <span className="ms-2 !text-customwhite">
                          {post.date}
                        </span>
                      </a>
                    </div>
                  </div>
                  <h4 className="text-uppercase mb-3">{post.title}</h4>
                  <div className="d-flex justify-content-center">
                    <Button
                      className="bg-white border-0 !text-customorange font-open-sans text-uppercase font-semibold d-flex align-items-center"
                      href="#"
                    >
                      <span className=" !text-customorange">
                        {post.button}{" "}
                      </span>
                      <i
                        className={`bi bi-arrow-right ${
                          iconSizes[post.arrowicon]
                        } text-customorange ml-2`}
                      >
                        {iconMap[post.arrowicon]
                          ? React.createElement(iconMap[post.arrowicon], {
                              className: `${
                                iconSizes[post.arrowicon]
                              } text-customorange`,
                            })
                          : null}
                      </i>
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};
// const BlogSection = () => {
//   return (
//     <Container fluid className="py-6 px-5">
//       <div className="text-center mx-auto mb-5" style={{ maxWidth: '600px' }}>
//         <h1 className="display-5 text-uppercase mb-4">
//           Latest <span className="text-primary">Articles</span> From Our Blog Post
//         </h1>
//       </div>
//       <Row className="g-5">
//         {blogPosts.map(post => (
//           <Col lg={4} md={6} key={post.id}>
//             <Card className="bg-light">
//               <Card.Img variant="top" src={post.image} alt="" />
//               <Card.Body className="p-4">
//                 <div className="d-flex justify-content-between mb-4">
//                   <div className="d-flex align-items-center">
//                     <img className="rounded-circle me-2" src={post.authorImage} width="35" height="35" alt="" />
//                     <span>{post.authorName}</span>
//                   </div>
//                   <div className="d-flex align-items-center">
//                     <span className="ms-3">
//                       <i className="far fa-calendar-alt text-primary me-2"></i>
//                       {post.date}
//                     </span>
//                   </div>
//                 </div>
//                 <h4 className="text-uppercase mb-3">{post.title}</h4>
//                 <a className="text-uppercase fw-bold" href={post.link}>
//                   Read More <i className="bi bi-arrow-right"></i>
//                 </a>
//               </Card.Body>
//             </Card>
//           </Col>
//         ))}
//       </Row>
//     </Container>
//   );
// };
const Footer = () => {
  const { quickLinks = [], popularLinks = [], icons = [], brand = {} } = footerData || {};

  return (
    <div className="footer container-fluid position-relative bg-dark bg-light-radial text-white-50 py-6 px-5">
      <Container>
        <Row className="g-5">
          <Col lg={6} className="pe-lg-5">
            <a href="index.html" className="navbar-brand">
              <h1 className="m-0 display-4 text-uppercase text-white d-flex justify-content-start">
                {React.createElement(
                  icons.find(icon => icon.name === brand.icon)?.component,
                  { className: 'me-2' }
                )}
                {brand.name}
              </h1>
            </a>
            <p>{brand.description}</p>
            <p  className="d-flex justify-content-start">
              {React.createElement(
                icons.find(icon => icon.name === 'location')?.component,
                { className: 'me-2' }
              )}
              {brand.address}
            </p>
            <p  className="d-flex justify-content-start">
              {React.createElement(
                icons.find(icon => icon.name === 'footerphone')?.component,
                { className: 'me-2' }
              )}
              {brand.phone}
            </p>
            <p className="d-flex justify-content-start">
              {React.createElement(
                icons.find(icon => icon.name === 'envelope')?.component,
                { className: 'me-2' }
              )}
              {brand.email}
            </p>
            <div className="d-flex justify-content-start mt-4">
              {['twitter', 'facebook', 'linkedin', 'instagram'].map((name, index) => (
                <a
                  className="btn btn-lg btn-primary btn-lg-square rounded-0 me-2"
                  href={`#${name}`}
                  key={index}
                >
                  {React.createElement(
                    icons.find(icon => icon.name === name)?.component,
                    { className: 'text-white' }
                  )}
                </a>
              ))}
            </div>
          </Col>
          <Col lg={6} className="ps-lg-5">
            <Row className="g-5">
              <Col sm={6}>
                <h4 className="text-white text-uppercase mb-4">Quick Links</h4>
                <div className="d-flex flex-column justify-content-start">
                  {quickLinks.map((link, index) => (
                    <a
                      className="text-white-50 mb-2 d-flex align-items-center"
                      href={link.link}
                      key={index}
                    >
                      {React.createElement(
                        icons.find(icon => icon.name === 'angle_right')?.component,
                        { className: 'me-2' }
                      )}
                      {link.text}
                    </a>
                  ))}
                </div>
              </Col>
              <Col sm={6}>
                <h4 className="text-white text-uppercase mb-4">Popular Links</h4>
                <div className="d-flex flex-column justify-content-start">
                  {popularLinks.map((link, index) => (
                    <a
                      className="text-white-50 mb-2 d-flex align-items-center"
                      href={link.link}
                      key={index}
                    >
                      {React.createElement(
                        icons.find(icon => icon.name === 'angle_right')?.component,
                        { className: 'me-2' }
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
                    className="border-light me-2"
                    style={{ padding: '20px 30px' }}
                  />
                  <Button variant="primary" className="px-4">
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
      className="bg-dark bg-light-radial text-white border-top border-primary px-0"
    >
      <Row className="d-flex flex-column flex-md-row justify-content-between">
        <Col md={7} className="py-4 px-5 text-center text-md-start">
          <p className="mb-0">
            ©{" "}
            <a className="text-primary" href="#">
              {footerBottomData.siteName}
            </a>
            . All Rights Reserved.
          </p>
        </Col>
        <Col
          md={5}
          className="py-4 px-5 bg-primary footer-shape position-relative text-center text-md-end"
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

const MainComponent = () => {
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
      <BlogSection />
      <Footer />
      <FooterBottom />
    </>
  );
};

export default MainComponent;
