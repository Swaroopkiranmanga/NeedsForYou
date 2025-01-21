import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AddSubCategoryForm = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]); // Store categories fetched from the API
  const [category, setCategory] = useState({ id: "" }); // Store the selected category as an object
  const [name, setName] = useState(""); // Store subcategory name
  const [description, setDescription] = useState(""); // Store subcategory description

  // Fetch categories for the dropdown
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8081/api/get/categories");

      // Validate and set categories
      if (response.data && Array.isArray(response.data.category)) {
        setCategories(response.data.category);
      } else {
        console.error("Invalid categories data:", response.data);
        alert("Failed to load categories. Please try again later.");
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Error fetching categories. Please try again later.");
    }
  };

  // Load categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category.id) {
      alert("Please select a category.");
      return;
    }

    const newSubcategory = {
      name: name.trim(),
      description: description.trim(),
      category: { id: category.id }, // Send category as an object with id
    };

    console.log("Payload being sent:", newSubcategory); // Debugging log

    try {
      const response = await axios.post("http://localhost:8081/api/subcategory", newSubcategory, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Subcategory added successfully!");
      navigate("/adminsubcategory");
    } catch (error) {
      console.error("Error adding subcategory:", error.response?.data || error.message);
      alert(`Failed to add subcategory: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3>Add New Subcategory</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                {/* Dropdown for selecting a category */}
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    <strong>Category</strong>
                  </label>
                  <select
                    id="category"
                    value={category.id}
                    onChange={(e) => setCategory({ id: e.target.value })}
                    className="form-select"
                    required
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categories.map((categoryItem) => (
                      <option key={categoryItem.id} value={categoryItem.id}>
                        {categoryItem.name}
                      </option>
                    ))}
                  </select>
                  <div className="invalid-feedback">Please select a category.</div>
                </div>

                {/* Input for subcategory name */}
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    <strong>Subcategory Name</strong>
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    placeholder="Enter subcategory name"
                    required
                  />
                  <div className="invalid-feedback">Please enter a subcategory name.</div>
                </div>

                {/* Input for subcategory description */}
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    <strong>Subcategory Description</strong>
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-control"
                    placeholder="Enter subcategory description"
                    rows="4"
                    required
                  ></textarea>
                  <div className="invalid-feedback">Please enter a description.</div>
                </div>

                {/* Buttons */}
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-success w-45">
                    Add Subcategory
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-danger w-45"
                    onClick={() => navigate("/adminDashboard")}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategoryForm;
