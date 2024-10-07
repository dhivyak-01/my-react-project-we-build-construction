// import React from "react";
// import { Form, Button, Container, Row } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
// // Import the configuration object
// import { adminlogin } from '../assets/data'; // Adjust the path accordingly

// const AdminLogin = () => {
//   return (
//     <Container fluid className="min-h-screen flex items-center justify-center bg-cover bg-center bg-registerbg">
//       <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg backdrop-blur-md max-w-lg w-full">
//         <h2 className="text-center text-customorange mb-6 text-2xl font-semibold">
//           {adminlogin.title}
//         </h2>
//         <Form>
//           {adminlogin.fields.map((field) => (
//             <Row className="mb-3" key={field.id}>
//               <Form.Group controlId={field.id}>
//                 <Form.Label>{field.label}</Form.Label>
//                 <Form.Control
//                   type={field.type}
//                   required={field.required}
//                 />
//               </Form.Group>
//             </Row>
//           ))}
//           {adminlogin.button.map((btn) => (
//             <Button 
//               key={btn.to}
//               type="submit" 
//               className="w-full !bg-customorange text-white border-0"
//               onClick={() => window.location.href = btn.to} // Redirects to the specified route
//             >
//               {btn.label}
//             </Button>
//           ))}
//         </Form>
//       </div>
//     </Container>
//   );
// };

// export default AdminLogin;











import React, { useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import the configuration object
import { adminlogin } from '../assets/data'; // Adjust the path accordingly

const Adminlogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      // Assuming the backend sends back a success message on successful login
      setSuccess(response.data.message || 'Login successful');
      setError(null);
      // Only navigate if login is successful
      if (response.data.success) { // Make sure your backend returns success status
        login();
        navigate('/admin');
      }
      else {
        setError('Invalid credentials');
    }
    } catch (error) {
      // Check if error.response and error.response.data exist before accessing them
      const errorMessage = error.response?.data?.message || 'An error occurred. Please try again.';
      setError(errorMessage);
      setSuccess(null);
    }
  };

  return (
    <Container className="min-h-screen d-flex align-items-center justify-content-center bg-cover bg-center bg-registerbg">
      <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg backdrop-blur-md max-w-lg w-100">
        <h2 className="text-center text-gray-800 mb-6 text-2xl font-semibold">
          {adminlogin.title}
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <Form onSubmit={handleSubmit}>
          {adminlogin.fields.map((field) => (
            <Row className="mb-3" key={field.id}>
              <Form.Group controlId={field.id}>
                <Form.Label>{field.label}</Form.Label>
                <Form.Control
                  type={field.type}
                  required={field.required}
                  value={formData[field.id] || ''}
                  onChange={handleChange}
                  autoComplete={field.type === 'password' ? 'current-password' : 'off'}
                />
              </Form.Group>
            </Row>
          ))}
          {adminlogin.button.map((btn, index) => (
            <Button
              key={index}
              type="submit"
              className="w-100 border-0 !bg-customorange text-white"
            >
              {btn.label}
            </Button>
          ))}
        </Form>
      </div>
    </Container>
  );
};

export default Adminlogin;
