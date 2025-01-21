import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaUpload, FaCheck, FaTimes } from "react-icons/fa";

const UpdateCategoryForm = () => {
  const { id } = useParams(); // Get the category ID from the route
  const navigate = useNavigate();

  // Create refs for form elements
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);

  const [currentImage, setCurrentImage] = useState(null); // For displaying the existing image
  const [previewImage, setPreviewImage] = useState(null); // For the new image preview

  useEffect(() => {
    // Fetch the category details using ID
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/category/${id}`);
        const category = response.data;
        // Set the form values using refs
        nameRef.current.value = response.data.category.name;
        descriptionRef.current.value = response.data.category.description;
        setCurrentImage(category.image); // Save the current image URL
      } catch (error) {
        console.error("Error fetching category:", error);
        alert("Failed to fetch category details.");
      }
    };

    fetchCategory();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Gather data from refs
    const category = {
      name: nameRef.current.value,
      description: descriptionRef.current.value,
    };

    const image = imageRef.current.files[0]; // Get the selected image file

    // Create FormData to send both the category data and the image file
    const formData = new FormData();
    formData.append("category", new Blob([JSON.stringify(category)], { type: "application/json" }));
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(`http://localhost:8081/api/category/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        alert("Category updated successfully!");
        navigate("/admin-categories"); // Redirect after success
      } else {
        alert("Failed to update category!");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Error updating category!");
    }
  };

  // Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <h2 className="text-center mb-4">Update Category</h2>
          <form onSubmit={handleSubmit} className="needs-validation" noValidate>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                <strong>Category Name</strong>
              </label>
              <input
                type="text"
                id="name"
                ref={nameRef}
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
                id="description"
                ref={descriptionRef}
                className="form-control"
                placeholder="Enter category description"
                rows="4"
                required
              ></textarea>
              <div className="invalid-feedback">Please provide a description.</div>
            </div>
            {currentImage && (
              <div className="mb-3">
                <p>Current Image:</p>
                <img
                  src={currentImage}
                  alt="Current"
                  className="img-fluid rounded shadow-sm mb-3"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                <strong>Upload New Image</strong> <FaUpload />
              </label>
              <input
                type="file"
                id="image"
                ref={imageRef}
                className="form-control"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="form-text">
                Supported formats: JPG, PNG. Max size: 2MB.
              </div>
            </div>
            {previewImage && (
              <div className="mb-3">
                <p>Preview of Selected Image:</p>
                <img
                  src={previewImage}
                  alt="Preview"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxWidth: "100%" }}
                />
              </div>
            )}
            <div className="d-flex justify-content-between mt-4">
              <button type="submit" className="btn btn-success w-45">
                <FaCheck className="me-2" />
                Update Category
              </button>
              <button
                type="button"
                className="btn btn-outline-danger w-45"
                onClick={() => navigate("/adminDashboard")}
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

export default UpdateCategoryForm;
