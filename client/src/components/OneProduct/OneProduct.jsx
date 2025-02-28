import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./OneProduct.css";
import Footer from "../Footer/Footer";
import NavigationBar from "../NavigationBar/NavigationBar";
import Slider from "react-slick";
import { addToCart } from "../CartUtils/addToCart";

const OneProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [suggestions, setSuggestions] = useState([]);
  const { category, subCategory, id } = useParams();

  const handleAddToCart = (product) => {
    console.log('Product being added:', product);
    if (product && product._id) {
      addToCart(product._id, quantity);
    } else {
      console.error('Invalid product or product ID');
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const baseUrl =
          process.env.REACT_APP_API_URL || "http://localhost:5000";
        const url = `${baseUrl}/api/products/${category}/${subCategory}/${id}`;
        const response = await axios.get(url);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(`Failed to fetch product: ${err.message}`);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [category, subCategory, id]);

  useEffect(() => {
    if (product && product.brand) {
      axios
        .get("https://designeral.onrender.com/api/products/suggestions", {
          params: {
            brand: product.brand,
            currentProductId: product._id // Add this line
          }
        })
        .then((response) => setSuggestions(response.data))
        .catch((error) => {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        });
    }
  }, [product]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found</div>;

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="one-product-page">
      <NavigationBar />
      <div className="product-details">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>
          <p className="product-price">${product.price.toFixed(2)}</p>
          <p className="product-description">{product.description}</p>
          <div className="quantity-controls">
            <button onClick={() => setQuantity(Math.max(quantity - 1, 1))}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
          <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>Add to Cart</button>
        </div>
      </div>

      <section className="suggestions-section">
        <h2 className="suggestion-title">From The Same Brand</h2>
        <Slider {...carouselSettings}>
          {suggestions.length > 0 ? (
            suggestions.map((suggestion) => (
              <div key={suggestion._id} className="suggestion-item">
                <Link
                  to={`/products/${suggestion.category}/${suggestion.subCategory}/${suggestion._id}`}
                >
                  <img
                    src={suggestion.image}
                    alt={suggestion.name}
                    className="suggestion-image"
                  />
                  <h3 className="suggestion-name">{suggestion.name}</h3>
                  <p className="suggestion-price">${suggestion.price.toFixed(2)}</p>
                </Link>
              </div>
            ))
          ) : (
            <p>No related products found at the moment.</p>
          )}
        </Slider>
      </section>

      <Footer />
    </div>
  );
};

export default OneProduct;
