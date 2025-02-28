import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ShoppingCart.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.id) {
      console.error("User info not found in localStorage");
      return null;
    }
    return userInfo;
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const userInfo = getUserInfo();
      if (!userInfo) {
        setError("User information not found. Please log in.");
        setLoading(false);
        return;
      }

      console.log("Fetching cart for user ID:", userInfo.id);
      const response = await axios.get(
        `https://designeral.onrender.com/api/cart/${userInfo.id}`
      );
      const cartData = response.data;
      console.log("Cart data:", cartData);

      if (cartData && Array.isArray(cartData.items)) {
        setCartItems(cartData.items);
      } else {
        console.log("No items in cart or invalid cart data");
        setCartItems([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      console.error("Error response:", error.response);
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const userInfo = getUserInfo();
      if (!userInfo) return;
      await axios.delete(
        `https://designeral.onrender.com/api/cart/${userInfo.id}/item/${productId}/delete`
      );
      fetchCartItems();
    } catch (err) {
      setError("Failed to remove item");
    }
  };

  const updateCartItem = async (productId, newQuantity) => {
    try {
      const userInfo = getUserInfo();
      if (!userInfo) return;
      const quantity = parseInt(newQuantity, 10);

      if (quantity < 1) {
        console.error("Quantity must be at least 1");
        return;
      }

      await axios.put(
        `https://designeral.onrender.com/api/cart/${userInfo.id}/item/${productId}/update`,
        { quantity }
      );
      fetchCartItems();
    } catch (error) {
      console.error(
        "Error updating cart item:",
        error.response?.data || error.message
      );
    }
  };

  const clearCart = async () => {
    try {
      const userInfo = getUserInfo();
      if (!userInfo) return;
      await axios.delete(`https://designeral.onrender.com/api/cart/${userInfo.id}/clear`);
      setCartItems([]);
      return (
        <div>
          <NavigationBar />
          <div className="cart-page">
            <h1 className="cart-title">Your Shopping Cart</h1>
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <Link to="/products" className="shop-now-btn">
                Shop Now
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      );
    } catch (err) {
      alert("Failed to clear cart");
    }
  };

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(productId, newQuantity);
      fetchCartItems();
    } catch (error) {
      console.error("Error updating quantity:", error);
      setError("Failed to update quantity");
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout", {
      state: { cartItems, totalPrice: getTotalPrice() },
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.productId.price * item.quantity,
      0
    );
  };

  if (loading) return <div>Loading... Please wait.</div>;
  if (error) {
    return (
      <div>
        <NavigationBar />
        <div className="cart-page">
          <h1 className="cart-title">Your Shopping Cart</h1>
          <div className="empty-cart">
            <p>{error}</p>
            <p>Your cart is empty.</p>
            <Link to="/products" className="shop-now-btn">
              Shop Now
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <NavigationBar />
      <div className="cart-page">
        <h1 className="cart-title">Your Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <Link to="/products" className="continue-shopping-btn">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.productId._id} className="cart-item">
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h3>{item.productId.name}</h3>
                    <p className="cart-item-price">
                      $ {item.productId.price}
                    </p>
                  </div>
                  <div className="cart-item-quantity">
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.productId._id,
                          item.quantity - 1
                        )
                      }
                      className="shopping-cart-icons"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#5f6368"
                      >
                        <path d="M200-440v-80h560v80H200Z" />
                      </svg>{" "}
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.productId._id,
                          parseInt(e.target.value)
                        )
                      }
                    />
                    <button
                      onClick={() =>
                        handleQuantityChange(
                          item.productId._id,
                          item.quantity + 1
                        )
                      }
                      className="shopping-cart-icons"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="#5f6368"
                      >
                        <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                      </svg>
                    </button>
                  </div>
                  <p className="cart-item-subtotal">
                    $ {(item.productId.price * item.quantity)
                      .toFixed(2)
                      .toLocaleString()}{" "}
                  </p>
                  <button
                    className="remove-item shopping-cart-icons"
                    onClick={() => handleRemoveItem(item.productId._id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#5f6368"
                    >
                      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                    </svg>{" "}
                  </button>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>$ {getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="summary-row total">
                <span>Total</span>
                <span>$ {getTotalPrice().toLocaleString()} </span>
              </div>
              <button onClick={handleCheckout} className="checkout-btn">
                Proceed to Checkout
              </button>
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
              <Link to="/products" className="continue-shopping-btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
