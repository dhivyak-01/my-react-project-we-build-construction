// import React from 'react';
// import { Navbar, Nav } from 'react-bootstrap';

// const SimpleNavbar = () => {
//   return (
//     <Navbar bg="dark" variant="dark">
//       <Navbar.Brand href="#home">Brand</Navbar.Brand>
//       <Nav className="ml-auto">
//         <Nav.Link href="#home">Home</Nav.Link>
//         <Nav.Link href="#about">About</Nav.Link>
//         <Nav.Link href="#service">Service</Nav.Link>
//         <Nav.Link href="#contact">Contact</Nav.Link>
//       </Nav>
//     </Navbar>
//   );
// };

// export default SimpleNavbar;
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { navbar } from "./navbar";
import './navbar.css';

const NavbarComponent = () => {
  const location = useLocation();
  const config = navbar[0];

  // Log the config to check the links
  console.log("Navbar config:", config);

  const isActive = (path) =>
    location.pathname === path || (path === "/" && location.pathname === "/");

  return (
    <Navbar expand="lg" className="bg-light">
      <Navbar.Brand as={Link} to="/" className="text-dark">
        {config.brand}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav className="ms-auto">
          {config.links.map((link, index) => (
            <Nav.Link
              key={index}
              as={Link}
              to={link.to}
              className={`text-dark ${isActive(link.to) ? "active" : ""}`}
            >
              {link.label} {/* This should render the link text */}
            </Nav.Link>
          ))}
          <NavDropdown title={config.dropdown.title}>
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
              className={`text-dark ${isActive(link.to) ? "active" : ""}`}
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

// const NavbarComponent = () => {
//   const location = useLocation();
//   const config = navbar[0];

//   // State to manage dropdown visibility
//   const [showDropdown, setShowDropdown] = useState(false);

//   const isActive = (path) =>
//     location.pathname === path ||
//     (path === "/index" && location.pathname === "/");

//   return (
//     <Navbar
//       variant="dark"
//       expand="lg"
//       className="sticky-top shadow-sm bg-light-radial p-0 bg-navebg"
//       style={{ height: "97px" }}
//     >
//       <Navbar.Brand as={Link} to="/index" className="text-white">
//       <div className="d-flex display-4 align-items-center">
//           <Icon
//             icon={iconMap.building_1}
//             className="text-customorange ms-5 me-2 display-4"
//           />
//           <div className="text-white text-custom-1 sm:text-custom-2 md:text-custom-3 lg:text-custom-4 xl:text-custom-5 font-semibold font-roboto mb-0">
//             {config.brand}
//           </div>
//         </div>      </Navbar.Brand>
//       <Navbar.Toggle
//         aria-controls="navbarScroll"
//         onClick={() => setShowDropdown(!showDropdown)} // Toggle dropdown
//         style={{ marginRight: "23px" }}
//       />
//       <Navbar.Collapse
//         id="navbarScroll"
//         className={`bg-light-radial bg-navebg ${showDropdown ? 'show' : ''}`} // Add show class if open
//         style={{ paddingLeft: "44px", paddingRight: "44px" }}
//       >
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
//             title={
//               <span className={`text-white hover:!text-customorange`}>
//                 {config.dropdown.title}
//               </span>
//             }
//             id="navbarScrollingDropdown"
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
//       <Nav style={{height:'97px'}}>
//           <Dropdown
//             onMouseEnter={() => setShowDropdown(true)}
//             onMouseLeave={() => setShowDropdown(false)}
//             show={showDropdown}
//           >
//             <Dropdown.Toggle
//               variant="!customorange"
//               className="text-white font-open-sans text-xl uppercase ms-3 !bg-customorange rounded-0 py-4 d-none px-lg-5 d-lg-block"style={{height:'97px', fontSize:'large'}}
//             >
//               {config.quoteButton.label}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               {config.button.map((btn, index) => (
//                 <Dropdown.Item
//                   key={index}
//                   as={Link}
//                   to={btn.to}
//                 >
//                   {btn.label}
//                 </Dropdown.Item>
//               ))}
//             </Dropdown.Menu>
//           </Dropdown>
//         </Nav>
//     </Navbar>
//   );
// };

// export default NavbarComponent;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
// import { Link, useLocation } from "react-router-dom";
// // import iconMap from "../assets/icons"; // Import the iconMap from your icons.js
// // import { navbar } from "../assets/navbar";
// import { navbar } from "./navbar";
// import iconMap from "./icons";
// import { Icon } from "@iconify/react";

// const NavbarComponent = () => {
//   const location = useLocation();
//   const config = navbar[0];

//   const [showDropdown, setShowDropdown] = useState(false);

//   const isActive = (path) => location.pathname === path || (path === "/index" && location.pathname === "/");

//   return (
//     <Navbar
//       bg="dark"
//       variant="dark"
//       expand="lg"
//       className="sticky-top shadow-sm bg-light-radial p-0" style={{height:'97px'}}
//     >
// <Navbar.Brand as={Link} to="/" className="text-white">
// <div className="d-flex display-4 align-items-center">
//   <Icon
//     icon={iconMap.building_1}
//     className="text-customorange ms-5 me-2 display-4"
//   />
//   <div className="text-white text-custom-1 sm:text-custom-2 md:text-custom-3 lg:text-custom-4 xl:text-custom-5 font-semibold font-roboto mb-0">
//     {config.brand}
//   </div>
// </div>
// </Navbar.Brand>
// <Navbar.Toggle aria-controls="navbarScroll" />
// <Navbar.Collapse id="navbarScroll">
//   <Nav className="uppercase gap-4 d-flex ms-auto py-0 text-lg">
//     {config.links.map((link, index) => (
//       <Nav.Link
//         key={index}
//         as={Link}
//         to={link.to}
//         className={`nav-item nav-link !text-white hover:!text-customorange ${
//           isActive(link.to) ? "active" : ""
//         }`}
//       >
//         {link.label}
//       </Nav.Link>
//     ))}

//     <NavDropdown
//       title={config.dropdown.title}
//       id="navbarScrollingDropdown"
//     >
//       {config.dropdown.items.map((item, index) => (
//         <NavDropdown.Item key={index} as={Link} to={item.to} className="hover:!bg-customorange">
//           {item.label}
//         </NavDropdown.Item>
//       ))}
//     </NavDropdown>

//     {config.links1.map((link, index) => (
//       <Nav.Link
//         key={index}
//         as={Link}
//         to={link.to}
//         className={`hover:!text-customorange !text-white uppercase nav-item nav-link ${
//           isActive(link.to) ? "active" : ""
//         }`}
//       >
//         {link.label}
//       </Nav.Link>
//     ))}
//     </Nav>

// </Navbar.Collapse>
// <Nav style={{height:'97px'}}>
//     <Dropdown
//       onMouseEnter={() => setShowDropdown(true)}
//       onMouseLeave={() => setShowDropdown(false)}
//       show={showDropdown}
//     >
//       <Dropdown.Toggle
//         variant="!customorange"
//         className="text-white font-open-sans text-xl uppercase ms-3 !bg-customorange rounded-0 py-4 d-none px-lg-5 d-lg-block"style={{height:'97px', fontSize:'large'}}
//       >
//         {config.quoteButton.label}
//       </Dropdown.Toggle>
//       <Dropdown.Menu>
//         {config.button.map((btn, index) => (
//           <Dropdown.Item
//             key={index}
//             as={Link}
//             to={btn.to}
//           >
//             {btn.label}
//           </Dropdown.Item>
//         ))}
//       </Dropdown.Menu>
//     </Dropdown>
//   </Nav>
//     </Navbar>
//   );
// };

// export default NavbarComponent;
