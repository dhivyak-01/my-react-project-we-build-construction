import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
// import { carousel } from "../assets/caurosel"; // Adjust the path as necessary
// import iconMap from "../assets/iconMap"; // Import the icon mapping
import iconMap from "./icons";
import { carousel } from "./caurosel";

function CarouselFadeExample() {
  return (
    <div>
      <Carousel fade interval={5000} controls={true} indicators={false}>
        {Object.keys(carousel).map((key) => {
          const item = carousel[key];
          return (
            <Carousel.Item key={key}>
              <img src={item.image} alt={`Slide ${key}`} />
              <div
                className="position-absolute top-0 start-0 d-flex w-100 h-100 align-items-center"
                style={{ background: "rgba(24, 29, 56, .7)" }}
              >
                <Carousel.Caption>
                  <div className="d-flex align-items-center">
                    <div className="me-3">{iconMap[item.icon]}</div> {/* Render the icon based on the icon name */}
                    <h3 className="text-white">{item.heading}</h3>
                  </div>
                  <button className="btn btn-primary mt-3">{item.caption}</button>
                </Carousel.Caption>
              </div>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <div className="nextprev">
        <button
          className="prev prev-white border"
          type="button"
          data-bs-target="#carouselFadeExample"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            style={{ width: "22px", height: "22px" }}
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="next next-white border"
          type="button"
          data-bs-target="#carouselFadeExample"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            style={{ width: "22px", height: "22px" }}
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default CarouselFadeExample;


















// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Navbar, Nav, NavDropdown } from "react-bootstrap";
// import { Link, useLocation } from "react-router-dom";
// import iconMap from "../assets/icons"; // Import the iconMap from your icons.js
// import { navbar } from "../assets/navbar";
// import { Icon } from "@iconify/react";

// const NavbarComponent = () => {
//   const location = useLocation();
//   const config = navbar[0];

//   //   const isActive = (path) => location.pathname === path;
//   const isActive = (path) =>
//     location.pathname === path ||
//     (path === "/index" && location.pathname === "/");

//   return (
//     <Navbar
//       bg="dark"
//       variant="dark"
//       expand="lg"
//       className="sticky-top shadow-sm bg-light-radial p-0"
//       style={{ height: "97px" }}
//     >
//       <Navbar.Brand as={Link} to="/index" className="text-white">
//         <div className="d-flex display-4 align-items-center">
//           <Icon
//             icon={iconMap.building_1}
//             className="text-customorange ms-5 me-2 display-4"
//           />
//           <div className="text-white text-custom-1 sm:text-custom-2 md:text-custom-3 lg:text-custom-4 xl:text-custom-5 font-semibold font-roboto mb-0">
//             {config.brand}
//           </div>
//         </div>
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="navbarScroll" />
//       <Navbar.Collapse id="navbarScroll">
//         <Nav className="uppercase gap-4 d-flex ms-auto py-0 text-lg">
//           {config.links.map((link, index) => (
//             <Nav.Link
//               key={index}
//               as={Link}
//               to={link.to}
//               className={`nav-item nav-link !text-white hover:!text-customorange ${
//                 isActive(link.to) ? "active" : ""
//               }`}
//             >
//               {link.label}
//             </Nav.Link>
//           ))}

//           <NavDropdown
//             title={config.dropdown.title}
//             id="navbarScrollingDropdown"
//             className="active"
//           >
//             {config.dropdown.items.map((item, index) => (
//               <NavDropdown.Item
//                 key={index}
//                 as={Link}
//                 to={item.to}
//                 className={`NavDropdownItem hover:!bg-Dropdownbg ${
//                   isActive(item.to) ? "active" : ""
//                 }`}
//               >
//                 {item.label}
//               </NavDropdown.Item>
//             ))}
//           </NavDropdown>

//           {config.links1.map((link, index) => (
//             <Nav.Link
//               key={index}
//               as={Link}
//               to={link.to}
//               className={`hover:!text-customorange !text-white uppercase nav-item nav-link ${
//                 isActive(link.to) ? "active" : ""
//               }`}
//             >
//               {link.label}
//             </Nav.Link>
//           ))}
//         </Nav>
//       </Navbar.Collapse>
//       <Nav style={{ height: "97px" }}>
//         <Nav.Link
//           as={Link}
//           to="/Signup/Signin"
//           className="text-white font-open-sans text-xl ms-3 !bg-customorange rounded-0 py-4 d-none px-lg-5 d-lg-block"
//           style={{ height: "97px", fontSize: "large", lineHeight: "49px" }}
//         >
//           Signup/Login
//         </Nav.Link>
//       </Nav>
//     </Navbar>
//   );
// };

// export default NavbarComponent;





// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Navbar, Nav, NavDropdown } from "react-bootstrap";
// import { Link, useLocation } from "react-router-dom";
// import iconMap from "../assets/icons"; // Import the iconMap from your icons.js
// import { navbar } from "../assets/navbar";
// import { Icon } from "@iconify/react";

// const NavbarComponent = () => {
//   const location = useLocation();
//   const config = navbar[0];

//   const isActive = (path) =>
//     location.pathname === path || (path === "/index" && location.pathname === "/");

//   return (
//     <Navbar
//       bg="dark"
//       variant="dark"
//       expand="lg"
//       className="sticky-top shadow-sm bg-light-radial p-0"
//       style={{ height: "97px" }}
//     >
//       <Navbar.Brand as={Link} to="/index" className="text-white">
//         <div className="d-flex display-4 align-items-center">
//           <Icon
//             icon={iconMap.building_1}
//             className="text-customorange ms-5 me-2 display-4"
//           />
//           <div className="text-white text-custom-1 sm:text-custom-2 md:text-custom-3 lg:text-custom-4 xl:text-custom-5 font-semibold font-roboto mb-0">
//             {config.brand}
//           </div>
//         </div>
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="navbarScroll" />
//       <Navbar.Collapse id="navbarScroll">
//         <Nav className="uppercase gap-4 d-flex ms-auto py-0 text-lg">
//           {config.links.map((link, index) => (
//             <Nav.Link
//               key={index}
//               as={Link}
//               to={link.to}
//               className={`nav-item nav-link !text-white hover:!text-customorange ${
//                 isActive(link.to) ? "active" : ""
//               }`}
//             >
//               {link.label}
//             </Nav.Link>
//           ))}

//           <NavDropdown
//             title={config.dropdown.title}
//             id="navbarScrollingDropdown"
//             className="active"
//           >
//             {config.dropdown.items.map((item, index) => (
//               <NavDropdown.Item
//                 key={index}
//                 as={Link}
//                 to={item.to}
//                 className={`NavDropdownItem hover:!bg-Dropdownbg ${
//                   isActive(item.to) ? "active" : ""
//                 }`}
//               >
//                 {item.label}
//               </NavDropdown.Item>
//             ))}
//           </NavDropdown>

//           {config.links1.map((link, index) => (
//             <Nav.Link
//               key={index}
//               as={Link}
//               to={link.to}
//               className={`hover:!text-customorange !text-white uppercase nav-item nav-link ${
//                 isActive(link.to) ? "active" : ""
//               }`}
//             >
//               {link.label}
//             </Nav.Link>
//           ))}
//         </Nav>
//       </Navbar.Collapse>
//       <NavDropdown
//             title="Signup/Signin"
//             id="signup-signin-dropdown"
//             className="text-white font-open-sans text-xl ms-3 !bg-customorange rounded-0 py-4 d-none px-lg-5 d-lg-block"
//             style={{ height: "97px", fontSize: "large", lineHeight: "49px" }}
//           >
//             {config.button.map((btn, index) => (
//               <NavDropdown.Item
//                 key={index}
//                 as={Link}
//                 to={btn.to}
//                 className={`NavDropdownItem hover:!bg-Dropdownbg ${
//                   isActive(btn.to) ? "active" : ""
//                 }`}
//               >
//                 {btn.label}
//               </NavDropdown.Item>
//             ))}
//           </NavDropdown>
//        </Navbar>
//   );
// };

// export default NavbarComponent;
