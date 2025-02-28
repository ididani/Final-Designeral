import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Cards.css";
import { Link } from "react-router-dom";
import { addToCart } from "../CartUtils/addToCart";
const Cards = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleAddToCart = (product) => {
    console.log('Product being added:', product); 
    if (product && product._id) {
      addToCart(product._id, 1);
    } else {
      console.error('Invalid product or product ID');
    }
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://designeral.onrender.com/api/products")
      .then((response) => {
        if (
          response.data &&
          Array.isArray(response.data) &&
          response.data.length > 0
        ) {
          const sortedProducts = response.data.sort(
            (a, b) => (a.quantityStock || 0) - (b.quantityStock || 0)
          );
          setProducts(sortedProducts.slice(0, 4));
        } else {
          setError("No products available.");
          setProducts([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products. Please try again later.");
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <h3 className="favorites-heading">Last Chance to Buy</h3>
      {products.length > 0 ? (
        <div className="favorites-container">
          {products.map((product) => (
            <div key={product._id} className="card">
              <Link to={`/products/${product._id}`} className="card-link">
                <img
                  src={product.image || "https://via.placeholder.com/300"}
                  alt={product.name || "Default Product"}
                  className="card-img"
                />
              </Link>

              <div className="card-content">
                <h3 className="card-title">
                  <Link to={`/products/${product._id}`} className="card-link">
                    {product.name || "Name Unavailable"}
                  </Link>
                </h3>
                <p className="card-price">
                  ${product.price?.toFixed(2) || "0.00"}
                </p>
                <p className="card-stock">
                  Stock: {product.quantityStock || "N/A"}
                </p>
                <button
                  className="btn-add-to-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available at the moment.</p>
      )}
    </div>
  );
};

export default Cards;
