import React, { useState, useRef } from "react";
import {
  FaSearch,
  FaUser,
  FaCaretDown,
  FaHome,
  FaCog,
  FaBox,
  FaUsers,
} from "react-icons/fa";
import "./AdminDashboard.css";
import ProductUpload from "./ProductUpload";
import CategoryDropdown from "./CategoryDropDown";
import Customers from "./Customers";
import axios from "axios";

const AdminDashboard = ({ homeContent }) => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // New state for selected product
  const searchQuery = useRef(null);

  // Simpler logout function
  const logout = () => {
    window.location.href = "http://localhost:5173"; // Redirect to the login page or desired location
  };

  const search = async () => {
    const query = searchQuery.current.value.trim();
    if (!query) {
      setSearchResults([]);
      setSelectedProduct(null); // Clear selected product when search is cleared
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:8081/api/products/search?keyword=${query}`
      );
      setSearchResults(res.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setActiveMenu(null); // Deselect other menus when viewing a product
  };

  const renderContent = () => {
    if (selectedProduct) {
      // Render selected product details
      return (
        <div>
          <h2>{selectedProduct.name}</h2>
          <p>{selectedProduct.description}</p>
          <p>Price: ${selectedProduct.price}</p>
        </div>
      );
    }

    switch (activeMenu) {
      case "Dashboard":
        return homeContent;
      case "Product List":
        return <ProductUpload />;
      case "Categories":
        return <CategoryDropdown />;
      case "Customers":
        return <Customers />;
      case "Settings":
        return <div>Adjust your Settings here.</div>;
      default:
        return <div>Select a menu item to view content.</div>;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div>
          <div className="sidebar-header">Menu</div>
          <nav className="sidebar-nav">
            <ul>
              <li
                className={`menu-item ${
                  activeMenu === "Dashboard" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu("Dashboard");
                  setSelectedProduct(null); // Clear selected product when navigating
                }}
              >
                <FaHome className="menu-icon" /> Dashboard
              </li>
              <li
                className={`menu-item ${
                  activeMenu === "Product List" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu("Product List");
                  setSelectedProduct(null);
                }}
              >
                <FaBox className="menu-icon" /> Product List
              </li>
              <li
                className={`menu-item ${
                  activeMenu === "Categories" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu("Categories");
                  setSelectedProduct(null);
                }}
              >
                <FaBox className="menu-icon" /> Categories
              </li>
              <li
                className={`menu-item ${
                  activeMenu === "Customers" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu("Customers");
                  setSelectedProduct(null);
                }}
              >
                <FaUsers className="menu-icon" /> Customers
              </li>
              <li
                className={`menu-item ${
                  activeMenu === "Settings" ? "active" : ""
                }`}
                onClick={() => {
                  setActiveMenu("Settings");
                  setSelectedProduct(null);
                }}
              >
                <FaCog className="menu-icon" /> Settings
              </li>
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <div className="logout-section">
          <button onClick={logout} className="logout-button">
            <FaUser className="menu-icon" /> Log out
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <div className="content">
        {/* Header */}
        <nav className="header">
          <div className="header-container">
            <div className="header-title">NeedsForU</div>
            <div className="header-actions">
              {/* Search Bar */}
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  className="search-input"
                  ref={searchQuery}
                  onChange={search}
                />
                <FaSearch className="search-icon" />
              </div>
              <div className="user-profile">
                <span>Admin</span>
                <FaCaretDown />
              </div>
            </div>
          </div>
        </nav>

        {/* Search Results */}
        <div className="search-results-container">
          {searchResults.length > 0 && (
            <div className="search-results">
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  className="search-result-item"
                  onClick={() => handleProductClick(result)} // Set selected product
                >
                  <p>{result.name}</p>
                  <p>{result.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="main-content">{renderContent()}</div>
      </div>
    </div>
  );
};

export default AdminDashboard;
