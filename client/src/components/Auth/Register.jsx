import React, { useState } from 'react'
import { Container, Form, Button, Alert } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'
import NavigationBar from '../NavigationBar/NavigationBar'
import Footer from '../Footer/Footer'
import './Register.css'

const Register = () => {
    const navigate = useNavigate()
    const [newUser, setNewUser] = useState({
        username: "",
        email: "",
        password: ""
    })
    const [error, setError] = useState("")
    const [alert, setAlert] = useState("")

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setAlert("")

        if (!newUser.username) {
            setError('Username should not be empty');
            setAlert("danger")
            return;
        }
        if (!newUser.email) {
            setError('Email should not be empty');
            setAlert("danger")
            return;
        }
        if (newUser.password.length < 8) {
            setError('Password should have at least 8 characters!');
            setAlert("danger")
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/user/register/', newUser)
            console.log("Registration response:", response.data)
            setAlert('success')
            setError("Registration successful! Redirecting to login...")
            setTimeout(() => navigate('/login'), 2000)
        } catch (err) {
            console.error("Registration error:", err)
            if (err.response) {
                console.error("Error response:", err.response.data)
                console.error("Error status:", err.response.status)
            } else if (err.request) {
                console.error("Error request:", err.request)
            } else {
                console.error("Error message:", err.message)
            }
            setAlert('danger')
            setError(err.response?.data?.message || "An error occurred during registration. Please try again.")
        }
    }

    return (
        <div className="register-page">
            <NavigationBar />
            <Container className="register-container">
                <Form className="register-form" onSubmit={handleSubmit}>
                    <Form.Group className="register-form-group">
                        <Form.Label className="register-form-label" htmlFor="username">Username</Form.Label>
                        <Form.Control
                            className="register-form-control"
                            id="username"
                            type="text"
                            name="username"
                            value={newUser.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                        />
                    </Form.Group>
                    <Form.Group className="register-form-group">
                        <Form.Label className="register-form-label" htmlFor="email">Email</Form.Label>
                        <Form.Control
                            className="register-form-control"
                            id="email"
                            type="email"
                            name="email"
                            value={newUser.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                        />
                    </Form.Group>
                    <Form.Group className="register-form-group">
                        <Form.Label className="register-form-label" htmlFor="password">Password</Form.Label>
                        <Form.Control
                            className="register-form-control"
                            id="password"
                            type="password"
                            name="password"
                            value={newUser.password}
                            onChange={handleChange}
                            placeholder="Enter password"
                        />
                    </Form.Group>
                    <Button
                        className="register-submit-btn"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Register
                    </Button>
                    <div className="register-login-link">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                    {error && (
                        <div className="registration-alert">
                            {error}
                        </div>
                    )}
                </Form>
            </Container>
            <Footer />
        </div>
    )
}

export default Register
