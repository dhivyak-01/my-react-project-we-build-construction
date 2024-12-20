import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Update this import
import { Container, Form, Row, Button } from "react-bootstrap"; // Adjust imports based on your setup

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use useNavigate for navigation

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      alert("Login successful!");
      navigate("/"); // Redirect to home page using navigate
    } catch (error) {
      console.error("Login error:", error.message);
      alert(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      fluid
      className="min-h-custom-screen flex items-center justify-center bg-registerbg"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-center mb-6">User Login</h2>
        {error && <div className="text-danger mb-3">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>
          <Button
            type="submit"
            className="w-full !bg-customorange text-white border-0"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Signin;
