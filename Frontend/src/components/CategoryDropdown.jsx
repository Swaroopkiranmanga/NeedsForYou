import React, { useState } from "react";
import AdminCategory from "./AdminCategory";
import AdminSubCategory from "./AdminSubCategory";
import "./CategoryDropdown.css"; // Optional: for specific styles if needed

const CategoryDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState("AdminCategory");

  return (
    <div>
      <label htmlFor="category-select">Select Category: </label>
      <select
        id="category-select"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="category-dropdown"
      >
        <option value="AdminCategory">Category</option>
        <option value="UserCategory">Subcategory</option>
      </select>
      {selectedCategory === "AdminCategory" && <AdminCategory />}
      {selectedCategory === "UserCategory" && <AdminSubCategory />}
    </div>
  );
};

export default CategoryDropdown;
