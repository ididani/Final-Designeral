import React from "react";
import "./App.css";
import ContactUs from "./components/ContactUs/ContactUs";
import AboutUs from "./components/AboutUs/AboutUs";
import Home from "./components/Home";
import Products from "./components/Products/Products";
import ShoppingCart from "./components/ShoppingCart/ShoppingCart";
import { Routes, Route } from "react-router-dom";
import Checkout from "./components/Checkout/Checkout";
import Brand from "./components/Brand/Brand";
import OneProduct from "./components/OneProduct/OneProduct";
import NewProduct from "./components/NewProduct/NewProduct";
import Register from "./components/Auth/Register";
import LogIn from "./components/Auth/LogIn";
import Page404 from "./components/404/Page404";

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/brands/:brandId" element={<Brand />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:category" element={<Products />} />
        <Route path="/products/:category/:subCategory" element={<Products />} />
        <Route
          path="/products/:category/:subCategory/:id"
          element={<OneProduct />}
        />
        <Route path="/products/add" element={<NewProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;
