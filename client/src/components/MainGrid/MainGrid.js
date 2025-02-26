import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./MainGrid.css";
import axios from "axios";

const MainGrid = () => {
  const [brands, setBrands] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/brands");
        setBrands(response.data);
      } catch (err) {
        setError("Failed to load brands");
      }
    };

    fetchBrands();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  const firstFourBrands = brands.slice(0, 4);

  if (firstFourBrands.length < 4) {
    return <div>Not enough brands available.</div>;
  }

  return (
    <Container className="mt-12 image-grid">
      <Row className="align-items-stretch">
        <Col md={5} className="left-image">
          <Link to={`/brands/${firstFourBrands[0]._id}`} className="image-link">
            <Image
              src={firstFourBrands[0].images[0]}
              alt={firstFourBrands[0].name}
              fluid
              className="big-image"
            />
          </Link>
        </Col>
        <Col md={7} className="right-images d-flex flex-column">
          <Row className="top-images flex-grow-1">
            <Col md={6} className="top-image">
              <Link to={`/brands/${firstFourBrands[1]._id}`} className="image-link">
                <Image
                  src={firstFourBrands[1].images[0]}
                  alt={firstFourBrands[1].name}
                  fluid
                  className="small-image"
                />
              </Link>
            </Col>
            <Col md={6} className="top-image">
              <Link to={`/brands/${firstFourBrands[2]._id}`} className="image-link">
                <Image
                  src={firstFourBrands[2].images[0]}
                  alt={firstFourBrands[2].name}
                  fluid
                  className="small-image"
                />
              </Link>
            </Col>
          </Row>
          <Row className="bottom-image">
            <Col md={12}>
              <Link to={`/brands/${firstFourBrands[3]._id}`} className="image-link">
                <Image
                  src={firstFourBrands[3].images[0]}
                  alt={firstFourBrands[3].name}
                  fluid
                  className="small-image"
                />
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default MainGrid;
