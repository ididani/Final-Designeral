import React, { useState } from "react";
import "./Footer.css";
import axios from "axios";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const handleSubscription = async () => {
    if (!validateEmail(email)) {
      setMessage("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/api/subscriptions", { email });
      setMessage("Subscribed successfully!");
      setEmail("");
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Subscription failed, please try again later");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer className="footer-container">
      <div className="footer-section">
        <h3>About Us</h3>
        <p>
          Designer.al, founded in 2024, is a premier online destination for luxury fashion in Albania. Our mission is to bring high-end designer brands to fashion enthusiasts, offering a curated selection of elegant and contemporary styles.
        </p>
        <div className="contact-info">
          <p>+355 692 703 417</p>
          <p>designeral@gmail.com</p>
        </div>
        <h6 className="subscription-title">Subscribe to our newsletter</h6>
        <div className="subscription-container">
          <input
            type="email"
            placeholder="Your email address"
            className="subscription-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="subscription-button"
            onClick={handleSubscription}
            disabled={isLoading}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}{" "}
          </button>
        </div>
        <div className="subscription-message">
          {message && (
            <p
              className={
                message.includes("successfully") ? "success-msg" : "error-msg"
              }
            >
              {message}
            </p>
          )}
        </div>
      </div>
      <div className="footer-section locations">
        <h3>Our Locations</h3>
        <ul>
          <li>TEG, Autostrada Tiranë - Elbasan, Tiranë 1045</li>
          <li>Rruga Myslym Shyri, Tiranë 1001</li>
          <li>Rruga Sami Frashëri, Tirana 1001</li>
        </ul>
      </div>
      <div className="footer-section instagram">
        <h3>Instagram Feed</h3>
        <div className="instagram-images">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTNKJm2GC-nPMmZIz7vTUGuMbxDsOJjNTwvlkjOBfMAIsOj98Vtvr4Ps-JiDrpYRpSUpQ&usqp=CAU"
            alt="Instagram post"
          />
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HXbGz4Zq1Xngm6avzrFQHf2ksVFtpPRFh9GoVumPXZ1uTz0hu5FhrNDw7TO_GplQpVU&usqp=CAU"
            alt="Instagram post"
          />
          <img
            src="https://visionplusmag.com/wp-content/uploads/2013/04/a2.jpg"
            alt="Instagram post"
          />
          <img
            src="https://www.realmenrealstyle.com/wp-content/uploads/2023/09/man_stylish_wearing_sunglasses.jpg"
            alt="Instagram post"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
