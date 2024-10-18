import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import moment from "moment";
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
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaTrash } from "react-icons/fa";
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

  const [isEditing, setIsEditing] = useState(!!initialData); // Check if we're editing
  // const [showPassword, setShowPassword] = useState(false); // Control password visibility

  const [formData, setFormData] = useState({
    fname: initialData?.fname || "",
    lname: initialData?.lname || "",
    dob: initialData?.dob
      ? moment(initialData.dob, "MM/DD/YYYY").format("YYYY-MM-DD")
      : "",
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
      console.log("Initial Data:", initialData);

      const formattedDob = initialData.dob
        ? moment(initialData.dob, "MM/DD/YYYY").format("YYYY-MM-DD") // Use moment for formatting
        : "";
      setFormData({
        fname: initialData.fname,
        lname: initialData.lname,
        dob: formattedDob,
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
        }
      }
    } else if (name === "dob") {
      // Ensure the date is in 'YYYY-MM-DD' format for storage
      setFormData({ ...formData, [name]: value });
    } else {
      // Handle all other fields
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for password match
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Check for uniqueness
      const uniqueCheckResponse = await fetch(
        `http://localhost:5000/api/users/check-unique`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            phoneno: formData.phoneno,
            excludeId: isEditing ? initialData._id : null,
          }),
        }
      );

      if (!uniqueCheckResponse.ok) {
        throw new Error("Failed to check uniqueness");
      }

      const uniquenessData = await uniqueCheckResponse.json();
      if (!uniquenessData.isEmailUnique) {
        alert("Email is already used.");
        return;
      }
      if (!uniquenessData.isPhoneNoUnique) {
        alert("Phone number is already used.");
        return;
      }

      // Prepare form data for submission
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("dob", formData.dob); // Already in 'YYYY-MM-DD' format

      for (const key in formData) {
        if (key !== "dob") {
          formDataToSubmit.append(key, formData[key]);
        }
      }

      let response;
      if (isEditing) {
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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit user data");
      }

      const data = await response.json();
      alert(`User ${isEditing ? "updated" : "added"} successfully!`);
      onAddUser(data.user);

      // Reset form data
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
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <Col xs lg="12" className="p-6 !bg-back2">
      <Card className="!bg-back ps-3">
        <h1 className="pt-2 text-25px">
          {isEditing ? "Edit User" : "Add Users"}
        </h1>
      </Card>
      <Card className="!bg-back ps-3 mt-5">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col>
              <Form.Group className="formleft">
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
              <Form.Group className="formleft">
                <Form.Label>Date of Birth</Form.Label>
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
              <Form.Group className="formleft">
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
              <Form.Group className="formleft">
                <Form.Label>Create Password</Form.Label>
                <Form.Control
                  type="password" // Keep this as "password" to show asterisks
                  name="password"
                  value={formData.password} // Leave it empty for security
                  onChange={handleChange}
                  minLength="6"
                  title="Password must be at least 6 characters long."
                  placeholder={isEditing ? "*******" : ""}
                  style={{ width: "90%" }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password" // Keep this as "password" to show asterisks
                  name="confirmPassword"
                  value={formData.confirmPassword} // Leave it empty for security
                  onChange={handleChange}
                  minLength="6"
                  title="Please confirm your password."
                  placeholder={isEditing ? "*******" : ""}
                  style={{ width: "70%" }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group className="formleft">
                <Form.Label htmlFor="city">City</Form.Label>
                <Form.Control
                  as="select"
                  name="city"
                  required
                  onChange={handleChange}
                  value={formData.city}
                  style={{ width: "90%" }}
                >
                  <option value="" disabled>
                    Select city
                  </option>
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
                      marginTop: "10px",
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
              style={{ width: "200px", marginBottom: "50px" }}
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

  const [searchText, setSearchText] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredSortedUsers, setFilteredAndSortedUsers] = useState(users);

  useEffect(() => {
    console.log("Users updated:", users);
  }, [users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched users:", data);
      setUsers(data.reverse()); // Reverse the users
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }); // Runs once when the component mounts

  // // Add user function
  // const handleUserAdded = () => {
  //   fetchUsers(); // Refresh users when a new user is added
  // };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      // Select all users in the current view
      setSelectedUsers(currentUsers.map((user) => user._id));
    } else {
      // Deselect all users
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

  const handleSearch = () => {
    const result = filterUsers(); // Call your filter function
    setFilteredAndSortedUsers(result); // Update the state with filtered results
    setCurrentPage(1); // Reset to the first page after filtering
  };

  const filterUsers = () => {
    let filteredUsers = [...users];

    // Text search filter
    if (searchText) {
      const lowercasedSearchText = searchText.toLowerCase();
      filteredUsers = filteredUsers.filter((user) =>
        Object.values(user).some((value) =>
          value.toString().toLowerCase().includes(lowercasedSearchText)
        )
      );
    }

    // Date range filter
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (!isNaN(start) && !isNaN(end)) {
        filteredUsers = filteredUsers.filter((user) => {
          const userDate = new Date(user.createdAt);
          return userDate >= start && userDate <= end;
        });
      } else {
        console.error("Invalid date range provided");
      }
    }

    // Sort filtered users by createdAt in descending order
    return filteredUsers.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  };

  const filteredAndSortedUsers = filterUsers();

  const totalPages = Math.ceil(filteredAndSortedUsers.length / itemsPerPage);
  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = filteredAndSortedUsers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

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
      style={{ width: "1382px" }}
    >
      <Card className="!bg-back ps-3 " style={{ padding: "10px" }}>
        <div className="d-flex justify-content-between align-items-start">
          <h1 className="pt-1 text-25px mb-0">Manage Users</h1>
          <div className="mt-3">
            <input
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="me-2"
            />
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="me-2"
            />
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="me-2"
            />
            <Button onClick={handleSearch} style={{ marginLeft: "10px" }}>
              <FontAwesomeIcon icon={faSearch} style={{ marginRight: "5px" }} />
              Search
            </Button>
          </div>
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
      <Table
        striped
        bordered
        hover
        style={{ marginTop: "47px", width: "1334px" }}
      >
        <thead className="table-header">
          <tr>
            <th>
              <input
                type="checkbox"
                onChange={handleSelectAll}
                checked={
                  selectedUsers.length === currentUsers.length &&
                  currentUsers.length > 0
                }
              />
            </th>
            <th>Id</th>
            <th>Image</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Date(MM-DD-YYYY)</th>
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
                <td>
                  {user.dob ? moment(user.dob).format("MM-DD-YYYY") : "N/A"}
                </td>
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
                    disabled={!selectedUsers.includes(user._id)} // Disable if not selected
                  >
                    View
                  </Button>
                  <Button
                    variant="warning"
                    onClick={() => onEditUser(user)}
                    style={{ marginRight: "20px" }}
                    disabled={!selectedUsers.includes(user._id)} // Disable if not selected
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      console.log("Deleting user with ID:", user._id);
                      onDeleteUser(user._id);
                    }}
                    disabled={!selectedUsers.includes(user._id)} // Disable if not selected
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

