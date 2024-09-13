import React, { useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import 'bootstrap/dist/css/bootstrap.min.css';

const Adminlogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      setSuccess(response.data.message);
      setError(null);
      // Redirect to Admin Panel
      navigate('/adminpanel'); // Use navigate instead of history.push
    } catch (error) {
      setError(error.response.data.message);
      setSuccess(null);
    }
  };

  return (
    <Container className="min-h-screen d-flex align-items-center justify-content-center bg-cover bg-center bg-registerbg">
      <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg backdrop-blur-md max-w-lg w-100">
        <h2 className="text-center text-gray-800 mb-6 text-2xl font-semibold">
          Admin Login
        </h2>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control 
                type="email" 
                required 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              required 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </Form.Group>
          <Button type="submit" className="w-100 border-0 bg-customorange text-white">
            Login
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Adminlogin;








// import React, { useState } from 'react';
// import { Form, Button, Container, Row } from 'react-bootstrap';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Adminlogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/login', { email, password });
//       setSuccess(response.data.message);
//       setError(null);
//       // Handle successful login (e.g., redirect to admin panel)
//       // e.g., window.location.href = '/adminpanel';
//     } catch (error) {
//       setError(error.response.data.message);
//       setSuccess(null);
//     }
//   };

//   return (
//     <Container className="min-h-screen d-flex align-items-center justify-content-center bg-cover bg-center bg-registerbg">
//       <div className="bg-white bg-opacity-30 p-8 rounded-lg shadow-lg backdrop-blur-md max-w-lg w-100">
//         <h2 className="text-center text-gray-800 mb-6 text-2xl font-semibold">
//           Admin Login
//         </h2>
//         {error && <div className="alert alert-danger">{error}</div>}
//         {success && <div className="alert alert-success">{success}</div>}
//         <Form onSubmit={handleSubmit}>
//           <Row className="mb-3">
//             <Form.Group controlId="email">
//               <Form.Label>Email</Form.Label>
//               <Form.Control 
//                 type="email" 
//                 required 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//               />
//             </Form.Group>
//           </Row>
//           <Form.Group className="mb-3">
//             <Form.Label>Password</Form.Label>
//             <Form.Control 
//               type="password" 
//               required 
//               value={password} 
//               onChange={(e) => setPassword(e.target.value)} 
//             />
//           </Form.Group>
//           <Button type="submit" className="w-100 border-0 bg-customorange text-white">
//             Login
//           </Button>
//         </Form>
//       </div>
//     </Container>
//   );
// };

// export default Adminlogin;
