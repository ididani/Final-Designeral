import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./Brand.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";

const Brand = () => {
  const { brandId } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBrand = async () => {
      console.log("Brand ID:", brandId);
      setLoading(true);
      try {
        const response = await axios.get(
          `https://designeral.onrender.com/api/brands/${brandId}`
        );
        setBrand(response.data);
      } catch (err) {
        console.error(err.response);
        setError(
          err.response?.data?.message || "Failed to load brand information"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [brandId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!brand) {
    return <div>No brand information available.</div>;
  }

  return (
    <div>
      <NavigationBar />
      <div className="brand-container">
        <h1 className="brand-name">{brand.name}</h1>

        <img src={brand.images[0]} alt={brand.name} className="brand-logo" />

        <p>{brand.description}</p>

        <div className="brand-images">
          {brand.images.slice(1).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${brand.name} image ${index + 1}`}
              className="brand-image"
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Brand;