const CallBackRequest = () => {
  const [callbacks, setCallbacks] = useState([]);
  const [viewedCallback, setViewedCallback] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchCallbacks = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/callbacks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched callbacks:", data.callbacks); // Check the structure of the data
        setCallbacks(data.callbacks.reverse());
      } catch (error) {
        console.error("Failed to fetch callbacks:", error);
      }
    };

    fetchCallbacks();
  }, []);

  const handleToggleRead = async (id, isRead) => {
    const response = await fetch(`http://localhost:5000/api/callbacks/${id}/read`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isRead: !isRead }), // Toggle the read status
    });
  
    if (response.ok) {
      const updatedCallback = await response.json();
      setCallbacks((prev) =>
        prev.map((cb) => (cb._id === id ? updatedCallback : cb))
      );
    } else {
      console.error('Failed to toggle read status:', response.statusText);
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/callbacks/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setCallbacks((prev) => prev.filter((cb) => cb._id !== id));
      if (viewedCallback && viewedCallback._id === id) {
        setViewedCallback(null);
      }
    }
  };

  const handleDeleteSelected = async () => {
    for (const id of selectedIds) {
      await handleDelete(id);
    }
    setSelectedIds([]);
  };

  const handleView = (callback) => {
    setViewedCallback(callback);
    handleToggleRead(callback._id, callback.isRead); // Toggle read status on view
  };

  const handleClose = () => {
    setViewedCallback(null);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(callbacks.map((cb) => cb._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


  // Pagination Logic
  const totalPages = Math.ceil(callbacks.length / itemsPerPage);
  const paginatedCallbacks = callbacks.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
    <Col xs lg="12" className="custom-padding !bg-back2">
      <Card className="!bg-back ps-3" style={{ padding: "10px" }}>
        <div className="d-flex justify-content-between align-items-start">
          <h1 className="pt-1 text-25px mb-0">Manage Users Request</h1>
          <Button
            variant="danger"
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
            style={{ marginLeft: "10px" }}
          >
            <FaTrash />
          </Button>
        </div>
      </Card>
      <Table striped bordered hover style={{ marginTop: "47px" }}>
        <thead className="table-header">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  selectedIds.length === callbacks.length &&
                  callbacks.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Callback Date</th>
            <th>Callback Time</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {callbacks.map((callback) => (
            <tr key={callback._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(callback._id)}
                  onChange={() => handleSelect(callback._id)}
                />
              </td>
              <td>{callback.yourname}</td>
              <td>{callback.youremail}</td>
              <td>{new Date(callback.callbackdate).toLocaleDateString('en-GB')}</td> 
              <td>{callback.callbacktime}</td>
              <td>{callback.message}</td>
              <td>
                <Button variant="primary" onClick={() => handleView(callback)}>
                  View
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(callback._id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
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

      {/* Modal for viewing request details */}
      <Modal show={viewedCallback !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Request Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewedCallback && (
            <div>
              <p>
                <strong>Name:</strong> {viewedCallback.yourname}
              </p>
              <p>
                <strong>Email:</strong> {viewedCallback.youremail}
              </p>
              <p>
              <p><strong>Callback Date:</strong> {viewedCallback && new Date(viewedCallback.callbackdate).toLocaleDateString('en-GB')}</p>
              </p>
              <p>
                <strong>Callback Time:</strong> {viewedCallback.callbacktime}
              </p>
              <p>
                <strong>Message:</strong> {viewedCallback.message}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};


const Comments = () => {
  const [comments, setComments] = useState([]);
  const [viewedComment, setViewedComment] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/comments");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched comments:", data);
        
        // Make sure the data is what you expect
        if (Array.isArray(data)) {
          setComments(data.reverse()); // Adjust this if data structure is different
        } else {
          console.error("Expected an array of comments but got:", data);
          setComments([]); // Reset to an empty array if not valid
        }
      } catch (error) {
        console.error("Failed to fetch comments:", error);
        setComments([]); // Handle error by resetting state
      }
    };

    fetchComments();
  }, []);

  
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/comments/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setComments((prev) => prev.filter((comment) => comment._id !== id));
      if (viewedComment && viewedComment._id === id) {
        setViewedComment(null);
      }
    }
  };

  const handleDeleteSelected = async () => {
    for (const id of selectedIds) {
      await handleDelete(id);
    }
    setSelectedIds([]);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(comments.map((comment) => comment._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleView = (comment) => {
    setViewedComment(comment);
  };

  const handleClose = () => {
    setViewedComment(null);
  };

  // Pagination Logic
  const totalPages = Math.ceil(comments.length / itemsPerPage);
  const paginatedoCmments = comments.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
      <Col xs lg="12" className="custom-padding !bg-back2">
      <Card className="!bg-back ps-3" style={{ padding: "10px" }}>
        <div className="d-flex justify-content-between align-items-start">
          <h1 className="pt-1 text-25px mb-0">Manage Users Comments</h1>
          <Button
            variant="danger"
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
            style={{ marginLeft: "10px" }}
          >
            <FaTrash />
          </Button>
        </div>
      </Card>
      <Table striped bordered hover style={{ marginTop: "47px" }}>
        <thead className="table-header">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  selectedIds.length === comments.length &&
                  comments.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Commets</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr key={comment._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(comment._id)}
                  onChange={() => handleSelect(comment._id)}
                />
              </td>
              <td>{comment.name}</td>
              <td>{comment.email}</td>
              <td>{comment.website}</td>
              <td>{comment.comment}</td>
              <td>{new Date(comment.date).toLocaleDateString('en-GB')}</td>
              <td>
                <Button variant="primary" onClick={() => handleView(comment)}>
                  View
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(comment._id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
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

       {/* Modal for viewing comment details */}
       <Modal show={viewedComment !== null} onHide={handleClose}>
         <Modal.Header closeButton>
         <Modal.Title>Comment Details</Modal.Title>
        </Modal.Header>
       <Modal.Body>
           {viewedComment && (
            <div>
              <p>
                <strong>Name:</strong> {viewedComment.name}
              </p>
              <p>
                <strong>Email:</strong> {viewedComment.email}
              </p>
              <p>
                <strong>Website:</strong> <a href={viewedComment.website} target="_blank" rel="noopener noreferrer">{viewedComment.website}</a>
              </p>
              <p>
                <strong>Comment:</strong> {viewedComment.comment}
              </p>
              <p>
                <strong>Date:</strong> {new Date(viewedComment.date).toLocaleString()}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Col>
  );
};


const Message = () => {
  const [message, setMessage] = useState([]);
  const [viewedMessage, setViewedMessage] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/message");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched message:", data);
        
        // Make sure the data is what you expect
        if (Array.isArray(data)) {
          setMessage(data.reverse()); // Adjust this if data structure is different
        } else {
          console.error("Expected an array of message but got:", data);
          setMessage([]); // Reset to an empty array if not valid
        }
      } catch (error) {
        console.error("Failed to fetch message:", error);
        setMessage([]); // Handle error by resetting state
      }
    };

    fetchMessage();
  }, []);

  
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/message/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setMessage((prev) => prev.filter((message) => message._id !== id));
      if (viewedMessage && viewedMessage._id === id) {
        setViewedMessage(null);
      }
    }
  };

  const handleDeleteSelected = async () => {
    for (const id of selectedIds) {
      await handleDelete(id);
    }
    setSelectedIds([]);
  };

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedIds(message.map((message) => message._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleView = (message) => {
    setViewedMessage(message);
  };

  const handleClose = () => {
    setViewedMessage(null);
  };

  // Pagination Logic
  const totalPages = Math.ceil(message.length / itemsPerPage);
  const paginatedMessage = message.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  return (
      <Col xs lg="12" className="custom-padding !bg-back2">
      <Card className="!bg-back ps-3" style={{ padding: "10px" }}>
        <div className="d-flex justify-content-between align-items-start">
          <h1 className="pt-1 text-25px mb-0">Manage Users Messages</h1>
          <Button
            variant="danger"
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
            style={{ marginLeft: "10px" }}
          >
            <FaTrash />
          </Button>
        </div>
      </Card>
      <Table striped bordered hover style={{ marginTop: "47px" }}>
        <thead className="table-header">
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  selectedIds.length === message.length &&
                  message.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Subject</th>
            <th>Message</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {message.map((message) => (
            <tr key={message._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(message._id)}
                  onChange={() => handleSelect(message._id)}
                />
              </td>
              <td>{message.name}</td>
              <td>{message.email}</td>
              <td>{message.subject}</td>
              <td>{message.message}</td>
              <td>{new Date(message.date).toLocaleDateString('en-GB')}</td>
              <td>
                <Button variant="primary" onClick={() => handleView(message)}>
                  View
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(message._id)}
                  style={{ marginLeft: "5px" }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
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

       {/* Modal for viewing message details */}
       <Modal show={viewedMessage !== null} onHide={handleClose}>
         <Modal.Header closeButton>
         <Modal.Title>Message Details</Modal.Title>
        </Modal.Header>
       <Modal.Body>
           {viewedMessage && (
            <div>
              <p>
                <strong>Name:</strong> {viewedMessage.name}
              </p>
              <p>
                <strong>Email:</strong> {viewedMessage.email}
              </p>
              <p>
                <strong>Subject:</strong> {viewedMessage.subject}
              </p>
              <p>
                <strong>Message:</strong> {viewedMessage.message}
              </p>
              <p>
                <strong>Date:</strong> {new Date(viewedMessage.date).toLocaleString()}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
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
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log("Fetched users:", data);
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers(); // Call fetchUsers inside useEffect
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

      // Check for uniqueness
      const isEditing = editIndex !== null;

      // Fetch uniqueness
      let uniqueCheckResponse;
      if (isEditing) {
        uniqueCheckResponse = await fetch(
          `http://localhost:5000/api/users/check-unique`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formattedUser.email,
              phoneno: formattedUser.phoneno,
              excludeId: editIndex,
            }),
          }
        );
      } else {
        uniqueCheckResponse = await fetch(
          `http://localhost:5000/api/users/check-unique`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: formattedUser.email,
              phoneno: formattedUser.phoneno,
            }),
          }
        );
      }

      if (!uniqueCheckResponse.ok) {
        throw new Error("Failed to check uniqueness");
      }

      const uniquenessData = await uniqueCheckResponse.json();

      if (!uniquenessData.isEmailUnique) {
        alert("Email is already used.");
        return;
      }

      if (!uniquenessData.isPhoneNoUnique) {
        alert("Phone number is already used.");
        return;
      }

      // Add or update user in DB
      let response;
      if (isEditing) {
        response = await fetch(`http://localhost:5000/api/users/${editIndex}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedUser),
        });
      } else {
        response = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formattedUser),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to submit user data");
      }

      // Fetch updated user list after adding/updating
      await fetchUsers();

      // Reset edit index
      setEditIndex(null);
    } catch (error) {
      console.error("Error adding or updating user:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditIndex(user._id); // Set the ID or any unique identifier
    setActiveButton("Add User"); // Change to "Add User" to open the form
  };
  console.log("Current Users State:", users);
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
            setUsers={setUsers}
          />
        );
      case "Manage Request":
        return <CallBackRequest />;
        case "Manage Comments":
        return <Comments />;
        case "Manage Message":
        return <Message />;
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
