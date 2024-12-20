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
import iconMap from "../assets/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faBars } from "@fortawesome/free-solid-svg-icons";
import { AiFillDashboard } from "react-icons/ai";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFilePdf, faFileCsv } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FaTrash, FaSave, FaTimes, FaTrashAlt } from "react-icons/fa";
import { FaPlus, FaEdit } from "react-icons/fa"; // Importing the "+" and bin icon
import jsPDF from "jspdf";
import "jspdf-autotable";
import "../App.css";

const DashboardContent = (
  <Col xs lg="12" className="p-5 !bg-green">
    <Row className="g-5">
      <Col lg={4}>
        <Card className="!bg-back" style={{ width: "100%", height: "250px" }}>
          <Card.Body>
            <Card.Title>Total Project</Card.Title>
            <Card.Text className="textsize text-center">5</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="!bg-back" style={{ width: "100%", height: "250px" }}>
          <Card.Body>
            <Card.Title>Program Budget</Card.Title>
            <Card.Text className="textsize text-center">14</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col lg={4}>
        <Card className="!bg-back" style={{ width: "100%", height: "250px" }}>
          <Card.Body>
            <Card.Title>Estimate at Completion</Card.Title>
            <Card.Text className="textsize text-center">7.11m</Card.Text>
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
    const response = await fetch(
      `http://localhost:5000/api/callbacks/${id}/read`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isRead: !isRead }), // Toggle the read status
      }
    );

    if (response.ok) {
      const updatedCallback = await response.json();
      setCallbacks((prev) =>
        prev.map((cb) => (cb._id === id ? updatedCallback : cb))
      );
    } else {
      console.error("Failed to toggle read status:", response.statusText);
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
  const paginatedCallbacks = callbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
              <td>
                {new Date(callback.callbackdate).toLocaleDateString("en-GB")}
              </td>
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
                <p>
                  <strong>Callback Date:</strong>{" "}
                  {viewedCallback &&
                    new Date(viewedCallback.callbackdate).toLocaleDateString(
                      "en-GB"
                    )}
                </p>
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
  const paginatedoCmments = comments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
                  selectedIds.length === comments.length && comments.length > 0
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
              <td>{new Date(comment.date).toLocaleDateString("en-GB")}</td>
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
                <strong>Website:</strong>{" "}
                <a
                  href={viewedComment.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {viewedComment.website}
                </a>
              </p>
              <p>
                <strong>Comment:</strong> {viewedComment.comment}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(viewedComment.date).toLocaleString()}
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
  const paginatedMessage = message.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
                  selectedIds.length === message.length && message.length > 0
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
              <td>{new Date(message.date).toLocaleDateString("en-GB")}</td>
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
                <strong>Date:</strong>{" "}
                {new Date(viewedMessage.date).toLocaleString()}
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

const ManageBanner = ({ carousel }) => {
  const [carouselData, setCarouselData] = useState(null);
  const [selectedId, setSelectedId] = useState(carousel);
  const [formState, setFormState] = useState({
    id: "",
    name: "",
    isEnabled: "disabled",
  });
  const [itemFormState, setItemFormState] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    if (selectedId) {
      const fetchCarouselData = async () => {
        const response = await fetch(
          `http://localhost:5000/api/carousels/${selectedId}`
        );
        const data = await response.json();

        if (data) {
          setCarouselData(data);

          setFormState({
            id: data.id,
            name: data.name,
            isEnabled: data.isEnabled ? "enabled" : "disabled",
          });

          if (data.items && data.items.length > 0) {
            const updatedItemFormState = data.items.map((item) => ({
              _id: item._id, // Add the _id here
              carouselId: data._id,
              icon: item.icon,
              heading: item.heading,
              caption: item.caption,
              status: item.isEnabled ? "enabled" : "disabled",
              image: item.imagePath || null, // or just store null if no image
            }));

            setItemFormState(updatedItemFormState);
          }
        }
      };

      fetchCarouselData();
    }
  }, [selectedId]);
  // console.log("received Carousel with ID:", selectedId);

  // Handle changes in carousel form fields
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle changes in item form fields
  const handleItemFormChange = (e, index) => {
    const { name, value } = e.target;
    const updatedItemFormState = [...itemFormState];
    updatedItemFormState[index] = {
      ...updatedItemFormState[index],
      [name]: value,
    };
    setItemFormState(updatedItemFormState);
  };

  // Handle item form file upload
  const handleItemFileChange = (e, index) => {
    const updatedItemFormState = [...itemFormState];
    updatedItemFormState[index] = {
      ...updatedItemFormState[index],
      image: e.target.files[0],
    };
    setItemFormState(updatedItemFormState);
  };

  // Handle carousel update request
  const handleCarouselUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:5000/api/carousels/${selectedId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formState.name, // Ensure you're sending the correct data for the carousel
            isEnabled: formState.isEnabled === "enabled" ? true : false, // Convert to boolean explicitly
          }),
        }
      );

      if (response.ok) {
        alert("Carousel updated successfully");
      } else {
        const errorData = await response.json();
        console.error("Error response from backend:", errorData);
        alert(
          `Error updating carousel: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error in handleCarouselUpdate:", error);
      alert("Error updating carousel");
    }
  };

  // Handle item update request
  const handleItemUpdate = async (e, carouselId, itemId, index) => {
    e.preventDefault();

    // Extract the updated item data from the state
    const updatedItem = itemFormState[index];

    // Create FormData object for the request (to handle file uploads)
    const formData = new FormData();
    formData.append("carouselId", carouselId);
    formData.append("itemId", itemId);
    formData.append("icon", updatedItem.icon); // Assuming 'icon' is just text or a value
    formData.append("heading", updatedItem.heading);
    formData.append("caption", updatedItem.caption);
    formData.append("status", updatedItem.status); // It could be 'enabled' or 'disabled'

    // If there's an image file, append it to the FormData
    if (updatedItem.image) {
      formData.append("image", updatedItem.image); // 'image' should be a file object from the file input
    }

    try {
      // Send the PUT request to update the item
      const response = await fetch(
        `http://localhost:5000/api/carousels/${carouselId}/items/${itemId}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error updating item:", errorText);
        alert(`Failed to update item: ${errorText}`);
      } else {
        const updatedCarousel = await response.json();
        alert("Item updated successfully!");
        // Optionally, update the state here to reflect the updated data
        // e.g., you can update `carouselData` to show the newly updated item
      }
    } catch (err) {
      console.error("Error in handleItemUpdate:", err);
      alert("Error updating item");
    }
  };

  const handleItemDelete = async (carouselId, itemId) => {
    try {
      // Make the DELETE request to remove the item
      const response = await fetch(
        `http://localhost:5000/api/carousels/${carouselId}/items/${itemId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        alert("Item deleted successfully");
        // Optionally, refresh the carousel data after deletion
        // setCarouselData(updatedCarouselData);
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Error deleting item"}`);
      }
    } catch (error) {
      alert("Error deleting item");
      console.error("Error:", error);
    }
  };

  // Handle Select All checkbox change
  const handleSelectAllChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      const allItems = carouselData.items.map((item, index) => index); // Select all items by index
      setSelectedItems(allItems);
    } else {
      setSelectedItems([]); // Deselect all items
    }
  };

  // Handle individual item selection
  const handleItemSelect = (e, index) => {
    const isChecked = e.target.checked;
    setSelectedItems((prevSelectedItems) => {
      if (isChecked) {
        return [...prevSelectedItems, index]; // Add item to selected list
      } else {
        return prevSelectedItems.filter((itemIndex) => itemIndex !== index); // Remove item from selected list
      }
    });
  };

  // Reset form to initial state
  const handleCancel = () => {
    if (carouselData) {
      setFormState({
        id: carouselData.id,
        name: carouselData.name,
        isEnabled: carouselData.isEnabled ? "enabled" : "disabled",
      });

      const updatedItemFormState = carouselData.items.map((item) => ({
        carouselId: carouselData.id,
        icon: item.icon,
        heading: item.heading,
        caption: item.caption,
        status: item.isEnabled ? "enabled" : "disabled",
        image: item.imagePath || null,
      }));
      setItemFormState(updatedItemFormState);
      setSelectedItems([]); // Reset selected items
    }
  };

  if (!carouselData || !Array.isArray(carouselData.items)) {
    return <div>Loading...</div>; // Show loading state or message if data is not available
  }

  return (
    <div>
      <Col xs lg="12" className="custom-padding !bg-back2">
        <Card className="!bg-back ps-3" style={{ padding: "10px" }}>
          <h1 className="pt-1 text-25px mb-0">Edit Carousel</h1>
        </Card>

        {/* Carousel Form */}
        <form onSubmit={handleCarouselUpdate}>
          <Table striped bordered hover style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Carousel Id</th>
                <th>Carousel Name</th>
                <th>Status</th>
                <th style={{ width: "183px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    name="id"
                    required
                    className="form-control"
                    value={formState.id}
                    onChange={handleFormChange}
                  />
                </td>
                <td>
                  <input
                    name="name"
                    required
                    className="form-control"
                    value={formState.name}
                    onChange={handleFormChange}
                  />
                </td>
                <td>
                  <select
                    name="isEnabled"
                    className="form-control"
                    value={formState.isEnabled}
                    onChange={handleFormChange}
                  >
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </td>
                <td>
                  <Button
                    type="submit"
                    variant="primary"
                    style={{ marginRight: "15px" }}
                  >
                    <FaSave />
                  </Button>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleCancel} // Attach handleCancel to the cancel button
                  >
                    <FaTimes />
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </form>

        {/* Item Form */}
        <div>
          <h3 style={{ marginTop: "20px" }}>Edit Items</h3>
          <Table striped bordered hover style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAllChange}
                    checked={selectedItems.length === carouselData.items.length}
                  />
                </th>
                <th>Id</th>
                <th>Carousel Image</th>
                <th>Icon</th>
                <th>Heading</th>
                <th>Button Caption</th>
                <th>Status</th>
                <th style={{ width: "183px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {carouselData.items.map((item, index) => (
                <tr key={item._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(index)}
                      onChange={(e) => handleItemSelect(e, index)}
                    />
                  </td>
                  <td>{index + 1}</td>
                  <td>
                    {item.imagePath ? (
                      <img
                        src={`http://localhost:5000/${item.imagePath}`}
                        alt="Item Image"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div>No Image</div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={(e) => handleItemFileChange(e, index)}
                    />
                  </td>
                  <td>
                    <select
                      name="icon"
                      required
                      className="form-control"
                      value={itemFormState[index]?.icon || ""}
                      onChange={(e) => handleItemFormChange(e, index)}
                    >
                      <option value="">Select Icon</option>
                      {Object.keys(iconMap).map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      name="heading"
                      required
                      className="form-control"
                      value={itemFormState[index]?.heading || ""}
                      onChange={(e) => handleItemFormChange(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      name="caption"
                      required
                      className="form-control"
                      value={itemFormState[index]?.caption || ""}
                      onChange={(e) => handleItemFormChange(e, index)}
                    />
                  </td>
                  <td>
                    <select
                      name="status"
                      className="form-control"
                      value={itemFormState[index]?.status || ""}
                      onChange={(e) => handleItemFormChange(e, index)}
                    >
                      <option value="enabled">Enabled</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </td>
                  <td>
                    <Button
                      type="button"
                      variant="primary"
                      style={{ marginRight: "15px" }}
                      onClick={(e) =>
                        handleItemUpdate(e, carouselData._id, item._id, index)
                      } // Pass the itemId to update
                    >
                      <FaSave />
                    </Button>
                    <Button
                      type="button"
                      onClick={handleCancel}
                      variant="secondary"
                      style={{ marginRight: "15px" }}
                    >
                      <FaTimes />
                    </Button>
                    <Button
                      type="button"
                      variant="danger"
                      onClick={() =>
                        handleItemDelete(carouselData._id, item._id)
                      }
                    >
                      <FaTrashAlt />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Col>
    </div>
  );
};

const CarouselList = ({ onEditCarousel }) => {
  const [carousels, setCarousels] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    const fetchCarousels = async () => {
      const response = await fetch("http://localhost:5000/api/carousels");
      const data = await response.json();
      setCarousels(data);
    };
    fetchCarousels();
  }, []);

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(carousels.map((carousel) => carousel.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleEdit = (carousel) => {
    console.log("Editing Carousel with ID:", carousel._id);
    onEditCarousel(carousel._id); // This triggers the edit action in CarouselManager
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this carousel?")) {
      const response = await fetch(
        `http://localhost:5000/api/carousels/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        // If the request was successful, update the state
        setCarousels((prev) => prev.filter((carousel) => carousel._id !== id));
        alert("Carousel deleted successfully.");
      } else {
        // If there was an error, show an alert
        const errorData = await response.json();
        alert(`Error: ${errorData.message || "Could not delete carousel."}`);
      }
    }
  };

  const handleDeleteSelected = async () => {
    if (
      window.confirm("Are you sure you want to delete the selected carousels?")
    ) {
      await Promise.all(
        selectedIds.map((id) =>
          fetch(`http://localhost:5000/api/carousels/${id}`, {
            method: "DELETE",
          })
        )
      );
      setCarousels((prev) =>
        prev.filter((carousel) => !selectedIds.includes(carousel._id))
      );
      setSelectedIds([]);
    }
  };

  const onChangeInput = (e, id) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [name]: value,
      },
    }));
  };

  const handleSave = async (id) => {
    const carouselData = editData[id] || {}; // Get the data for the specific carousel being edited

    try {
      // Send a PUT request to the backend to update the carousel
      const response = await fetch(
        `http://localhost:5000/api/carousels/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: carouselData.name,
            isEnabled: carouselData.isEnabled === "enabled", // Convert to boolean if it's a string
          }),
        }
      );

      // Check if the response was successful
      if (!response.ok) {
        throw new Error("Failed to update carousel");
      }

      // Parse the response to get the updated carousel
      const data = await response.json();

      // Update the carousels state with the updated data
      setCarousels((prev) =>
        prev.map((carousel) =>
          carousel._id === id ? { ...carousel, ...data } : carousel
        )
      );

      // Clear the edit data for this carousel
      setEditData((prev) => {
        const newData = { ...prev };
        delete newData[id];
        return newData;
      });

      alert("Carousel updated successfully!");
    } catch (error) {
      console.error("Error saving carousel data:", error);
      alert("Failed to update carousel.");
    }
  };

  return (
    <Col xs lg="12" className="custom-padding !bg-back2">
      <Card className="!bg-back ps-3" style={{ padding: "10px" }}>
        <div className="d-flex justify-content-between align-items-start">
          <h1 className="pt-1 text-25px mb-0">Carousel List</h1>
          <Button
            variant="danger"
            onClick={handleDeleteSelected}
            disabled={selectedIds.length === 0}
            style={{ marginLeft: "10px" }}
          >
            <FaTrash /> {/* Trash icon only */}
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
                  selectedIds.length === carousels.length &&
                  carousels.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {carousels.map((carousel) => (
            <tr key={carousel._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(carousel._id)}
                  onChange={() => handleSelect(carousel._id)}
                />
              </td>
              <td>
                <input
                  className="tableinput"
                  name="id"
                  value={carousel.id}
                  type="text"
                  onChange={(e) => onChangeInput(e, carousel._id)}
                  placeholder="ID"
                />
              </td>
              <td>
                <input
                  className="tableinput"
                  name="name"
                  value={editData[carousel._id]?.name || carousel.name}
                  type="text"
                  onChange={(e) => onChangeInput(e, carousel._id)}
                  placeholder="Type Name"
                />
              </td>
              <select
                name="isEnabled"
                value={
                  editData[carousel._id]?.isEnabled ??
                  (carousel.isEnabled ? "enabled" : "disabled")
                }
                onChange={(e) => onChangeInput(e, carousel._id)}
              >
                <option value="enabled">Enabled</option>
                <option value="disabled">Disabled</option>
              </select>
              <td>
                <Button variant="primary" onClick={() => handleEdit(carousel)}>
                  <FaEdit />
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(carousel._id)}
                  style={{ marginLeft: "5px" }}
                >
                  <FaTrash />
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleSave(carousel._id)}
                  style={{ marginLeft: "5px" }}
                >
                  <FaSave />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Col>
  );
};

const CarouselManager = () => {
  const [carouselData, setCarouselData] = useState({
    id: "",
    name: "",
    isEnabled: "enabled",
  });

  const [newItem, setNewItem] = useState({
    image: null,
    icon: "",
    heading: "",
    caption: "",
    status: "enabled",
    carouselId: "",
  });

  const [carousels, setCarousels] = useState([]);

  useEffect(() => {
    const fetchCarousels = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/carousels");
        const data = await response.json();
        console.log("Fetched carousels:", data); // Log the fetched data
        setCarousels(data);
      } catch (error) {
        console.error("Error fetching carousels:", error);
      }
    };
    fetchCarousels();
  }, []);

  const handleCarouselChange = (e) => {
    const { name, value } = e.target;
    setCarouselData((prev) => ({ ...prev, [name]: value }));
  };

  const handleItemChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prev) => ({
      ...prev,
      [name]: name === "status" ? value : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setNewItem((prev) => ({ ...prev, image: file }));
  };

  const handleCarouselSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:5000/api/carousels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...carouselData,
          isEnabled: carouselData.isEnabled === "enabled",
        }),
      });
      resetCarouselForm();
      alert("Carousel added successfully!");
    } catch (error) {
      console.error("Error submitting carousel:", error);
      alert("Failed to submit carousel. Check console for details.");
    }
  };

  const resetCarouselForm = () => {
    setCarouselData({ id: "", name: "", isEnabled: "enabled" });
  };

  const resetNewItem = () => {
    setNewItem({
      image: null,
      icon: "",
      heading: "",
      caption: "",
      status: "enabled",
      carouselId: "",
    });
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting Item:", {
      image: newItem.image,
      icon: newItem.icon,
      heading: newItem.heading,
      caption: newItem.caption,
      status: newItem.status, // Log the status here
      carouselId: newItem.carouselId,
    });

    const formData = new FormData();
    formData.append("image", newItem.image);
    formData.append("icon", newItem.icon);
    formData.append("heading", newItem.heading);
    formData.append("caption", newItem.caption);
    formData.append("status", newItem.status); // This should be a string
    formData.append("carouselId", newItem.carouselId);

    try {
      const response = await fetch(
        "http://localhost:5000/api/carousels/items",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      alert("Item added successfully!");
      resetNewItem();
    } catch (error) {
      console.error("Error submitting item:", error);
      alert("Failed to submit item. Check console for details.");
    }
  };

  return (
    <div>
      <Col xs lg="12" className="custom-padding !bg-back2">
        <Card className="!bg-back ps-3" style={{ padding: "10px" }}>
          <h1 className="pt-1 text-25px mb-0"> Add Carousel </h1>
        </Card>

        {/* Carousel Form */}
        <form onSubmit={handleCarouselSubmit}>
          <Table striped bordered hover style={{ marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Carousel Id</th>
                <th>Carousel Name</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    name="id"
                    value={carouselData.id}
                    onChange={handleCarouselChange}
                    required
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    name="name"
                    value={carouselData.name}
                    onChange={handleCarouselChange}
                    required
                    className="form-control"
                  />
                </td>
                <td>
                  <select
                    name="isEnabled"
                    value={carouselData.isEnabled}
                    onChange={handleCarouselChange}
                    className="form-control"
                  >
                    <option value="enabled">Enabled</option>
                    <option value="disabled">Disabled</option>
                  </select>
                </td>
                <td>
                  <Button type="submit" variant="primary">
                    Add Carousel
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </form>

        {/* Item Form */}
        <div>
          <h3 style={{ marginTop: "20px" }}>Add Items to Carousel</h3>
          <form onSubmit={handleItemSubmit}>
            <Table striped bordered hover style={{ marginTop: "20px" }}>
              <thead>
                <tr>
                  <th>Select Carousel</th>
                  <th>Carousel Image</th>
                  <th>Icon</th>
                  <th>Heading</th>
                  <th>Button Caption</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <select
                      name="carouselId"
                      value={newItem.carouselId || ""}
                      onChange={handleItemChange}
                      required
                      className="form-control"
                    >
                      <option value="">Select Carousel</option>
                      {carousels.map((carousel) => (
                        <option key={carousel.id} value={carousel.id}>
                          {carousel.name} (ID: {carousel.id})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required
                      className="form-control"
                    />
                  </td>
                  <td>
                    <select
                      name="icon"
                      value={newItem.icon}
                      onChange={handleItemChange}
                      required
                      className="form-control"
                    >
                      <option value="">Select Icon</option>
                      {/* Replace this with your actual iconMap */}
                      {Object.keys(iconMap).map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      name="heading"
                      value={newItem.heading}
                      onChange={handleItemChange}
                      required
                      className="form-control"
                    />
                  </td>
                  <td>
                    <input
                      name="caption"
                      value={newItem.caption}
                      onChange={handleItemChange}
                      required
                      className="form-control"
                    />
                  </td>
                  <td>
                    <select
                      name="status"
                      value={newItem.status}
                      onChange={handleItemChange}
                      className="form-control"
                    >
                      <option value="enabled">Enabled</option>
                      <option value="disabled">Disabled</option>
                    </select>
                  </td>
                  <td>
                    <Button type="submit" variant="primary">
                      Add Item
                    </Button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </form>
        </div>
      </Col>
    </div>
  );
};

const EmailManager = () => {
  const [emails, setEmails] = useState([]);
  const [viewedEmail, setViewedEmail] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        // Change the URL to match your correct backend endpoint
        const response = await fetch("http://localhost:5000/api/quickcontact");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched emails:", data);

        // Ensure the data is an array and contains the expected fields
        if (Array.isArray(data)) {
          setEmails(data.reverse()); // Optionally reverse the order if needed
        } else {
          console.error("Expected an array of emails but got:", data);
          setEmails([]); // Reset to an empty array if data is not valid
        }
      } catch (error) {
        console.error("Failed to fetch Emails:", error);
        setEmails([]); // Handle error by resetting state
      }
    };

    fetchEmails();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(
      `http://localhost:5000/api/quickcontact/${id}`,
      {
        method: "DELETE",
      }
    );

    if (response.ok) {
      setEmails((prev) => prev.filter((email) => email._id !== id));
      if (viewedEmail && viewedEmail._id === id) {
        setViewedEmail(null);
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
      setSelectedIds(emails.map((email) => email._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleView = (email) => {
    setViewedEmail(email);
  };

  const handleClose = () => {
    setViewedEmail(null);
  };

  // Pagination Logic
  const totalPages = Math.ceil(emails.length / itemsPerPage);
  const paginatedEmails = emails.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Col xs lg="12" className="custom-padding !bg-back2">
      <Card className="!bg-back ps-3" style={{ padding: "10px" }}>
        <div className="d-flex justify-content-between align-items-start">
          <h1 className="pt-1 text-25px mb-0">Manage Users Emails</h1>
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
                  selectedIds.length === emails.length && emails.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedEmails.map((email) => (
            <tr key={email._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(email._id)}
                  onChange={() => handleSelect(email._id)}
                />
              </td>
              <td>{email.name}</td>
              <td>{email.email}</td>
              <td>{new Date(email.date).toLocaleDateString("en-GB")}</td>
              <td>{email.message}</td>
              <td>
                <Button variant="primary" onClick={() => handleView(email)}>
                  View
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(email._id)}
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

      {/* Modal for viewing Email details */}
      <Modal show={viewedEmail !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Email Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewedEmail && (
            <div>
              <p>
                <strong>Name:</strong> {viewedEmail.name}
              </p>
              <p>
                <strong>Email:</strong> {viewedEmail.email}
              </p>
              <p>
                <strong>Message:</strong> {viewedEmail.message}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(viewedEmail.date).toLocaleString()}
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

const BookingManager = () => {
  const [bookings, setBookings] = useState([]);
  const [viewedBooking, setViewedBooking] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/booking");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched bookings:", data);

        // Make sure the data is what you expect
        if (Array.isArray(data)) {
          setBookings(data.reverse()); // Adjust this if data structure is different
        } else {
          console.error("Expected an array of bookings but got:", data);
          setBookings([]); // Reset to an empty array if not valid
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        setBookings([]); // Handle error by resetting state
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:5000/api/booking/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      setBookings((prev) => prev.filter((booking) => booking._id !== id));
      if (viewedBooking && viewedBooking._id === id) {
        setViewedBooking(null);
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
      setSelectedIds(bookings.map((booking) => booking._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleView = (booking) => {
    setViewedBooking(booking);
  };

  const handleClose = () => {
    setViewedBooking(null);
  };

  // Pagination Logic
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const paginatedoBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Col xs lg="12" className="custom-padding !bg-back2">
      <Card className="!bg-back ps-3" style={{ padding: "10px" }}>
        <div className="d-flex justify-content-between align-items-start">
          <h1 className="pt-1 text-25px mb-0">Manage Bookings</h1>
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
                  selectedIds.length === bookings.length && bookings.length > 0
                }
                onChange={handleSelectAll}
              />
            </th>
            <th>Name</th>
            <th>Email</th>
            <th>Number</th>
            <th>Address</th>
            <th>Service</th>
            <th>Description</th>
            <th style={{ width : '15%' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking._id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(booking._id)}
                  onChange={() => handleSelect(booking._id)}
                />
              </td>
              <td>{booking.name}</td>
              <td>{booking.email}</td>
              <td>{booking.number}</td>
            <td>{booking.address}</td>
            <td>{booking.service}</td>
            <td>{booking.description}</td>
              <td>
                <Button variant="primary" onClick={() => handleView(booking)}>
                  View
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(booking._id)}
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

      {/* Modal for viewing Booking details */}
      <Modal show={viewedBooking !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewedBooking && (
            <div>
              <p>
                <strong>Name:</strong> {viewedBooking.name}
              </p>
              <p>
                <strong>Email:</strong> {viewedBooking.email}
              </p>
              <p>
                <strong>Number:</strong> {viewedBooking.number}
              </p>
              <p>
                <strong>Address:</strong> {viewedBooking.address}
              </p>
              <p>
                <strong>Service:</strong> {viewedBooking.service}
              </p>
              <p>
                <strong>Description:</strong> {viewedBooking.description}
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

  const [currentCarousel, setCurrentCarousel] = useState(null);

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

  // Handle the edit carousel action
  const handleEditCarousel = (carousel) => {
    setCurrentCarousel(carousel); // Set the selected carousel for editing
    setActiveButton("Manage Banner"); // Change to "Manage Banner" to open the form
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
      case "Manage Banner":
        return <ManageBanner carousel={currentCarousel} />;
      case "Carousel List":
        return <CarouselList onEditCarousel={handleEditCarousel} />;
      case "Add Carousel Item":
        return <CarouselManager />;
      case "Manage Emails":
        return <EmailManager />;
      case "Manage Booking":
        return <BookingManager />;
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
