import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import NavigationBar from "../NavigationBar/NavigationBar";
import "./LogIn.css";

const LogIn = () => {
  const navigate = useNavigate();
  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserLog({ ...userLog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = userLog; 

    try {
      const response = await axios.post(
        "https://designeral.onrender.com/api/user/login",
        { email, password }
      );

      if (response.data.token) {
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            id: response.data.id,
            email: response.data.email,
            username: response.data.username,
          })
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Couldn't log you in. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <NavigationBar />
      <Container className="login-container">
        <Form className="login-form" onSubmit={handleSubmit}>
          <Form.Group className="login-form-group">
            <Form.Label className="login-form-label">Email</Form.Label>
            <Form.Control
              className="login-form-control"
              type="email"
              onChange={handleChange}
              name="email"
              value={userLog.email}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="login-form-group">
            <Form.Label className="login-form-label">Password</Form.Label>
            <Form.Control
              className="login-form-control"
              type="password"
              name="password"
              onChange={handleChange}
              value={userLog.password}
              placeholder="Enter password"
            />
          </Form.Group>
          <Button
            className="login-submit-btn"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Login
          </Button>
        </Form>
        <p className="login-register-link">
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
        <div className="login-alert">{error}</div>
      </Container>
      <Footer />
    </div>
  );
};

export default LogIn;
