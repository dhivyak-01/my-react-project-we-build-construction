import React, { useState, useEffect } from "react";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  Table,
  Card,
} from "react-bootstrap";
import { AdminpanelData } from "../assets/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBars } from "@fortawesome/free-solid-svg-icons";
import { AiFillDashboard } from "react-icons/ai";
import '../App.css';


const DashboardContent = (
  <Col xs lg="12" className="p-5 !bg-green">
    <Row className="g-5">
      <Col lg={4}>
        <Card className="!bg-back" style={{ width: "100%", height: "250px" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
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
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
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
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="pt-5">
      <Col lg={4}>
        <Card className="!bg-back" style={{ width: "1030px", height: "250px" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row className="pt-5">
      <Col lg={6}>
        <Card className="!bg-back" style={{ width: "500px", height: "250px" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={6}>
        <Card className="!bg-back" style={{ width: "500px", height: "250px" }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Col>
);

const defaultUsers = [
  {
    fname: "John",
    lname: "Doe",
    dob: "1990-01-01",
    gender: "Male",
    email: "john.doe@example.com",
    phoneno: "1234567890",
    city: "Coimbatore",
  },
  {
    fname: "Jane",
    lname: "Smith",
    dob: "1985-05-05",
    gender: "Female",
    email: "jane.smith@example.com",
    phoneno: "0987654321",
    city: "Erode",
  },
];

// const AddUserForm = ({ onAddUser }) => {
//   console.log("AddUserForm rendered");

//   const [formData, setFormData] = useState({
//     fname: "",
//     lname: "",
//     dob: "",
//     gender: "Male",
//     email: "",
//     phoneno: "",
//     city: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch('http://localhost:5000/api/users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });
      
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
  
//       const newUser = await response.json();
//       onAddUser(newUser); // Update state in Admin component
//       setFormData({
//         fname: "",
//         lname: "",
//         dob: "",
//         gender: "Male",
//         email: "",
//         phoneno: "",
//         city: "",
//       });
//     } catch (error) {
//       console.error('Error adding user:', error);
//     }
//   };


    const AddUserForm = ({ onAddUser, initialData }) => {
        console.log("AddUserForm rendered");
      
        const [formData, setFormData] = useState({
          fname: initialData?.fname || "",
          lname: initialData?.lname || "",
          dob: initialData?.dob || "",
          gender: initialData?.gender || "Male",
          email: initialData?.email || "",
          phoneno: initialData?.phoneno || "",
          city: initialData?.city || "",
        });
      
        useEffect(() => {
          if (initialData) {
            setFormData({
              fname: initialData.fname,
              lname: initialData.lname,
              dob: initialData.dob,
              gender: initialData.gender,
              email: initialData.email,
              phoneno: initialData.phoneno,
              city: initialData.city,
            });
          }
        }, [initialData]);
      
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const newUser = await response.json();
      onAddUser(newUser); // Update state in Admin component
      setFormData({ fname: "", lname: "", dob: "", gender: "Male", email: "", phoneno: "", city: "" });
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };


  return (
    <Col xs lg="12" className="p-6 !bg-back2" style={{ height: "943px" }}>
      <Card className="!bg-back ps-3"  style={{ width: "900px", height: "50px" }}>
        <h1 className="pt-2 text-25px">Add Users</h1>
      </Card>
      <Card className="!bg-back ps-3 mt-5"  style={{ width: "900px", height: "691px" }}>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group style={{ paddingLeft: "95px" }}>
                <Form.Label className="mt-12">First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  value={formData.fname}
                  placeholder="Johnny"
                  required
                  onChange={handleChange}
                  style={{ width: "90%" }}
                  className="mt-2 mb-3"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label className="mt-12">Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="lname"
                  value={formData.lname}
                  placeholder="Nelson"
                  required
                  onChange={handleChange}
                  style={{ width: "70%" }}
                  className="mt-2 mb-3"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group style={{ paddingLeft: "95px" }}>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  required
                  onChange={handleChange}
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
                    label="Male"
                    name="gender"
                    value="Male"
                    required
                    onChange={handleChange}
                    defaultChecked
                    className="me-3" // Adds margin to the right
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    value="Female"
                    required
                    onChange={handleChange}
                    className="me-3" // Adds margin to the right
                  />
                  <Form.Check
                    type="radio"
                    label="Transgender"
                    name="gender"
                    value="transgender"
                    required
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group style={{ paddingLeft: "95px" }}>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                  style={{ width: "90%" }}
                  className="mt-2 mb-3"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  type="tel"
                  name="tel"
                  value={formData.tel}
                  required
                  onChange={handleChange}
                  style={{ width: "70%" }}
                  className="mt-2 mb-3"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-3" style={{ paddingLeft: "95px" }}>
            <Form.Label htmlFor="city">City</Form.Label>{" "}
            {/* Link label to the dropdown */}
            <Form.Control
              as="select"
              name="city"
              required
              onChange={handleChange}
              value={formData.city} // Bind the selected value to formData
              style={{ width: "38%" }}
              className="mt-2 mb-3"
            >
              <option value="" disabled>
                Select city
              </option>{" "}
              {/* Default unselected option */}
              <option value="Coimbatore">Coimbatore</option>
              <option value="Erode">Erode</option>
              <option value="Thiruppur">Thiruppur</option>
              <option value="Salem">Salem</option>
              <option value="Krishnagiri">Krishnagiri</option>
            </Form.Control>
          </Form.Group>
          <div className="flex justify-center">
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
  );
};

const ManageUser = ({ users, onEditUser, onDeleteUser }) => {
  return (
    <Col xs lg="12" className="p-6 !bg-back2" style={{ height: "943px" }}>
      <Card className="!bg-back ps-3">
        <h1 className="pt-2 text-25px">Manage Users</h1>
      </Card>
      <Table striped bordered hover  style={{ marginTop: '47px' }}>
        <thead className="table-header">
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date of Birth</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td>{user.fname}</td>
              <td>{user.lname}</td>
              <td>{user.dob}</td>
              <td>{user.gender}</td>
              <td>{user.email}</td>
              <td>{user.phoneno}</td>
              <td>{user.city}</td>
              <td>
              <Button variant="warning"  onClick={() => onEditUser(index)} style={{ marginRight:'20px' }}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDeleteUser(index)}>
                Delete
              </Button>
            </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
};

const Admin = () => {
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [users, setUsers] = useState(defaultUsers);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    console.log(`activeButton updated to: ${activeButton}`);
  }, [activeButton]);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    console.log(`activeButton updated to: ${buttonName}`);
    setOpenDropdown(null);
    if (buttonName !== "Add User") {
      setEditIndex(null); // Reset edit index when not in add/edit mode
    }
  };

  const handleDropdownToggle = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleAddUser = (newUser) => {
    if (editIndex !== null) {
      // If editing, update the existing user
      setUsers((prevUsers) =>
        prevUsers.map((user, i) => (i === editIndex ? newUser : user))
      );
    } else {
      // If adding a new user, just add the user
      setUsers((prevUsers) => [...prevUsers, newUser]);
    }
    // Reset edit index after adding/editing
    setEditIndex(null);
    // Switch back to Manage User view
    handleButtonClick("Manage User");
  };


  const handleEditUser = (index) => {
    setEditIndex(index); // Set the index of the user to edit
    setActiveButton("Add User"); // Switch to the Add User form
  };

  const handleDeleteUser = (index) => {
    setUsers((prevUsers) => prevUsers.filter((_, i) => i !== index));
  };

  const renderContent = () => {
    switch (activeButton) {
      case "Dashboard":
        return DashboardContent;
      case "Add User":
        return <AddUserForm  onAddUser={handleAddUser} 
        initialData={editIndex !== null ? users[editIndex] : null} // Pass initial data if editing
/>;
      case "Manage User":
        return <ManageUser  users={users} 
        onEditUser={handleEditUser} 
        onDeleteUser={handleDeleteUser}  />;
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
        <Col xs lg="6" className="p-3" />
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

export default Admin;
