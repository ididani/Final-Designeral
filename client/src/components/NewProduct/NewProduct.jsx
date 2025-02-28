import React, { useState } from 'react';
import axios from 'axios';
import './NewProduct.css';
import NavigationBar from '../NavigationBar/NavigationBar';
import Footer from '../Footer/Footer';

const NewProduct = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: '',
        category: [],
        subCategory: '',
        description: '',
        quantityStock: '',
        brand: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'category') {
            setProduct({ ...product, [name]: value.split(',').map(item => item.trim()) });
        } else if (name === 'price' || name === 'quantityStock') {
            setProduct({ ...product, [name]: parseFloat(value) || '' });
        } else {
            setProduct({ ...product, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://designeral.onrender.com/api/products/add', product);
            console.log('Product added:', response.data);
            alert('Product added successfully!');
            setProduct({
                name: '',
                price: '',
                image: '',
                category: [],
                subCategory: '',
                description: '',
                quantityStock: '',
                brand: '',
            });
        } catch (error) {
            console.error('Error adding product:', error.response?.data || error.message);
            alert('Error adding product. Please try again.');
        }
    };

    return (
        <div className="add-product-page">
            <NavigationBar />
            <div className="new-product-container">
                <h2>New Product</h2>
                <form onSubmit={handleSubmit} className="add-product-form">
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        placeholder="Product Name"
                        required
                    />
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Price"
                        required
                    />
                    <input
                        type="text"
                        name="image"
                        value={product.image}
                        onChange={handleChange}
                        placeholder="Image URL"
                        required
                    />
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleChange}
                        placeholder="Categories (comma-separated)"
                        required
                    />
                    <input
                        type="text"
                        name="subCategory"
                        value={product.subCategory}
                        onChange={handleChange}
                        placeholder="Sub-category"
                        required
                    />
                    <textarea
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Description"
                        required
                    ></textarea>
                    <input
                        type="number"
                        name="quantityStock"
                        value={product.quantityStock}
                        onChange={handleChange}
                        placeholder="Quantity in Stock"
                        required
                    />
                    <input
                        type="text"
                        name="brand"
                        value={product.brand}
                        onChange={handleChange}
                        placeholder="Brand"
                        required
                    />
                    <button type="submit">Add Product</button>
                </form>
            </div>
            <Footer />
        </div>
    );
};

export default NewProduct;