// src/components/NavbarComponent.js
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import iconMap from "../assets/icons"; // Import the iconMap from your icons.js
import { navbar } from "../assets/navbar";
import { Icon } from "@iconify/react";

const NavbarComponent = () => {
  const location = useLocation();
  const config = navbar[0];

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar
      bg="dark"
      variant="dark"
      expand="lg"
      className="sticky-top shadow-sm bg-light-radial"
    >
      <Navbar.Brand as={Link} to="/index" className="text-white">
        <div className="d-flex display-4 align-items-center">
          {/* Use Icon component to render Iconify icon */}
          <Icon
            icon={iconMap.building_1}
            className="text-customorange ms-5 me-2 text-6xl"
          />
          <div className="text-white text-56px font-semibold font-roboto mb-0">
            {config.brand}
          </div>
        </div>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="uppercase ms-auto py-0 text-lg">
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
          >
            {config.dropdown.items.map((item, index) => (
              <NavDropdown.Item key={index} as={Link} to={item.to}>
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
          {config.button.map((link, index) => (
            <Nav.Link
              key={index}
              as={Link}
              to={link.to}
              className="uppercase bg-customorange rounded-lg text-white px-5 ms-3 d-none d-lg-block "
            >
              {link.label}
            </Nav.Link>
          ))}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarComponent;

// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Navbar, Nav, NavDropdown } from "react-bootstrap";
// import { Link, useLocation } from "react-router-dom";
// import iconMap from "../assets/icons";
// import { navbar } from "../assets/navbar";
// // import { BuildingIcon } from '../assets/icons'

// const NavbarComponent = () => {
//   const location = useLocation();
//   const config = navbar[0];

//   const isActive = (path) => location.pathname === path;

//   return (
//     <Navbar
//       bg="dark"
//       variant="dark"
//       expand="lg"
//       className="sticky-top shadow-sm bg-light-radial"
//     >
//       <Navbar.Brand as={Link} to="/index" className="text-white">
//         <div className="d-flex display-4 align-items-center">
//           <iconMap.building_1 className="text-customorange ms-5 me-2 text-6xl" />
//           <div className="text-white text-56px font-semibold font-roboto mb-0">
//             {config.brand}
//           </div>
//         </div>
//       </Navbar.Brand>
//       <Navbar.Toggle aria-controls="navbarScroll" />
//       <Navbar.Collapse id="navbarScroll">
//         <Nav className="uppercase ms-auto py-0 text-lg">
//           {config.links.map((link, index) => (
//             <Nav.Link
//               key={index}
//               as={Link}
//               to={link.to}
//               className={`nav-item nav-link !text-white hover:!text-customorange ${isActive(link.to) ? 'active' : ''} `}
//             >
//               {link.label}
//             </Nav.Link>
//           ))}

//           <NavDropdown
//             title={config.dropdown.title}
//             id="navbarScrollingDropdown"
//           >
//             {config.dropdown.items.map((item, index) => (
//               <NavDropdown.Item key={index} as={Link} to={item.to}>
//                 {item.label}
//               </NavDropdown.Item>
//             ))}
//           </NavDropdown>

//           {config.links1.map((link, index) => (
//             <Nav.Link
//               key={index}
//               as={Link}
//               to={link.to}
//               className={`hover:!text-customorange !text-white uppercase nav-item nav-link ${isActive(link.to) ? 'active' : ''}`}
//             >
//               {link.label}
//             </Nav.Link>
//           ))}
//           {config.button.map((link, index) => (
//             <Nav.Link
//               key={index}
//               as={Link}
//               to={link.to}
//               className="uppercase bg-customorange rounded-lg text-white px-5 ms-3 d-none d-lg-block "
//             >
//               {link.label}
//             </Nav.Link>
//           ))}

//           {/* <Nav.Link
//             as={Link}
//             to={config.button.link}
//             className=" uppercase bg-customorange text-white px-5 ms-3 d-none d-lg-block"
//           >
//             <div className="d-flex align-items-center me-2">
//               {config.button.label_registration}
//               <iconMap.right_arrow className="text-white ms-3" />
//             </div>
//           </Nav.Link>

//           <Nav.Link
//             as={Link}
//             to={config.button.link}
//             className=" uppercase bg-customorange text-white px-5 ms-3 d-none d-lg-block"
//           >
//             <div className="d-flex align-items-center me-2">
//               {config.button.label_login}
//               <iconMap.right_arrow className="text-white ms-2" />
//             </div>
//           </Nav.Link> */}
//         </Nav>
//       </Navbar.Collapse>
//     </Navbar>
//   );
// };

// export default NavbarComponent;
