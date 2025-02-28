import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Products.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import NavigationBar from "../NavigationBar/NavigationBar";
import Footer from "../Footer/Footer";
import { addToCart } from "../CartUtils/addToCart";

const Products = () => {

  const handleAddToCart = (product) => {
    console.log('Product being added:', product);
    if (product && product._id) {
      addToCart(product._id, 1);
    } else {
      console.error('Invalid product or product ID');
    }
  };

  const { category, subCategory } = useParams();
  const [products, setProducts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [availableBrands, setAvailableBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const navigate = useNavigate();

  const getUserInfo = () => {
    const userInfo = localStorage.getItem("userInfo");
    return userInfo ? JSON.parse(userInfo) : null;
  };

  const [userInfo, setUserInfo] = useState(() => getUserInfo());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let endpoint = "https://designeral.onrender.com/api/products";
        if (category && subCategory) {
          endpoint += `/${category}/${subCategory}`;
        } else if (category) {
          endpoint += `/${category}`;
        }

        const response = await axios.get(endpoint);
        setProducts(response.data);

        const brands = [
          ...new Set(response.data.map((product) => product.brand)),
        ];
        setAvailableBrands(brands);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
    const storedUserInfo = getUserInfo();
    if (storedUserInfo) {
      setUserInfo(storedUserInfo);
    }
  }, [category, subCategory]);

  const handleMinPriceChange = (e) => {
    setMinPrice(Math.min(e.target.value, maxPrice - 1));
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(Math.max(e.target.value, minPrice + 1));
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prevBrands) =>
      prevBrands.includes(brand)
        ? prevBrands.filter((b) => b !== brand)
        : [...prevBrands, brand]
    );
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const applyFilters = () => {
    let filtered = products.filter((product) => {
      const priceRange = product.price >= minPrice && product.price <= maxPrice;
      const isBrandMatched =
        selectedBrands.length === 0 || selectedBrands.includes(product.brand);
      return priceRange && isBrandMatched;
    });

    // Apply sorting
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const filteredProducts = applyFilters();

  return (
    <div className="products-page">
      <NavigationBar />
      <div className="products-container">
        <div className="first-container">
          <Link to="/products/add" className="add-product-link">
            New Product
          </Link>
          <aside className="filters-section">
            <h2 className="filters-title">Refine Your Search</h2>
            <div className="filter-group">
              <h3 className="filter-group-title">Price Range</h3>
              <div className="price-range-slider">
                <div className="slider-labels">
                  <span className="price-bubble">$ {minPrice}</span>
                  <span className="price-bubble">$ {maxPrice}</span>
                </div>
                <div className="slider">
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={minPrice}
                    onChange={handleMinPriceChange}
                    className="min-price"
                  />
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={maxPrice}
                    onChange={handleMaxPriceChange}
                    className="max-price"
                  />
                </div>
              </div>
            </div>
            <div className="filter-group">
              <h3 className="filter-group-title">Brands</h3>
              <div className="brand-options">
                {availableBrands.map((brand) => (
                  <label key={brand} className="brand-option">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    {brand}
                  </label>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <h3 className="filter-group-title">Sort by Price</h3>
              <select
                value={sortOrder}
                onChange={handleSortChange}
                className="sort-select"
              >
                <option value="">Default</option>
                <option value="asc">Price: Low to High</option>
                <option value="desc">Price: High to Low</option>
              </select>
            </div>
          </aside>
        </div>

        <section className="product-grid">
          <div className="product-grid-header">
            <h2 className="product-grid-title">Discover Our Collection</h2>
          </div>
          <div className="products-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => {
                const filteredCategory = Array.isArray(product.category)
                  ? product.category.filter(
                    (cat) => cat !== "new" && cat !== "sale"
                  )
                  : [product.category].filter(
                    (cat) => cat !== "new" && cat !== "sale"
                  );

                const filteredSubCategory = Array.isArray(product.subCategory)
                  ? product.subCategory.filter(
                    (sub) => sub !== "new" && sub !== "sale"
                  )
                  : [product.subCategory].filter(
                    (sub) => sub !== "new" && sub !== "sale"
                  );

                const urlPath = [
                  ...filteredCategory,
                  ...filteredSubCategory,
                  product._id,
                ].join("/");

                return (
                  <div className="product-card" key={product._id} product={product}>
                    <Link to={`/products/${urlPath}`} className="product-link">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="product-image-card"
                      />
                      <div className="product-information">
                        <h3 className="product-name">{product.name}</h3>
                        <p className="product-price">
                          ${product.price.toFixed(2)}
                        </p>
                        <p className="product-brand">{product.brand}</p>
                      </div>
                    </Link>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                );
              })
            ) : (
              <p>No products found matching the current filters.</p>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
