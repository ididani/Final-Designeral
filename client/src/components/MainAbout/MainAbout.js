import React from "react";
import "./MainAbout.css";
import { Link } from "react-router-dom";

const MainAbout = () => {
  return (
    <div className="about-container">
      <div className="main-about-content">
        <h2>Your Story Starts Here</h2>
        <p className="about-text">
          Discover the journey behind our brand. From humble beginnings to the
          renowned name we are today, our story is a testament to our commitment
          to quality and innovation.
        </p>
        <button className="about-button-home">
          <Link to="/about" className="about-link">Read Our Story</Link>
        </button>
      </div>
    </div>
  );
};

export default MainAbout;
