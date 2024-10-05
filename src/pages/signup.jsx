import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SignupForm = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    dob: "",
    gender: "",
    email: "",
    phoneno: "",
    city: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });

  const [fileInputKey, setFileInputKey] = useState(Date.now());
  const [avatarPreview, setAvatarPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };

  const checkUniqueEmailAndPhone = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/users/check-unique",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: formData.email,
            phoneno: formData.phoneno,
          }),
        }
      );
      const data = await response.json();
      return data; // This will return an object with isEmailUnique and isPhoneNoUnique
    } catch (error) {
      console.error("Error checking uniqueness:", error);
      return { isEmailUnique: false, isPhoneNoUnique: false };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      window.alert("Passwords do not match!"); // Alert for password mismatch
      return;
    }

    // Check unique email and phone number
    const { isEmailUnique, isPhoneNoUnique } = await checkUniqueEmailAndPhone();
    if (!isEmailUnique || !isPhoneNoUnique) {
      window.alert("Email or Phone number already exists!"); // Alert for uniqueness check
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        body: formDataToSend,
      });
      const data = await response.json();
      if (response.ok) {
        window.alert("Registered successfully!"); // Alert for successful registration
        // Reset form after submission
        setFormData({
          fname: "",
          lname: "",
          dob: "",
          gender: "",
          email: "",
          phoneno: "",
          city: "",
          password: "",
          confirmPassword: "",
          avatar: null,
        });
        setAvatarPreview(null);
        setFileInputKey(Date.now());
      } else {
        window.alert(data.error || "Registration failed. Please try again."); // Alert for registration failure
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred. Please try again."); // Alert for other errors
    }
  };

  return (
    <Container
      fluid
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-registerbg"
    >
      <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg backdrop-blur-md">
        <h2 className="text-center text-gray-800 mb-6 text-2xl font-semibold">
          User SignUp Form
        </h2>
        <Form onSubmit={handleSubmit} style={{ width: "900px" }}>
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
                  pattern="^[A-Za-z]+$"
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
                  pattern="^[A-Za-z]+$"
                  title="Last name should contain only letters."
                  style={{ width: "70%" }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Group className="formleft">
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
                    value="Transgender"
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
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
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
                  pattern="^\d{10}$"
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
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  minLength="6"
                  title="Password must be at least 6 characters long."
                  placeholder={"*******"}
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
                  onChange={handleChange}
                  minLength="6"
                  title="Please confirm your password."
                  placeholder={"*******"}
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
                  accept="image/*"
                  onChange={handleFileChange} // Update this line to handle file change
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
      </div>
    </Container>
  );
};

export default SignupForm;
