import React, { useState } from "react";
import "./ContactUs.css";
import axios from "axios";
import NavigationBar from '../NavigationBar/NavigationBar'
import Footer from "../Footer/Footer";

function ContactUs() {
  const [newContact, setNewContact] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [sms, setSms] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://designeral.onrender.com/api/contacts", newContact)
      .then((res) => {
        console.log("Message sent");
        setSms("Message sent! Thank you for contacting us.");
        // Clear the form after successful submission
        setNewContact({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });
      })
      .catch((err) => {
        console.log("Couldn't send:" + err);
        setSms("Failed to send message. Please try again.");
      });
  };
  return (
    <div>
      <NavigationBar />
      <div className="contact-form-container">
        <form onSubmit={handleSubmit} className="contact-us-form">
          <div className="container-contact">
            <h1>Contact Us</h1>
            <p>Fill the form to send us a message.</p>
            <hr />

            <label for="firstName">
              <b>Name</b>
            </label>
            <input
              type="text"
              name="firstName"
              value={newContact.firstName}
              onChange={(e) =>
                setNewContact({ ...newContact, firstName: e.target.value })
              }
              required
            />

            <label for="lastName">
              <b>Last Name</b>
            </label>
            <input
              type="text"
              name="lastName"
              value={newContact.lastName}
              onChange={(e) =>
                setNewContact({ ...newContact, lastName: e.target.value })
              }
              required
            />

            <label for="email">
              <b>Email</b>
            </label>
            <input
              type="email"
              name="email"
              value={newContact.email}
              onChange={(e) =>
                setNewContact({ ...newContact, email: e.target.value })
              }
              required
            />

            <label for="message">
              <b>Your Message</b>
            </label>
            <textarea
              name="message"
              value={newContact.message}
              onChange={(e) =>
                setNewContact({ ...newContact, message: e.target.value })
              }
              required
            />

            <div className="terms-container">
              <label>
                <input type="checkbox" name="terms" required />
                I accept Terms and Conditions
              </label>
            </div>

            <br />

            <button type="submit" className="submit-message">
              Submit
            </button>
          </div>
        </form>
        <p className="success-message-contact">{sms}</p>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
