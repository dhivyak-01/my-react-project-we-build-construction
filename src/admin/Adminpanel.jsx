import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button, Form } from "react-bootstrap";
import { AdminpanelData } from "../assets/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBars } from "@fortawesome/free-solid-svg-icons"; // Import your icons
import { AiFillDashboard } from "react-icons/ai"; // Import the AiFillDashboard icon
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

const DashboardContent = (
  
  <>
    <Col xs lg="12" className="p-5 !bg-green">
      <Row className="g-5">
        <Col lg={4}>
          <Card className="!bg-back" style={{ width: "100%", height: "250px" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="!bg-back" style={{ width: "100%", height: "250px" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="!bg-back" style={{ width: "100%", height: "250px" }}>
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col lg={4}>
          <Card
            className="!bg-back"
            style={{ width: "1030px", height: "250px" }}
          >
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="pt-5">
        <Col lg={6}>
          <Card
            className="!bg-back"
            style={{ width: "500px", height: "250px" }}
          >
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card
            className="!bg-back"
            style={{ width: "500px", height: "250px" }}
          >
            <Card.Img variant="top" src="holder.js/100px180" />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Col>
  </>
);


const AddUserForm = (
  <>
    <Col xs lg="12" className="p-6 !bg-back2 " style={{ height: "943px" }}>
      <Card
        className="!bg-back ps-3"
        style={{ width: "900px", height: "50px" }}
      >
        <h1 className="pt-2 text-25px">Add users</h1>
      </Card>
      <Card
        className="!bg-back ps-3 mt-5"
        style={{ width: "900px", height: "691px" }}
      >
        <Form>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="fname" style={{ paddingLeft: "95px" }}>
                <Form.Label className="mt-12">First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Johnny"
                  required
                  style={{ width: "90%" }}
                  className="mt-2 mb-3"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lname">
                <Form.Label className="mt-12">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nelson"
                  required
                  style={{ width: "70%" }}
                  className="mt-2 mb-3"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="dob" style={{ paddingLeft: "95px" }}>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  required
                  style={{ width: "90%" }}
                  className="mt-2 mb-3"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="mt-2 mb-3">Gender</Form.Label>
                <div className="d-flex flex-row">
                  <Form.Check
                    type="radio"
                    id="Male"
                    label="Male"
                    name="gender"
                    value="Male"
                    required
                    defaultChecked
                    className="me-3" // Adds margin to the right
                  />
                  <Form.Check
                    type="radio"
                    id="Female"
                    label="Female"
                    name="gender"
                    value="Female"
                    required
                    className="me-3" // Adds margin to the right
                  />
                  <Form.Check
                    type="radio"
                    id="transgender"
                    label="Transgender"
                    name="gender"
                    value="transgender"
                    required
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group controlId="email" style={{ paddingLeft: "95px" }}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  required
                  style={{ width: "90%" }}
                  className="mt-2 mb-3"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="phoneno">
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  type="tel"
                  required
                  style={{ width: "70%" }}
                  className="mt-2 mb-3"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
        <Col>
          <Form.Group controlId="password" style={{ paddingLeft: "95px" }}>
            <Form.Label className="mt-12">Create Password</Form.Label>
            <Form.Control
              type="password"
              name="password" // Name for state management
              required
              value={formData.password} // Bind to state
              onChange={handleChange} // Handle change
              style={{ width: "90%" }}
              className="mt-2 mb-3"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="cpassword">
            <Form.Label className="mt-12">Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="cpassword" // Name for state management
              required
              value={formData.cpassword} // Bind to state
              onChange={handleChange} // Handle change
              style={{ width: "70%" }}
              className="mt-2 mb-3"
            />
          </Form.Group>
        </Col>
      </Row>
          <Form.Group className="mb-3" style={{ paddingLeft: "95px" }}>
            <Form.Label>city</Form.Label>
            <Form.Control
              as="select"
              required
              style={{ width: "38%" }}
              className="mt-2 mb-3"
            >
              <option disabled selected>
                Select city
              </option>
              <option value="Full Stack">Coimbator</option>
              <option value="Frontend">Erode</option>
              <option value="Backend">Thiruppur</option>
              <option value="Machine Learning">Selam</option>
              <option value="Digital Marketing">Krishnagiri</option>
            </Form.Control>
          </Form.Group>
          <div  className="flex justify-center">
            <Button
              type="submit"
              className="w-full mt-5 border-0 text-white"
              style={{ width: "200px" }}
            >
              Submit
            </Button>
          </div>
        </Form>
      </Card>
    </Col>
  </>
);


const ManageUser = (
  <>
    <Col xs lg="12" className="p-6 !bg-back2 " style={{ height: "943px" }}>
      <Card
        className="!bg-back ps-3"
        style={{ width: "900px", height: "50px" }}
      >
        <h1 className="pt-2 text-25px">Manage users</h1>
      </Card>
      <Card
        className="!bg-back ps-3 mt-12"
        style={{ width: "900px", height: "50px" }}
      >
      </Card>
      </Col>
      </>
);



const Adminpanel = () => {
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    console.log(`activeButton updated to: ${activeButton}`);
  }, [activeButton]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const renderContent = () => {
    switch (activeButton) {
      case "Dashboard":
        return DashboardContent;
      case "Add User":
        return AddUserForm;
        case "Manage User":
          return ManageUser;
      default:
        console.log(`No content found for: ${activeButton}`);
        return null;
    }
  };

  const content = renderContent();

  return (
    <Container fluid className="lg:block">
      <Row className="bg-customblack">
        <Col xs lg="3" className="p-3">
          <h1 className="text-3xl text-white font-open-sans font-bold text-center">
            {AdminpanelData.name}
          </h1>
        </Col>
        <Col xs lg="6" className="p-3">
          {/* Additional content can be placed here */}
        </Col>
        <Col xs lg="2" className="p-3 d-flex align-items-center">
          <img
            src={AdminpanelData.demouserimage}
            alt="Demo User"
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              marginRight: "10px",
            }}
          />
          <p className="text-white">{AdminpanelData.demousername}</p>
        </Col>
        <Col xs lg="1" className="p-3">
          <Button
            className="text-white border-white !bg-customblack"
            onClick={() => handleButtonClick("Logout")}
          >
            {AdminpanelData.button}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xs lg="2" className="bg-customblack" style={{ height: "943px" }}>
          {AdminpanelData.fields.map((field) => (
            <div key={field.id} className="mb-2">
              <div
                className={`w-100 rounded-0 py-3 d-flex align-items-center ${
                  activeButton === field.button ? "!bg-customblack" : ""
                } text-white bb-1`}
                onClick={() =>
                  field.dropdown
                    ? handleDropdownToggle(field.id)
                    : handleButtonClick(field.button)
                }
                style={{ cursor: "pointer" }}
              >
                {/* Conditionally render the icon */}
                {field.button === "Dashboard" ? (
                  <AiFillDashboard
                    style={{ marginRight: "10px", fontSize: "20px" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faBars}
                    style={{ marginRight: "10px" }}
                  />
                )}
                {field.button}
                {field.dropdown && (
                  <FontAwesomeIcon
                    icon={faAngleRight}
                    style={{
                      marginLeft: "auto",
                      transition: "transform 0.3s ease",
                      transform:
                        openDropdown === field.id
                          ? "rotate(90deg)"
                          : "rotate(0deg)",
                    }}
                  />
                )}
              </div>
              {openDropdown === field.id && field.dropdown && (
                <div
                  className="dropdown-menu"
                  style={{ paddingLeft: "20px", display: "block" }}
                >
                  {field.dropdown.map((item) => (
                    <Button
                      key={item.id}
                      className="dropdown-item"
                      onClick={() => handleButtonClick(item.label)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </Col>
        <Col xs lg="10" className="p-0">
          {content}
        </Col>
      </Row>
    </Container>
  );
};

export default Adminpanel;
