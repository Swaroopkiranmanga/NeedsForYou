import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUpload, FaTimes, FaPlus } from "react-icons/fa";

const AddCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input changes with validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      alert("Image file size must not exceed 2MB.");
      return;
    }
    setImage(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSubmit = new FormData();

      const category = {
        name: formData.name,
        description: formData.description,
      };
      formDataToSubmit.append("category", new Blob([JSON.stringify(category)], { type: "application/json" }));

      if (image) {
        formDataToSubmit.append("image", image);
      }

      const response = await axios.post("http://localhost:8081/api/category", formDataToSubmit, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Category added successfully!");
      navigate("/admin-categories");
    } catch (error) {
      console.error("Error adding category:", error.response?.data || error.message);
      alert(`Failed to add category: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <h2 className="text-center mb-4">Add New Category</h2>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                <strong>Category Name</strong>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter category name"
                required
              />
              <div className="invalid-feedback">Please provide a category name.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                <strong>Category Description</strong>
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter category description"
                rows="4"
                required
              ></textarea>
              <div className="invalid-feedback">Please provide a description.</div>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                <strong>Upload Category Image</strong> <FaUpload />
              </label>
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleFileChange}
                className="form-control"
                accept="image/*"
              />
              <div className="form-text">
                Supported formats: JPG, PNG. Max size: 2MB.
              </div>
            </div>
            {preview && (
              <div className="mb-3">
                <p>Preview of Selected Image:</p>
                <img
                  src={preview}
                  alt="Preview"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-success w-45">
                <FaPlus className="me-2" />
                Add Category
              </button>
              <button
                type="button"
                className="btn btn-outline-danger w-45"
                onClick={() => navigate("/admin-categories")}
              >
                <FaTimes className="me-2" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
