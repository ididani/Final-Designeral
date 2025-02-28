import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./NavigationBar.css";
import axios from "axios";

const NavigationBar = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [navClass, setNavClass] = useState("navbar-black");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchResultsVisible, setIsSearchResultsVisible] = useState(false);
  const [mobileMenuState, setMobileMenuState] = useState("main");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [hoveredItem, setHoveredItem] = useState(null);
  const { category, subCategory } = useParams();
  const [products, setProducts] = useState([]);
  const navbarRef = useRef(null);
  const searchRef = useRef(null);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let endpoint = "https://designeral.onrender.com/api/products";
        if (category) endpoint += `/${category}`;
        if (subCategory) endpoint += `/${subCategory}`;

        const response = await axios.get(endpoint);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, [category, subCategory]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setNavbarOpen(false);
        setNavClass("navbar-black");
        setMobileMenuState("main");
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setNavbarOpen(false);
        setNavClass("navbar-black");
        setMobileMenuState("main");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getUserInfo = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (!userInfo || !userInfo.id) {
      console.error("User info not found in localStorage");
      return null;
    }
    return userInfo;
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userInfo = getUserInfo();

        const response = await axios.get(`https://designeral.onrender.com/api/cart/${userInfo.id}`, {
          withCredentials: true,
        });
        const cartItems = response.data.items;
        setCartItemsCount(cartItems ? cartItems.length : 0);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  const handleSearch = async (query) => {
    setSearchQuery(query);

    if (query.length > 2) {
      try {
        const response = await axios.get(
          `https://designeral.onrender.com/api/search?q=${query}`
        );
        setSearchResults(response.data);
        setIsSearchResultsVisible(true);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
      setIsSearchResultsVisible(false);
    }
  };

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = (item) => {
    if (hoveredItem === item) {
      setHoveredItem(null);
    }
  };
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
    setNavClass(navbarOpen ? "navbar-black" : "show");
    setMobileMenuState("main");
  };

  const handleMobileMenuClick = (category) => {
    setMobileMenuState(mobileMenuState === category ? "main" : category);
  };

  const handleProductClick = (product) => {
    navigate(`/products/${product.category}/${product.subCategory}/${product._id}`);
    setIsSearchResultsVisible(false);
    setSearchQuery("");
  };

  const renderMobileMenu = () => {
    switch (mobileMenuState) {
      case "main":
        return (
          <>
            <div
              className="navbar-item"
              onClick={() => handleMobileMenuClick("new")}
            >
              New
            </div>
            <div
              className="navbar-item"
              onClick={() => handleMobileMenuClick("brands")}
            >
              Brands
            </div>
            <div
              className="navbar-item"
              onClick={() => handleMobileMenuClick("bags")}
            >
              Bags
            </div>
            <div
              className="navbar-item"
              onClick={() => handleMobileMenuClick("accessories")}
            >
              Accessories
            </div>
            <div
              className="navbar-item"
              onClick={() => handleMobileMenuClick("fragrances")}
            >
              Fragrances
            </div>
            <div
              className="navbar-item"
              onClick={() => handleMobileMenuClick("sale")}
            >
              Sale
            </div>
            <div className="navbar-item">
              <Link to="/contact">Contact Us</Link>
            </div>
            <div className="navbar-item">
              <Link to="/cart">My Cart</Link>
            </div>
            <div className="navbar-item">
              <Link to="/login">Log In</Link>
            </div>
          </>
        );
      case "new":
        return (
          <div className="navbar-item">
            <Link to="/products/new">New Arrivals</Link>
          </div>
        );
      case "brands":
        return (
          <>
            <div className="navbar-item">
              <Link to="/brands/chanel">Chanel</Link>
            </div>
            <div className="navbar-item">
              <Link to="/brands/dior">Dior</Link>
            </div>
            <div className="navbar-item">
              <Link to="/brands/gucci">Gucci</Link>
            </div>
            <div className="navbar-item">
              <Link to="/brands/ysl">Yves Saint Laurent</Link>
            </div>
            <div className="navbar-item">
              <Link to="/brands/marc-jacobs">Marc Jacobs</Link>
            </div>
            <div className="navbar-item">
              <Link to="/brands/burberry">Burberry</Link>
            </div>
            <div className="navbar-item">
              <Link to="/brands/prada">Prada</Link>
            </div>
            <div className="navbar-item">
              <Link to="/brands/valentino">Valentino</Link>
            </div>
            <div className="navbar-item">
              <Link to="/brands/hugo">Hugo</Link>
            </div>
            <div className="navbar-item">
              <Link to="/brands/calvin-klein">Calvin Klein</Link>
            </div>
            <div className="navbar-item">
              <Link to="/brands/ugg">UGG</Link>
            </div>
            <div className="navbar-item">
              <Link to="/brands/guess">Guess</Link>
            </div>
            <div className="navbar-item">
              <Link to="/brands/steve-madden">Steve Madden</Link>
            </div>
          </>
        );
      case "bags":
        return (
          <>
            <div className="navbar-item">
              <Link to="/products/bags/backpacks">Backpacks</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/bags/crossbody-bags">Crossbody Bags</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/bags/belt-bags">Belt Bags</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/bags/laptop-bags">Laptop Bags</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/bags/tote-bags">Tote Bags</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/bags/mini-bags">Mini Bags</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/bags/bucket-bags">Bucket Bags</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/bags/evening-bags">Evening Bags</Link>
            </div>
          </>
        );
      case "accessories":
        return (
          <>
            <div className="navbar-item">
              <Link to="/products/accessories/belts">Belts</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/accessories/hats">Hats and Caps</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/accessories/scarves">Scarves</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/accessories/sunglasses">Sunglasses</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/accessories/socks">Socks</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/accessories/wallets">Wallets</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/accessories/underwear">Underwear</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/accessories/shoes">Shoes</Link>
            </div>
          </>
        );
      case "fragrances":
        return (
          <>
            <div className="navbar-item">
              <Link to="/products/fragrances/for-him">For Him</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/fragrances/aftershave">Aftershave</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/fragrances/for-her">For Her</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/fragrances/body-mist">Body Mist</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/fragrances/unisex">Unisex</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/fragrances/gift-sets">Gift Sets</Link>
            </div>
            <div className="navbar-item">
              <Link to="/products/fragrances/travel-sizes">Travel Sizes</Link>
            </div>
          </>
        );
      case "sale":
        return (
          <div className="navbar-item">
            <Link to="/products/sale">Sale Items</Link>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="navbar-container" ref={navbarRef}>
      <div className="navbar-logo">
        {isMobile && (
          <Link className="hamburger-menu" onClick={toggleNavbar}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M120-680v-80h720v80H120Zm0 480v-80h720v80H120Zm0-240v-80h720v80H120Z" />
            </svg>
          </Link>
        )}
        <Link to="/">
          <h1 className="logo-nav">DESIGNER.AL</h1>
        </Link>
      </div>
      <div className={`${navClass} ${isMobile ? "mobile" : ""}`}>
        {navbarOpen ? (
          renderMobileMenu()
        ) : (
          <>
            <div
              className="navbar-item"
              onMouseEnter={() => handleMouseEnter("new")}
              onMouseLeave={() => handleMouseLeave("new")}
            >
              New{" "}
            </div>
            <div
              className="navbar-item"
              onMouseEnter={() => handleMouseEnter("brands")}
              onMouseLeave={() => handleMouseLeave("brands")}
            >
              Brands{" "}
            </div>
            <div
              className="navbar-item"
              onMouseEnter={() => handleMouseEnter("bags")}
              onMouseLeave={() => handleMouseLeave("bags")}
            >
              Bags{" "}
            </div>
            <div
              className="navbar-item"
              onMouseEnter={() => handleMouseEnter("accessories")}
              onMouseLeave={() => handleMouseLeave("accessories")}
            >
              Accessories{" "}
            </div>
            <div
              className="navbar-item"
              onMouseEnter={() => handleMouseEnter("fragrances")}
              onMouseLeave={() => handleMouseLeave("fragrances")}
            >
              Fragrances{" "}
            </div>
            <div
              className="navbar-item"
              onMouseEnter={() => handleMouseEnter("sale")}
              onMouseLeave={() => handleMouseLeave("sale")}
            >
              Sale{" "}
            </div>
            <div className="navbar-item">
              <Link to="/contact">Contact Us</Link>
            </div>
          </>
        )}

        <div className="icon-container">
          <div className="search-container navbar-item" ref={searchRef}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
              onClick={toggleSearch}
            >
              <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
            </svg>
            {isSearchOpen && (
              <div className="search-input-container">
                <input
                  type="text"
                  placeholder="Search for products..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                />
                {isSearchResultsVisible && (
                  <div className="search-results-popup">
                    {searchResults.length > 0 ? (
                      searchResults.map((product) => (
                        <div
                          key={product._id}
                          className="search-result-item"
                          onClick={() => handleProductClick(product)}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="search-result-image"
                          />
                          <div className="search-result-details">
                            <span className="search-result-name">
                              {product.name}
                            </span>
                            <span className="search-result-price">
                              ${product.price}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="no-results">No products found</div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <Link to="/cart" className="cart-icon navbar-item">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#5f6368"
            >
              <path d="M240-80q-33 0-56.5-23.5T160-160v-480q0-33 23.5-56.5T240-720h80q0-66 47-113t113-47q66 0 113 47t47 113h80q33 0 56.5 23.5T800-640v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-480h-80v80q0 17-11.5 28.5T600-520q-17 0-28.5-11.5T560-560v-80H400v80q0 17-11.5 28.5T360-520q-17 0-28.5-11.5T320-560v-80h-80v480Zm160-560h160q0-33-23.5-56.5T480-800q-33 0-56.5 23.5T400-720ZM240-160v-480 480Z" />
            </svg>
            {cartItemsCount > 0 && <span className="cart-count">{cartItemsCount}</span>}
          </Link>

          <Link to="/login" className="login-icon navbar-item">
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
          </Link>
        </div>
      </div>

      <div
        className={`dropdown-container ${hoveredItem === "new" ? "active" : ""
          }`}
        onMouseEnter={() => setHoveredItem("new")}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="dropdown-content">
          <div className="dropdown-column dropdown-image-left">
            <Link to="/products/new">
              <img
                src="https://media.istockphoto.com/id/1366223194/photo/woman-shopping-in-front-of-a-chanel-fashion-boutique-with-the-logo-on-the-wall.jpg?s=612x612&w=is&k=20&c=IDEoihzMaAzWU-F2iZZEGtCyc39VD5gYc6CqZs_wBW4="
                alt="New"
              ></img>{" "}
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`dropdown-container ${hoveredItem === "brands" ? "active" : ""
          }`}
        onMouseEnter={() => setHoveredItem("brands")}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="dropdown-content">
          <div className="dropdown-column">
            <Link to="/brands/chanel">Chanel</Link>
            <Link to="/brands/dior">Dior</Link>
            <Link to="/brands/gucci">Gucci</Link>
            <Link to="/brands/ysl">Yves Saint Laurent</Link>
            <Link to="/brands/marc-jacobs">Marc Jacobs</Link>
          </div>
          <div className="dropdown-column">
            <Link to="/brands/burberry">Burberry</Link>
            <Link to="/brands/prada">Prada</Link>
            <Link to="/brands/valentino">Valentino</Link>
            <Link to="/brands/hugo">Hugo</Link>
          </div>
          <div className="dropdown-column">
            <Link to="/brands/calvin-klein">Calvin Klein</Link>
            <Link to="/brands/ugg">UGG</Link>
            <Link to="/brands/guess">Guess</Link>
            <Link to="/brands/steve-madden">Steve Madden</Link>
          </div>
        </div>
      </div>
      <div
        className={`dropdown-container ${hoveredItem === "bags" ? "active" : ""
          }`}
        onMouseEnter={() => setHoveredItem("bags")}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="dropdown-content">
          <div className="dropdown-column">
            <Link to="/products/bags/backpacks">Backpacks</Link>
            <Link to="/products/bags/crossbody-bags">Crossbody Bags</Link>
            <Link to="/products/bags/belt-bags">Belt Bags</Link>
            <Link to="/products/bags/laptop-bags">Laptop Bags</Link>
          </div>
          <div className="dropdown-column">
            <Link to="/products/bags/tote-bags">Tote Bags</Link>
            <Link to="/products/bags/mini-bags">Mini Bags</Link>
            <Link to="/products/bags/bucket-bags">Bucket Bags</Link>
            <Link to="/products/bags/evening-bags">Evening Bags</Link>
          </div>
          <div className="dropdown-image">
            <img
              src="https://images.prestigeonline.com/wp-content/uploads/sites/4/2021/05/12001602/BVLGARI_210212_HCOMTE_020_301_zl-950x1024.jpg"
              alt="Bags "
            />
          </div>
        </div>{" "}
      </div>
      <div
        className={`dropdown-container ${hoveredItem === "accessories" ? "active" : ""
          }`}
        onMouseEnter={() => setHoveredItem("accessories")}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="dropdown-content">
          <div className="dropdown-column">
            <Link to="/products/accessories/belts">Belts</Link>
            <Link to="/products/accessories/hats">Hats and Caps</Link>
            <Link to="/products/accessories/scarves">Scarves</Link>
            <Link to="/products/accessories/sunglasses">Sunglasses</Link>
          </div>
          <div className="dropdown-column">
            <Link to="/products/accessories/socks">Socks</Link>
            <Link to="/products/accessories/wallets">Wallets</Link>
            <Link to="/products/accessories/underwear">Underwear</Link>
            <Link to="/products/accessories/shoes">Shoes</Link>
          </div>
          <div className="dropdown-image">
            <img
              src="https://greatsouthernsunnies.com.au/cdn/shop/articles/Tips-on-Buying-Designer-Sunglasses-for-Men.jpg?v=1700221936"
              alt="Sunglasses"
            />
          </div>
        </div>{" "}
      </div>
      <div
        className={`dropdown-container ${hoveredItem === "fragrances" ? "active" : ""
          }`}
        onMouseEnter={() => setHoveredItem("fragrances")}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="dropdown-content">
          <div className="dropdown-column">
            <Link to="/products/fragrances/for-him">For Him</Link>
            <Link to="/products/fragrances/aftershave">Aftershave</Link>
            <Link to="/products/fragrances/for-her">For Her</Link>
            <Link to="/products/fragrances/body-mist">Body Mist</Link>
          </div>
          <div className="dropdown-column">
            <Link to="/products/fragrances/unisex">Unisex</Link>
            <Link to="/products/fragrances/gift-sets">Gift Sets</Link>
            <Link to="/products/fragrances/travel-sizes">Travel Sizes</Link>
          </div>
          <div className="dropdown-image">
            <img
              src="https://static01.nyt.com/images/2021/05/10/t-magazine/fashion/Beauty-extra-still-slide-FTPZ-copy/Beauty-extra-still-slide-FTPZ-videoSixteenByNineJumbo1600.jpg"
              alt="Parfumes"
            />
          </div>
        </div>{" "}
      </div>
      <div
        className={`dropdown-container ${hoveredItem === "sale" ? "active" : ""
          }`}
        onMouseEnter={() => setHoveredItem("sale")}
        onMouseLeave={() => setHoveredItem(null)}
      >
        <div className="dropdown-content">
          <div className="dropdown-column dropdown-image-left">
            <Link to="/products/sale">
              <img
                src="https://media.istockphoto.com/id/1496351921/vector/save-offer-20-off-sale-banner-sign-board-promotion-vector-illustration.jpg?s=612x612&w=is&k=20&c=VyAISQrFPnoCE7b5gLJ1NApl69vvz5S3ippT8_DSXe4="
                alt="Sale"
              />
            </Link>
          </div>
        </div>{" "}
      </div>
    </div>
  );
};

export default NavigationBar;