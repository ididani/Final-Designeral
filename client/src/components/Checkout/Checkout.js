import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import "./Checkout.css";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems, totalPrice } = location.state;
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Name is required";
    if (!formData.email) formErrors.email = "Email is required";
    if (!formData.address) formErrors.address = "Address is required";
    if (!formData.city) formErrors.city = "City is required";
    if (!formData.postalCode) formErrors.postalCode = "Postal code is required";
    if (!formData.phoneNumber) formErrors.phoneNumber = "Phone number is required";
    return formErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const response = await axios.post("/api/orders/checkout", {
          cartItems,
          totalPrice,
          shippingDetails: formData,
          paymentMethod,
          userId: JSON.parse(localStorage.getItem('userInfo')).id,
        });
        if (response.status === 200) {
          alert("Thank you for your order!");
          navigate('/', { state: { cartItems: [] } });
        } else {
          alert("Failed to place order");
        }
      } catch (error) {
        console.error("Error submitting order:", error);
        alert("Error submitting order");
      }
    }
  };

  return (
    <div className="checkout-container">
      <NavigationBar />
      <div className="checkout-content">
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.productId._id} className="checkout-item">
                <span>{item.productId.name} </span>
                <span> $ {item.productId.price.toFixed(2)} x {item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <span>Total:</span>
            <span>$ {totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="checkout-form">
          <h2 className="form-title">Shipping Information</h2>
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Full Name"
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Address"
              className={errors.address ? "error" : ""}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className={errors.city ? "error" : ""}
              />
              {errors.city && <span className="error-message">{errors.city}</span>}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                placeholder="Postal Code"
                className={errors.postalCode ? "error" : ""}
              />
              {errors.postalCode && <span className="error-message">{errors.postalCode}</span>}
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="Phone Number"
              className={errors.phoneNumber ? "error" : ""}
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>

          <h2 className="form-title">Payment Method</h2>
          <div className="payment-methods">

            <label className={`payment-method ${paymentMethod === 'cash' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              <span>Cash on Delivery</span>
            </label>
          </div>

          <button type="submit" className="submit-order">Place Order</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;