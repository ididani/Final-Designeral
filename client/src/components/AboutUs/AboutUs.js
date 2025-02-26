import React from "react";
import "./AboutUs.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";

const About = () => {
  return (
    <div>
      <NavigationBar />
      <div className="about-page">
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to Designer.al</h1>
            <p>Elevating Fashion, Defining Elegance</p>
            <a href="/products" className="button">
              Discover Now
            </a>
          </div>
        </section>

        <section className="about-us-section">
          <div className="about-content">
            <h2 className="pink-h2">About Us</h2>
            <p>
              At Designer.AL, we're passionate about bringing you the latest in high-end fashion. Our carefully curated collections feature top designer brands, offering a unique blend of classic elegance and contemporary style. Our team strives to be your ultimate fashion destination, where luxury meets accessibility.
            </p>
          </div>
        </section>

        <section className="team-section">
          <h2 className="pink-h2">Meet Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img
                  src="https://images.unsplash.com/photo-1696451203090-638d94b830d4?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Arta Zogaj"
                />
              </div>
              <div className="member-info">
                <h3>Arta Zogaj</h3>
                <p>Founder & CEO</p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img
                  src="https://images.unsplash.com/photo-1552699611-e2c208d5d9cf?q=80&w=1016&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Jonida Selimi"
                />
              </div>
              <div className="member-info">
                <h3>Jonida Selimi</h3>
                <p>Chief Operating Officer</p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img
                  src="https://images.unsplash.com/photo-1625224590908-d02e98d0cb3f?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Edmond Kola"
                />
              </div>
              <div className="member-info">
                <h3>Edmond Kola</h3>
                <p>Operations Manager</p>
              </div>
            </div>
            <div className="team-member">
              <div className="member-image">
                <img
                  src="https://images.unsplash.com/photo-1588175996685-a40693ee1087?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Ana Hoxha"
                />
              </div>
              <div className="member-info">
                <h3>Ana Hoxha</h3>
                <p>Marketing Director</p>
              </div>
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2 className="pink-h2">Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Quality</h3>
              <p>Only the finest materials and craftsmanship.</p>
            </div>
            <div className="value-item">
              <h3>Innovation</h3>
              <p>Fashion-forward designs at the forefront of the industry.</p>
            </div>
            <div className="value-item">
              <h3>Customer Care</h3>
              <p>Ensuring a seamless and delightful shopping experience.</p>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <h2 className="pink-h2">Explore Our Latest Collection</h2>
          <a href="/products" className="cta-button">
            Shop Now
          </a>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
