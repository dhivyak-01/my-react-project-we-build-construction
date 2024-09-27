import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import {
  Col,
  Container,
  Row,
  Button,
  Form,
  Table,
  Card,
  Pagination,
  Modal,
} from "react-bootstrap";
import { AdminpanelData } from "../assets/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBars } from "@fortawesome/free-solid-svg-icons";
import { AiFillDashboard } from "react-icons/ai";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFilePdf, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../App.css";

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

const AddUserForm = ({ onAddUser, initialData }) => {
  console.log("AddUserForm rendered");
  const [fileInputKey, setFileInputKey] = useState(0);
  const [formData, setFormData] = useState({
    fname: initialData?.fname || "",
    lname: initialData?.lname || "",
    dob: initialData?.dob || "",
    gender: initialData?.gender || "Male",
    email: initialData?.email || "",
    phoneno: initialData?.phoneno || "",
    city: initialData?.city || "",
    avatar: initialData?.avatar || null,
    password: "",
    confirmPassword: "",
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
        avatar: initialData.avatar || null,
        password: "",
        confirmPassword: "",
      });
      setAvatarPreview(
        initialData.avatar
          ? `http://localhost:5000/${initialData.avatar}`
          : null
      );
    }
  }, [initialData]);

  const [avatarPreview, setAvatarPreview] = useState(
    formData.avatar ? `http://localhost:5000/${formData.avatar}` : null
  );

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        if (file.size > 2 * 1024 * 1024) {
          alert("File size exceeds 2MB. Please select a smaller file.");
          return;
        }

        setFormData({ ...formData, [name]: file });

        if (file.type.startsWith("image/")) {
          const newAvatarPreview = URL.createObjectURL(file);
          setAvatarPreview(newAvatarPreview);
        } else if (file.type === "application/pdf") {
          setAvatarPreview(null);
        }
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      let response;

      if (initialData) {
        response = await fetch(
          `http://localhost:5000/api/users/${initialData._id}`,
          {
            method: "PUT",
            body: formDataToSubmit,
          }
        );
      } else {
        response = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          body: formDataToSubmit,
        });
      }

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to submit user data");

      alert(initialData ? "User updated successfully!" : "User added successfully!");
      onAddUser(data.user);
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setFormData({
        fname: "",
        lname: "",
        dob: "",
        gender: "Male",
        email: "",
        phoneno: "",
        city: "",
        avatar: null,
        password: "",
        confirmPassword: "",
      });
      setAvatarPreview(null);
      setFileInputKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <Col xs lg="12" className="p-6 !bg-back2">
      <Card className="!bg-back ps-3">
        <h1 className="pt-2 text-25px">Add Users</h1>
      </Card>
      <Card className="!bg-back ps-3 mt-5">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label className="mt-12">First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="fname"
                  value={formData.fname}
                  placeholder="Johnny"
                  required
                  onChange={handleChange}
                  pattern="^[A-Za-z]+$" // Only letters allowed
                  title="First name should contain only letters."
                  style={{ width: "90%" }}
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
                  pattern="^[A-Za-z]+$" // Only letters allowed
                  title="Last name should contain only letters."
                  style={{ width: "70%" }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={formData.dob}
                  required
                  onChange={handleChange}
                  style={{ width: "90%" }}
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
                    className="me-3"
                  />
                  <Form.Check
                    type="radio"
                    label="Female"
                    name="gender"
                    value="Female"
                    required
                    onChange={handleChange}
                    className="me-3"
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
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  required
                  onChange={handleChange}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" // Simple email validation
                  title="Please enter a valid email address."
                  style={{ width: "90%" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Phone No</Form.Label>
                <Form.Control
                  type="tel"
                  name="phoneno"
                  value={formData.phoneno}
                  required
                  onChange={handleChange}
                  pattern="^\d{10}$" // 10-digit phone number
                  title="Phone number must be 10 digits."
                  style={{ width: "70%" }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Create Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  required
                  onChange={handleChange}
                  minLength="6" // Minimum length for password
                  title="Password must be at least 6 characters long."
                  style={{ width: "90%" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  required
                  onChange={handleChange}
                  minLength="6" // Minimum length for password
                  title="Please confirm your password."
                  style={{ width: "70%" }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label htmlFor="city">City</Form.Label>
                <Form.Control
                  as="select"
                  name="city"
                  required
                  onChange={handleChange}
                  value={formData.city}
                  style={{ width: "90%" }}
                >
                  <option value="" disabled>Select city</option>
                  <option value="Coimbatore">Coimbatore</option>
                  <option value="Erode">Erode</option>
                  <option value="Thiruppur">Thiruppur</option>
                  <option value="Salem">Salem</option>
                  <option value="Krishnagiri">Krishnagiri</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  key={fileInputKey}
                  type="file"
                  name="avatar"
                  accept="image/*, application/pdf"
                  onChange={handleChange}
                  style={{ width: "70%" }}
                />
                {avatarPreview && (
                  <img
                    src={avatarPreview}
                    alt="Current Avatar"
                    style={{
                      width: "100px",
                      height: "100px",
                      marginBottom: "10px",
                    }}
                  />
                )}
              </Form.Group>
            </Col>
          </Row>
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

const ManageUser = ({ users, setUsers, onEditUser, onDeleteUser }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [viewUser, setViewUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log("Users updated:", users);
  }, [users]);

  // Fetch users (unchanged)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched users:", data);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [setUsers]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map((user) => user._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const handleDeleteSelected = async () => {
    for (const userId of selectedUsers) {
      await onDeleteUser(userId);
    }
    setSelectedUsers([]);
  };

  // Sort users with the newest first and then reverse them
  const sortedUsers = [...users].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const reversedUsers = sortedUsers.reverse(); // Reverse to show newest first

  const totalPages = Math.ceil(reversedUsers.length / itemsPerPage);

  // Get users for the current page
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = reversedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleViewUser = (user) => {
    setViewUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setViewUser(null);
  };

  const downloadCSV = () => {
    const data = selectedUsers.map((userId) => {
      const user = users.find((user) => user._id === userId);
      return {
        Id: user._id,
        "First Name": user.fname,
        "Last Name": user.lname,
        Email: user.email,
        "Phone No": user.phoneno,
        City: user.city,
      };
    });

    // Create CSV headers
    const csvHeaders = [
      "Id",
      "First Name",
      "Last Name",
      "Email",
      "Phone No",
      "City",
    ];
    const csvRows = [];

    // Push headers to the CSV
    csvRows.push(csvHeaders.join(","));

    // Push each user's data to the CSV
    data.forEach((user) => {
      csvRows.push(
        [
          user.Id,
          user["First Name"],
          user["Last Name"],
          user.Email,
          user["Phone No"],
          user.City,
        ].join(",")
      );
    });

    // Create a Blob from the CSV data
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });

    // Create a link to download the Blob
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "users.csv");

    // Append link to the body and trigger click
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
  };

  const downloadPDF = async () => {
    const doc = new jsPDF();
    const headers = [
      ["Id", "First Name", "Last Name", "Email", "Phone No", "City", "Avatar"],
    ];

    const data = await Promise.all(
      selectedUsers.map(async (userId, index) => {
        const user = users.find((user) => user._id === userId);
        const imageUrl = `http://localhost:5000/${user.avatar}`;
        const img = await loadImage(imageUrl);

        return [
          index + 1,
          user.fname,
          user.lname,
          user.email,
          user.phoneno,
          user.city,
          img,
        ];
      })
    );

    doc.autoTable({
      head: headers,
      body: data,
      didParseCell: (data) => {
        // Draw the image in the last column with fixed dimensions
        if (data.column.index === 6) {
          const img = data.cell.raw;
          const imgWidth = 20; // Adjust width as needed
          const imgHeight = 20; // Adjust height as needed
          doc.addImage(
            img,
            "JPEG",
            data.cell.x + 1,
            data.cell.y + 1,
            imgWidth,
            imgHeight
          ); // Adjust positions as needed
        }
      },
    });

    doc.save("users.pdf");
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = reject;
    });
  };

  return (
    <Col
      xs
      lg="12"
      className="custom-padding !bg-back2"
      style={{ width: "1362px" }}
    >
      <Card className="!bg-back ps-3 " style={{ padding: "10px" }}>
        <div className="d-flex justify-content-between align-items-start">
          <h1 className="pt-1 text-25px mb-0">Manage Users</h1>
          <div>
            <Button
              variant="primary"
              onClick={downloadCSV}
              style={{ marginRight: "10px" }}
            >
              <FontAwesomeIcon icon={faFileCsv} />
            </Button>
            <Button
              variant="success"
              onClick={downloadPDF}
              style={{ marginRight: "10px" }}
            >
              <FontAwesomeIcon
                icon={faFilePdf}
                style={{ marginRight: "5px" }}
              />
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteSelected}
              disabled={selectedUsers.length === 0}
              style={{ width: "40px" }}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </div>
        </div>
      </Card>
      <Table striped bordered hover style={{ marginTop: "47px" }}>
        <thead className="table-header">
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selectedUsers.length === reversedUsers.length &&
                  reversedUsers.length > 0
                }
              />
            </th>
            <th>Id</th>
            <th>Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Phone No</th>
            <th>City</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length === 0 ? (
            <tr>
              <td colSpan="12" style={{ textAlign: "center" }}>
                No users found
              </td>
            </tr>
          ) : (
            currentUsers.map((user, index) => (
              <tr key={user._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedUsers.includes(user._id)}
                    onChange={() => handleSelectUser(user._id)}
                  />
                </td>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>{" "}
                {/* Adjust index for pagination */}
                <td>
                  <img
                    src={`http://localhost:5000/${user.avatar}`}
                    alt={`${user.fname} ${user.lname}`}
                    style={{ width: "50px" }}
                  />
                </td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.dob}</td>
                <td>{user.gender}</td>
                <td>{user.email}</td>
                <td>{user.phoneno}</td>
                <td>{user.city}</td>
                <td>
                  {user.password
                    ? user.password.substring(0, 10) + "..."
                    : "Not Set"}
                </td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => handleViewUser(user)}
                    style={{ marginRight: "20px" }}
                  >
                    View
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => onEditUser(user)}
                    style={{ marginRight: "20px" }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      console.log("Deleting user with ID:", user._id);
                      onDeleteUser(user._id);
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
      {/* Pagination */}
      <div className="d-flex justify-content-center mt-3">
        <Pagination>
          <Pagination.Prev
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
          />
        </Pagination>
      </div>

      {/* Modal for viewing user details */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewUser && (
            <div>
              <p>
                <strong>First Name:</strong> {viewUser.fname}
              </p>
              <p>
                <strong>Last Name:</strong> {viewUser.lname}
              </p>
              <p>
                <strong>Date of Birth:</strong> {viewUser.dob}
              </p>
              <p>
                <strong>Gender:</strong> {viewUser.gender}
              </p>
              <p>
                <strong>Email:</strong> {viewUser.email}
              </p>
              <p>
                <strong>Phone No:</strong> {viewUser.phoneno}
              </p>
              <p>
                <strong>City:</strong> {viewUser.city}
              </p>
              <p>
                <strong>Avatar:</strong>{" "}
                <img
                  src={`http://localhost:5000/${viewUser.avatar}`}
                  alt={`${viewUser.fname} ${viewUser.lname}`}
                  style={{ width: "50px" }}
                />
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};

const Admin = () => {
  const [activeButton, setActiveButton] = useState("Dashboard");
  const [users, setUsers] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    console.log(`activeButton updated to: ${activeButton}`);
  }, [activeButton]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data); // Update users state
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
    console.log(`activeButton updated to: ${buttonName}`);
    setOpenDropdown(null);
  };

  const handleDropdownToggle = (dropdownId) => {
    setOpenDropdown(openDropdown === dropdownId ? null : dropdownId);
  };

  const handleAddUser = async (newUser) => {
    try {
      const formattedUser = {
        ...newUser,
        dob: format(new Date(newUser.dob), "yyyy-MM-dd"), // Adjust date format if needed
      };

      let response;

      if (editIndex) {
        response = await fetch(`http://localhost:5000/api/users/${editIndex}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedUser),
        });
      } else {
        response = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedUser),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to submit user data");
      }

      const userData = await response.json();
      console.log("User data received:", userData); // Log the received data

      if (editIndex) {
        // Update the existing user in the state
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user._id === editIndex ? userData : user))
        );
      } else {
        // Add the new user to the state
        setUsers((prevUsers) => [...prevUsers, userData]);
      }

      // Reset editIndex and any form state as needed
      setEditIndex(null);
      // Optionally reset your form data here if applicable
    } catch (error) {
      console.error("Error adding or updating user:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditIndex(user._id); // Set the ID or any unique identifier
    setActiveButton("Add User"); // Change to "Add User" to open the form
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Update state to remove the deleted user
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const renderContent = () => {
    const selectedUser = users.find((user) => user._id === editIndex) || null;

    switch (activeButton) {
      case "Dashboard":
        return DashboardContent;
      case "Add User":
        return (
          <AddUserForm onAddUser={handleAddUser} initialData={selectedUser} />
        );
      case "Manage User":
        return (
          <ManageUser
            users={users}
            onEditUser={handleEditUser}
            onDeleteUser={handleDeleteUser}
          />
        );
      default:
        console.log(`No content found for: ${activeButton}`);
        return null;
    }
  };

  const content = renderContent();

  const navbarWidth = activeButton === "Manage User" ? "1587px" : "1349px";

  return (
    <Container fluid className="lg:block">
      <Row className="bg-customblack" style={{ width: navbarWidth }}>
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
        <Col xs lg="2" className="bg-customblack">
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
